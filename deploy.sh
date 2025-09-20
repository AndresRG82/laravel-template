#!/bin/bash

set -e

IMAGE_TAG=${1:-latest}
PROJECT_NAME="certificados"

echo "🚀 Iniciando despliegue de $PROJECT_NAME con imagen: $IMAGE_TAG"

# Verificar que existe .env
if [ ! -f .env ]; then
    echo "❌ Error: No existe archivo .env"
    echo "Copia .env.production.example a .env y configura las variables"
    exit 1
fi

# Cargar variables de entorno
source .env

# Verificar variables críticas
if [ -z "$APP_KEY" ] || [ -z "$DB_PASSWORD" ]; then
    echo "❌ Error: Variables críticas no configuradas en .env"
    echo "Asegúrate de configurar APP_KEY y DB_PASSWORD"
    exit 1
fi

# Actualizar imagen en .env
sed -i "s/IMAGE_TAG=.*/IMAGE_TAG=$IMAGE_TAG/" .env

echo "📥 Descargando nueva imagen..."
docker pull $DOCKER_USERNAME/$PROJECT_NAME:$IMAGE_TAG

echo "⏹️  Deteniendo servicios existentes..."
docker-compose down --remove-orphans || true

echo "🧹 Limpiando imágenes antiguas..."
docker image prune -f || true

echo "🚀 Iniciando servicios..."
docker-compose up -d

echo "⏳ Esperando que los servicios estén listos..."
sleep 10

# Verificar que los servicios estén funcionando
echo "🔍 Verificando estado de los servicios..."
docker-compose ps

# Verificar conectividad de la aplicación
echo "🌐 Verificando conectividad..."
if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ Aplicación funcionando correctamente!"
else
    echo "⚠️  La aplicación puede estar iniciando aún..."
    echo "Verifica los logs con: docker-compose logs"
fi

echo "📋 Comandos útiles:"
echo "  Ver logs:        docker-compose logs -f"
echo "  Estado:          docker-compose ps"
echo "  Reiniciar:       docker-compose restart"
echo "  Entrar al app:   docker-compose exec app bash"
echo "  Ver variables:   docker-compose exec app env"

echo "🎉 Despliegue completado!"
