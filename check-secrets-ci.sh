#!/bin/bash

# Script de validación de secrets para GitHub Actions
# Este script se ejecuta durante el CI/CD para verificar que los secrets estén configurados

set -e

echo "🔐 Validando configuración de secrets para deployment..."

# Función para verificar si un secret está configurado
check_secret() {
    local secret_name=$1
    local secret_value=$2
    local is_required=${3:-false}
    
    if [ -z "$secret_value" ] || [ "$secret_value" = "***" ] || [ "$secret_value" = "" ]; then
        if [ "$is_required" = "true" ]; then
            echo "❌ $secret_name: FALTANTE (REQUERIDO)"
            return 1
        else
            echo "⚠️  $secret_name: No configurado (usando valor por defecto)"
            return 0
        fi
    else
        echo "✅ $secret_name: Configurado"
        return 0
    fi
}

echo ""
echo "📋 Estado de los secrets:"
echo "================================"

# Verificar secrets requeridos para deployment
deployment_ready=true

echo "🔑 Secrets para Docker Hub:"
if ! check_secret "DOCKER_USERNAME" "$DOCKER_USERNAME" "true"; then
    deployment_ready=false
fi
if ! check_secret "DOCKER_PASSWORD" "$DOCKER_PASSWORD" "true"; then
    deployment_ready=false
fi

echo ""
echo "🌐 Secrets para DigitalOcean:"
if ! check_secret "DO_HOST" "$DO_HOST" "true"; then
    deployment_ready=false
fi
if ! check_secret "DO_USER" "$DO_USER" "true"; then
    deployment_ready=false
fi
if ! check_secret "DO_SSH_KEY" "$DO_SSH_KEY" "true"; then
    deployment_ready=false
fi

echo ""
echo "⚙️  Secrets de configuración (opcionales):"
check_secret "APP_KEY" "$APP_KEY"
check_secret "APP_URL" "$APP_URL"
check_secret "DB_DATABASE" "$DB_DATABASE"
check_secret "DB_USERNAME" "$DB_USERNAME"
check_secret "DB_PASSWORD" "$DB_PASSWORD"

echo ""
echo "📧 Secrets de correo (opcionales):"
check_secret "MAIL_MAILER" "$MAIL_MAILER"
check_secret "MAIL_HOST" "$MAIL_HOST"
check_secret "MAIL_USERNAME" "$MAIL_USERNAME"
check_secret "MAIL_PASSWORD" "$MAIL_PASSWORD"

echo ""
echo "================================"

if [ "$deployment_ready" = "true" ]; then
    echo "🎉 Todos los secrets requeridos están configurados!"
    echo "✅ El deployment puede proceder"
    exit 0
else
    echo "⚠️  Faltan secrets requeridos para el deployment"
    echo "ℹ️  El job continuará pero puede fallar en la fase de deployment"
    echo ""
    echo "📝 Para configurar los secrets faltantes:"
    echo "   https://github.com/$GITHUB_REPOSITORY/settings/secrets/actions"
    exit 0  # No fallar el job, solo advertir
fi