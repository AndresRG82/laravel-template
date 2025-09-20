#!/bin/bash

echo "🔑 Generando APP_KEY para GitHub Secrets..."
echo ""

# Verificar si estamos en el directorio correcto
if [ ! -f "artisan" ]; then
    echo "❌ Error: No se encuentra el archivo artisan"
    echo "Ejecuta este script desde el directorio raíz del proyecto Laravel"
    exit 1
fi

# Generar APP_KEY usando Laravel
echo "Generando clave de aplicación..."
APP_KEY=$(./dev.sh artisan key:generate --show 2>/dev/null || docker compose exec app php artisan key:generate --show 2>/dev/null || php artisan key:generate --show 2>/dev/null)

if [ -z "$APP_KEY" ]; then
    echo "❌ Error: No se pudo generar la clave"
    echo "Intenta ejecutar manualmente:"
    echo "  ./dev.sh artisan key:generate --show"
    echo "  o"
    echo "  docker compose exec app php artisan key:generate --show"
    exit 1
fi

echo ""
echo "✅ APP_KEY generado exitosamente:"
echo ""
echo "📋 Copia este valor exacto en GitHub Secrets:"
echo "┌─────────────────────────────────────────────────────────────────┐"
echo "│ Secret Name: APP_KEY                                            │"
echo "│ Secret Value:                                                   │"
echo "│ $APP_KEY │"
echo "└─────────────────────────────────────────────────────────────────┘"
echo ""
echo "🔗 Configurar en: https://github.com/AndresRG82/certificados/settings/secrets/actions"
echo ""
echo "⚠️  IMPORTANTE: Usa este valor EXACTO, incluyendo el prefijo 'base64:'"
