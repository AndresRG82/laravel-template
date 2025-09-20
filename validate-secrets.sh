#!/bin/bash

# Script para validar GitHub Secrets para el deployment
# Uso: ./validate-secrets.sh OWNER/REPO

set -e

# Configuración
REPO=${1:-"AndresRG82/certificados"}
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Lista de secrets requeridos
REQUIRED_SECRETS=(
    "DOCKER_USERNAME"
    "DOCKER_PASSWORD"
    "DO_HOST"
    "DO_USER"
    "DO_SSH_KEY"
)

# Lista de secrets opcionales
OPTIONAL_SECRETS=(
    "APP_KEY"
    "APP_URL"
    "DB_DATABASE"
    "DB_USERNAME"
    "DB_PASSWORD"
    "MAIL_MAILER"
    "MAIL_HOST"
    "MAIL_PORT"
    "MAIL_USERNAME"
    "MAIL_PASSWORD"
    "MAIL_ENCRYPTION"
    "MAIL_FROM_ADDRESS"
)

echo -e "${BLUE}🔐 Validador de GitHub Secrets para ${REPO}${NC}"
echo "=================================================="

# Verificar si gh CLI está instalado
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) no está instalado${NC}"
    echo -e "${YELLOW}💡 Instálalo con: sudo apt install gh${NC}"
    echo -e "${YELLOW}💡 O descárgalo desde: https://cli.github.com/${NC}"
    exit 1
fi

# Verificar autenticación
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ No estás autenticado con GitHub CLI${NC}"
    echo -e "${YELLOW}💡 Ejecuta: gh auth login${NC}"
    exit 1
fi

echo -e "${GREEN}✅ GitHub CLI configurado correctamente${NC}"
echo ""

# Función para verificar un secret
check_secret() {
    local secret_name=$1
    local is_required=$2
    
    # Intentar obtener el secret (esto no mostrará el valor, solo si existe)
    if gh secret list --repo "$REPO" 2>/dev/null | grep -q "^$secret_name"; then
        echo -e "${GREEN}✅ $secret_name${NC} - Configurado"
        return 0
    else
        if [ "$is_required" = "true" ]; then
            echo -e "${RED}❌ $secret_name${NC} - FALTANTE (REQUERIDO)"
            return 1
        else
            echo -e "${YELLOW}⚠️  $secret_name${NC} - Faltante (opcional)"
            return 0
        fi
    fi
}

# Verificar secrets requeridos
echo -e "${BLUE}🔑 Secrets Requeridos para Deployment:${NC}"
echo "--------------------------------------------"
missing_required=0
for secret in "${REQUIRED_SECRETS[@]}"; do
    if ! check_secret "$secret" "true"; then
        ((missing_required++))
    fi
done

echo ""

# Verificar secrets opcionales
echo -e "${BLUE}🔧 Secrets Opcionales para Configuración:${NC}"
echo "--------------------------------------------"
missing_optional=0
for secret in "${OPTIONAL_SECRETS[@]}"; do
    if ! check_secret "$secret" "false"; then
        ((missing_optional++))
    fi
done

echo ""
echo "=================================================="

# Resumen
if [ $missing_required -eq 0 ]; then
    echo -e "${GREEN}🎉 Todos los secrets requeridos están configurados!${NC}"
    echo -e "${GREEN}✅ El deployment debería funcionar correctamente${NC}"
else
    echo -e "${RED}⚠️  Faltan $missing_required secrets requeridos${NC}"
    echo -e "${RED}❌ El deployment fallará sin estos secrets${NC}"
fi

if [ $missing_optional -gt 0 ]; then
    echo -e "${YELLOW}💡 Hay $missing_optional secrets opcionales sin configurar${NC}"
    echo -e "${YELLOW}   La aplicación usará valores por defecto${NC}"
fi

echo ""

# Instrucciones para configurar secrets
if [ $missing_required -gt 0 ] || [ $missing_optional -gt 0 ]; then
    echo -e "${BLUE}📝 Para configurar secrets:${NC}"
    echo "--------------------------------------------"
    echo "1. Ve a: https://github.com/$REPO/settings/secrets/actions"
    echo "2. Haz clic en 'New repository secret'"
    echo "3. Configura los secrets faltantes:"
    echo ""
    
    if [ $missing_required -gt 0 ]; then
        echo -e "${RED}Secrets REQUERIDOS faltantes:${NC}"
        for secret in "${REQUIRED_SECRETS[@]}"; do
            if ! gh secret list --repo "$REPO" 2>/dev/null | grep -q "^$secret"; then
                case $secret in
                    "DOCKER_USERNAME")
                        echo "   $secret: Tu usuario de Docker Hub"
                        ;;
                    "DOCKER_PASSWORD")
                        echo "   $secret: Tu password/token de Docker Hub"
                        ;;
                    "DO_HOST")
                        echo "   $secret: IP de tu servidor DigitalOcean"
                        ;;
                    "DO_USER")
                        echo "   $secret: Usuario SSH (normalmente 'root')"
                        ;;
                    "DO_SSH_KEY")
                        echo "   $secret: Tu clave SSH privada"
                        ;;
                esac
            fi
        done
        echo ""
    fi
    
    echo -e "${YELLOW}Secrets opcionales recomendados:${NC}"
    echo "   APP_KEY: Genera con 'php artisan key:generate --show'"
    echo "   APP_URL: URL de tu aplicación (ej: https://certificados.tudominio.com)"
    echo "   DB_DATABASE: Nombre de la base de datos"
    echo "   DB_USERNAME: Usuario de la base de datos"
    echo "   DB_PASSWORD: Contraseña de la base de datos"
    echo ""
fi

# Comando para listar todos los secrets
echo -e "${BLUE}📋 Comando para ver todos los secrets:${NC}"
echo "gh secret list --repo $REPO"
echo ""

# Status code
if [ $missing_required -eq 0 ]; then
    exit 0
else
    exit 1
fi