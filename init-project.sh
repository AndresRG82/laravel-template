#!/bin/bash

echo "🚀 Configuración inicial del proyecto Laravel con PostgreSQL..."

# Verificar que docker compose esté funcionando
if ! docker compose ps &> /dev/null; then
    echo "❌ Docker Compose no está ejecutándose. Ejecuta 'docker compose up -d' primero."
    exit 1
fi

# Verificar si el contenedor de PostgreSQL está listo
echo "⏳ Esperando que PostgreSQL esté listo..."
max_attempts=30
attempt=0

until docker compose exec postgresql pg_isready -U app -d app > /dev/null 2>&1; do
    attempt=$((attempt + 1))
    if [ $attempt -gt $max_attempts ]; then
        echo "❌ PostgreSQL no respondió después de $max_attempts intentos"
        exit 1
    fi
    echo "PostgreSQL no está listo aún, esperando... (intento $attempt/$max_attempts)"
    sleep 2
done

echo "✅ PostgreSQL está listo!"

# Instalar dependencias de Composer
echo "📦 Instalando dependencias de Composer..."
docker compose exec app composer install --no-dev --optimize-autoloader

# Configurar .env si no existe
if ! docker compose exec app test -f .env > /dev/null 2>&1; then
    echo "⚙️  Creando archivo .env desde .env.example..."
    docker compose exec app cp .env.example .env

    # Configurar variables específicas para PostgreSQL
    echo "🔧 Configurando variables de base de datos para PostgreSQL..."
    docker compose exec app sed -i 's/DB_CONNECTION=.*/DB_CONNECTION=pgsql/' .env
    docker compose exec app sed -i 's/DB_HOST=.*/DB_HOST=postgresql/' .env
    docker compose exec app sed -i 's/DB_PORT=.*/DB_PORT=5432/' .env
    docker compose exec app sed -i 's/DB_DATABASE=.*/DB_DATABASE=app/' .env
    docker compose exec app sed -i 's/DB_USERNAME=.*/DB_USERNAME=app/' .env
    docker compose exec app sed -i 's/DB_PASSWORD=.*/DB_PASSWORD=password/' .env
else
    echo "⚠️  El archivo .env ya existe, saltando configuración..."
fi

# Generar clave de aplicación si no existe
echo "🔑 Verificando/generando clave de aplicación..."
if ! docker compose exec app grep -q "APP_KEY=base64:" .env > /dev/null 2>&1; then
    docker compose exec app php artisan key:generate
else
    echo "✅ La clave de aplicación ya existe"
fi

# Limpiar cachés
echo "🧹 Limpiando cachés..."
docker compose exec app php artisan cache:clear
docker compose exec app php artisan view:clear
docker compose exec app php artisan config:clear
docker compose exec app php artisan route:clear

# Ejecutar migraciones y seeders
echo "🗄️  Ejecutando migraciones..."
docker compose exec app php artisan migrate --force

echo "🌱 Ejecutando seeders..."
docker compose exec app php artisan db:seed --force

# Optimizar para producción (opcional)
echo "⚡ Optimizando aplicación..."
docker compose exec app php artisan config:cache
docker compose exec app php artisan route:cache
docker compose exec app php artisan view:cache

# Instalar dependencias de NPM y compilar assets
echo "📦 Instalando dependencias de NPM..."
docker compose exec build npm install

echo "🎨 Compilando assets..."
docker compose exec build npm run build

echo ""
echo "🎉 ¡Configuración completada exitosamente!"
echo ""
echo "📱 Tu aplicación está disponible en: http://localhost:8000"
echo "🗃️  PostgreSQL está disponible en:"
echo "   - Host: localhost:5433"
echo "   - Base de datos: app"
echo "   - Usuario: app"
echo "   - Contraseña: password"
echo ""
echo "Para development mode con hot reload:"
echo "   docker compose exec build npm run dev"
