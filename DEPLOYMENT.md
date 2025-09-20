# 🚀 Despliegue en Producción - Certificados

Este documento describe el proceso completo para desplegar la aplicación Laravel "Certificados" en producción usando GitHub Actions, Docker Hub y DigitalOcean.

## 📋 Prerrequisitos

### 1. Cuentas necesarias:
- ✅ GitHub (ya tienes)
- ✅ Docker Hub ([https://hub.docker.com](https://hub.docker.com))
- ✅ DigitalOcean ([https://digitalocean.com](https://digitalocean.com))

### 2. Droplet de DigitalOcean:
- **OS**: Ubuntu 22.04 LTS
- **Tamaño mínimo**: 1GB RAM, 1 vCPU (Basic $6/mes)
- **Recomendado**: 2GB RAM, 1 vCPU (Basic $12/mes)

## 🔧 Configuración paso a paso

### 1️⃣ **Configurar Docker Hub**

1. Crea cuenta en [Docker Hub](https://hub.docker.com)
2. Crea un repositorio llamado `certificados` (público o privado)
3. Genera un Access Token:
   - Perfil → Account Settings → Security → Access Tokens
   - Guarda el token generado

### 2️⃣ **Configurar DigitalOcean Droplet**

1. **Crear Droplet:**
   ```bash
   # Conectarse al droplet
   ssh root@tu_ip_del_droplet
   
   # Actualizar sistema
   apt update && apt upgrade -y
   
   # Instalar Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   
   # Instalar Docker Compose
   curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   chmod +x /usr/local/bin/docker-compose
   
   # Crear directorio para la aplicación
   mkdir -p /opt/certificados
   ```

2. **Configurar SSH Key (en tu máquina local):**
   ```bash
   # Generar clave SSH para deployment
   ssh-keygen -t rsa -b 4096 -C "deploy@certificados"
   
   # Copiar clave pública al droplet
   ssh-copy-id -i ~/.ssh/id_rsa.pub root@tu_ip_del_droplet
   
   # Guardar la clave privada para GitHub Secrets
   cat ~/.ssh/id_rsa  # Copia este contenido
   ```

### 3️⃣ **Configurar GitHub Secrets**

Ve a: `https://github.com/AndresRG82/certificados/settings/secrets/actions`

Agrega los siguientes secrets:

| Secret | Valor | Descripción |
|--------|-------|-------------|
| `DOCKER_USERNAME` | tu_usuario_docker_hub | Usuario de Docker Hub |
| `DOCKER_PASSWORD` | tu_token_docker_hub | Token de acceso de Docker Hub |
| `DO_HOST` | IP_del_droplet | IP pública del droplet |
| `DO_USER` | root | Usuario SSH del droplet |
| `DO_SSH_KEY` | contenido_clave_privada | Contenido completo de ~/.ssh/id_rsa |

### 4️⃣ **Configurar variables de entorno desde GitHub Secrets**

**✅ Las variables se configuran automáticamente desde GitHub Secrets**

Las variables de entorno críticas se inyectan automáticamente desde los GitHub Secrets al servidor durante el despliegue. Ya **NO necesitas** configurar manualmente el archivo `.env` en el servidor.

**Variables que se configuran automáticamente:**
- `APP_KEY` - Clave de la aplicación
- `APP_URL` - URL de tu dominio
- `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` - Configuración de base de datos
- `MAIL_*` - Configuración de email
- `DOCKER_USERNAME` - Usuario de Docker Hub

**Solo asegúrate de que estos secrets estén configurados en GitHub:**
```
Ir a: https://github.com/AndresRG82/certificados/settings/secrets/actions
```

Ver `GITHUB_SECRETS.md` para la lista completa de secrets requeridos.

### 5️⃣ **Configurar dominio (opcional)**

1. **En tu proveedor de DNS:**
   ```
   Tipo: A
   Nombre: @
   Valor: IP_de_tu_droplet
   TTL: 300
   ```

2. **SSL con Let's Encrypt (en el droplet):**
   ```bash
   # Instalar Certbot
   apt install certbot python3-certbot-nginx -y
   
   # Obtener certificado
   certbot --nginx -d tu-dominio.com
   ```

## 🚀 Despliegue automático

### Primera vez:
1. **Hacer push a main:**
   ```bash
   git add .
   git commit -m "Setup production deployment"
   git push origin main
   ```

2. **Monitorear en GitHub:**
   - Ve a: `https://github.com/AndresRG82/certificados/actions`
   - El workflow se ejecutará automáticamente

### Despliegues posteriores:
Cada push a `main` desplegará automáticamente!

## 🔍 Verificación

### En el droplet:
```bash
cd /opt/certificados

# Ver estado de contenedores
docker-compose ps

# Ver logs
docker-compose logs -f

# Verificar aplicación
curl http://localhost
```

### En el navegador:
- Visita tu dominio o IP del droplet
- La aplicación debería estar funcionando

## 🛠️ Comandos útiles

### En el servidor:
```bash
cd /opt/certificados

# Reiniciar servicios
docker-compose restart

# Ver logs en tiempo real
docker-compose logs -f app

# Entrar al contenedor
docker-compose exec app bash

# Ejecutar comandos Artisan
docker-compose exec app php artisan migrate

# Limpiar cachés
docker-compose exec app php artisan cache:clear
```

### Rollback manual:
```bash
# Ver imágenes disponibles
docker images

# Usar versión anterior
docker-compose down
sed -i 's/IMAGE_TAG=.*/IMAGE_TAG=version_anterior/' .env
docker-compose up -d
```

## 🔒 Seguridad

### Firewall básico:
```bash
# En el droplet
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable
```

### Backup automático de BD:
```bash
# Crear script de backup
cat << 'EOF' > /opt/backup-db.sh
#!/bin/bash
docker-compose exec -T postgresql pg_dump -U certificados_user certificados_prod > backup-$(date +%Y%m%d-%H%M%S).sql
EOF

chmod +x /opt/backup-db.sh

# Agregar a crontab (backup diario a las 2 AM)
echo "0 2 * * * /opt/backup-db.sh" | crontab -
```

## 📊 Monitoreo

### Logs de aplicación:
```bash
# Ver logs de Laravel
docker-compose exec app tail -f storage/logs/laravel.log

# Ver logs de Nginx
docker-compose logs nginx

# Ver logs de PostgreSQL
docker-compose logs postgresql
```

### Recursos del servidor:
```bash
# Uso de memoria y CPU
htop

# Espacio en disco
df -h

# Uso de Docker
docker system df
```

## 🆘 Solución de problemas

### Contenedor no inicia:
```bash
# Ver logs detallados
docker-compose logs app

# Verificar configuración
docker-compose config

# Recrear contenedores
docker-compose down
docker-compose up -d --force-recreate
```

### Error de base de datos:
```bash
# Verificar conectividad
docker-compose exec app pg_isready -h postgresql

# Recrear base de datos
docker-compose exec postgresql psql -U postgres -c "DROP DATABASE IF EXISTS certificados_prod;"
docker-compose exec postgresql psql -U postgres -c "CREATE DATABASE certificados_prod;"
docker-compose exec app php artisan migrate --seed
```

### Error de permisos:
```bash
# Corregir permisos
docker-compose exec app chown -R app:app /var/www/storage
docker-compose exec app chmod -R 755 /var/www/storage
```

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs: `docker-compose logs`
2. Verifica la configuración: `docker-compose config`
3. Consulta la documentación de Laravel: [https://laravel.com/docs](https://laravel.com/docs)

---

¡Tu aplicación estará disponible 24/7 con despliegue automático! 🎉
