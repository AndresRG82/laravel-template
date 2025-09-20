#!/bin/bash

echo "🚀 Iniciando aplicación Laravel en producción..."

# Wait for database to be ready
echo "⏳ Esperando que la base de datos esté lista..."
until pg_isready -h ${DB_HOST:-postgresql} -p ${DB_PORT:-5432} -U ${DB_USERNAME:-app}; do
    echo "Base de datos no está lista, esperando..."
    sleep 2
done

echo "✅ Base de datos lista!"

# Generate app key if not exists
if [ -z "$APP_KEY" ]; then
    echo "🔑 Generando clave de aplicación..."
    php artisan key:generate --force
fi

# Run migrations
echo "🗄️ Ejecutando migraciones..."
php artisan migrate --force

# Clear and optimize for production
echo "⚡ Optimizando para producción..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Set proper permissions
echo "🔒 Configurando permisos..."
chmod -R 755 /var/www/storage
chmod -R 755 /var/www/bootstrap/cache

echo "🎉 Aplicación lista!"

# Start supervisor
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
