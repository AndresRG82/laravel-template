#!/bin/bash

echo "🔄 Comandos útiles para el desarrollo diario..."

case "$1" in
    "start")
        echo "🚀 Iniciando contenedores..."
        docker compose up -d
        echo "✅ Contenedores iniciados!"
        ;;
    "stop")
        echo "🛑 Deteniendo contenedores..."
        docker compose down
        echo "✅ Contenedores detenidos!"
        ;;
    "restart")
        echo "🔄 Reiniciando contenedores..."
        docker compose restart
        echo "✅ Contenedores reiniciados!"
        ;;
    "logs")
        echo "📝 Mostrando logs..."
        docker compose logs -f ${2:-app}
        ;;
    "shell")
        echo "🐚 Abriendo shell en el contenedor app..."
        docker compose exec app bash
        ;;
    "artisan")
        shift
        echo "🎨 Ejecutando: php artisan $@"
        docker compose exec app php artisan "$@"
        ;;
    "composer")
        shift
        echo "📦 Ejecutando: composer $@"
        docker compose exec app composer "$@"
        ;;
    "npm")
        shift
        echo "📦 Ejecutando: npm $@"
        docker compose exec build npm "$@"
        ;;
    "clear")
        echo "🧹 Limpiando cachés de Laravel..."
        docker compose exec app php artisan cache:clear
        docker compose exec app php artisan view:clear
        docker compose exec app php artisan config:clear
        docker compose exec app php artisan route:clear
        echo "✅ Cachés limpiados!"
        ;;
    "migrate")
        echo "🗄️  Ejecutando migraciones..."
        docker compose exec app php artisan migrate
        ;;
    "seed")
        echo "🌱 Ejecutando seeders..."
        docker compose exec app php artisan db:seed
        ;;
    "fresh")
        echo "🔄 Recreando base de datos..."
        docker compose exec app php artisan migrate:fresh --seed
        ;;
    "build")
        echo "🎨 Compilando assets..."
        docker compose exec build npm run build
        ;;
    "test")
        echo "🧪 Ejecutando tests..."
        docker compose exec app vendor/bin/pest
        ;;
    "test-migrate")
        echo "🗄️ Preparando base de datos de testing..."
        docker compose exec postgresql psql -U app -d app -c "DROP DATABASE IF EXISTS testing;" || true
        docker compose exec postgresql psql -U app -d app -c "CREATE DATABASE testing;"
        # Configurar variables de entorno para testing y ejecutar migraciones
        docker compose exec -e DB_DATABASE=testing app php artisan migrate --force
        echo "🧪 Ejecutando tests..."
        docker compose exec app vendor/bin/pest
        ;;
    "dev")
        echo "🔥 Iniciando modo desarrollo con hot reload..."
        docker compose exec build npm run dev
        ;;
    *)
        echo "🛠️  Comandos disponibles:"
        echo ""
        echo "Gestión de contenedores:"
        echo "  ./dev.sh start     - Iniciar contenedores"
        echo "  ./dev.sh stop      - Detener contenedores"
        echo "  ./dev.sh restart   - Reiniciar contenedores"
        echo "  ./dev.sh logs      - Ver logs (opcional: especificar servicio)"
        echo "  ./dev.sh shell     - Abrir shell en contenedor app"
        echo ""
        echo "Laravel:"
        echo "  ./dev.sh artisan [comando]  - Ejecutar comando artisan"
        echo "  ./dev.sh clear              - Limpiar cachés"
        echo "  ./dev.sh migrate            - Ejecutar migraciones"
        echo "  ./dev.sh seed               - Ejecutar seeders"
        echo "  ./dev.sh fresh              - Recrear BD con seeders"
        echo ""
        echo "Testing:"
        echo "  ./dev.sh test               - Ejecutar tests"
        echo "  ./dev.sh test-migrate       - Recrear BD testing y ejecutar tests"
        echo ""
        echo "Dependencias:"
        echo "  ./dev.sh composer [comando] - Ejecutar comando composer"
        echo "  ./dev.sh npm [comando]      - Ejecutar comando npm"
        echo ""
        echo "Assets:"
        echo "  ./dev.sh build              - Compilar assets para producción"
        echo "  ./dev.sh dev                - Modo desarrollo con hot reload"
        echo ""
        echo "Ejemplos:"
        echo "  ./dev.sh artisan make:controller UserController"
        echo "  ./dev.sh composer require package/name"
        echo "  ./dev.sh npm install"
        echo "  ./dev.sh logs nginx"
        ;;
esac
