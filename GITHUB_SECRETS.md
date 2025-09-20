# SECRETS DE GITHUB REPOSITORY
# Ve a: https://github.com/AndresRG82/certificados/settings/secrets/actions

## 🔑 SECRETS OBLIGATORIOS

### Docker Hub (requeridos para build y push)
DOCKER_USERNAME=tu_usuario_docker_hub
DOCKER_PASSWORD=tu_token_docker_hub

### DigitalOcean Server (requeridos para deployment)
DO_HOST=192.168.1.100
DO_USER=root
DO_SSH_KEY=-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...
-----END PRIVATE KEY-----

### Aplicación Laravel (requeridos)
APP_KEY=base64:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890
APP_URL=https://tu-dominio.com

### Base de Datos (requeridos)
DB_DATABASE=certificados_prod
DB_USERNAME=certificados_user
DB_PASSWORD=TuPasswordMuySeguro123!

## 📧 SECRETS OPCIONALES

### Email (configurar si necesitas envío de emails)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu_app_password_gmail
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@tu-dominio.com

## 🔧 CÓMO GENERAR LOS VALORES

### 1. APP_KEY (generar localmente):
```bash
php artisan key:generate --show
# Copia el resultado completo: base64:ABC123...
```

### 2. SSH Key (generar para deployment):
```bash
ssh-keygen -t rsa -b 4096 -C "deploy@certificados"
cat ~/.ssh/id_rsa      # Copia TODO el contenido para DO_SSH_KEY
cat ~/.ssh/id_rsa.pub  # Agregar al droplet: ssh-copy-id root@IP
```

### 3. Gmail App Password:
```
1. Ir a Google Account Settings
2. Security → 2-Step Verification
3. App passwords → Generate new
4. Usar la contraseña generada en MAIL_PASSWORD
```

## 🎯 CONFIGURACIÓN EN GITHUB

1. Ve a: https://github.com/AndresRG82/certificados/settings/secrets/actions
2. Click "New repository secret"
3. Agrega cada secret con su nombre exacto y valor
4. Los secrets obligatorios son los primeros 7

## ⚠️ IMPORTANTE

- ❌ NO subas estos valores al código
- ✅ Úsalos solo en GitHub Secrets
- ✅ Los valores se inyectan automáticamente al servidor
- ✅ Ya no necesitas configurar .env manualmente en el servidor
