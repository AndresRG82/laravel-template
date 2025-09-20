#!/bin/bash

echo "🚀 Iniciando configuración del proyecto Laravel..."

# Verificar si el contenedor de PostgreSQL está listo
echo "⏳ Esperando que PostgreSQL esté listo..."
until docker compose exec postgresql pg_isready -U app -d app; do
    echo "PostgreSQL no está listo aún, esperando..."
    sleep 2
done

echo "✅ PostgreSQL está listo!"

# Ejecutar comandos dentro del contenedor de la aplicación
echo "📦 Instalando dependencias de Composer..."
docker compose exec app composer install

echo "📦 Instalando dependencias de NPM..."
docker compose exec build npm install

echo "⚙️  Configurando archivo .env..."
docker compose exec app cp .env.example .env

echo "🔑 Generando clave de aplicación..."
docker compose exec app php artisan key:generate

echo "🧹 Limpiando cachés..."
docker compose exec app php artisan cache:clear
docker compose exec app php artisan view:clear
docker compose exec app php artisan config:clear

echo "🗄️  Ejecutando migraciones y seeders..."
docker compose exec app php artisan migrate --seed

echo "🎉 ¡Configuración completada!"
echo "📱 Tu aplicación está disponible en: http://localhost:8000"
echo "🗃️  PostgreSQL está disponible en: localhost:5432"
echo "   - Base de datos: app"
echo "   - Usuario: app"
echo "   - Contraseña: password"
