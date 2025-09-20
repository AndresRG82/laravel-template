# ✅ Lista de Verificación para Despliegue

## 🎯 Antes del primer despliegue

### 1. Verificar que tests pasen localmente
```bash
./dev.sh test-migrate  # Esto prepara BD y ejecuta tests
# O simplemente:
./dev.sh test          # Si ya tienes la BD de testing
```

### 2. Generar APP_KEY
```bash
./generate-app-key.sh
# Copia el valor generado para GitHub Secrets
```

### 3. Configurar GitHub Secrets (OBLIGATORIOS)
Ve a: https://github.com/AndresRG82/certificados/settings/secrets/actions

- [ ] `DOCKER_USERNAME` - Tu usuario de Docker Hub
- [ ] `DOCKER_PASSWORD` - Token de Docker Hub
- [ ] `DO_HOST` - IP de tu droplet DigitalOcean
- [ ] `DO_USER` - `root`
- [ ] `DO_SSH_KEY` - Clave SSH privada completa
- [ ] `APP_KEY` - Valor de `./generate-app-key.sh`
- [ ] `APP_URL` - Tu dominio (ej: `https://certificados.tudominio.com`)
- [ ] `DB_DATABASE` - `certificados_prod`
- [ ] `DB_USERNAME` - `certificados_user`
- [ ] `DB_PASSWORD` - Password seguro para PostgreSQL

### 4. Configurar GitHub Secrets (OPCIONALES - Email)
- [ ] `MAIL_MAILER` - `smtp`
- [ ] `MAIL_HOST` - `smtp.gmail.com`
- [ ] `MAIL_PORT` - `587`
- [ ] `MAIL_USERNAME` - tu email
- [ ] `MAIL_PASSWORD` - app password de Gmail
- [ ] `MAIL_ENCRYPTION` - `tls`
- [ ] `MAIL_FROM_ADDRESS` - email de envío

### 5. Preparar Droplet DigitalOcean
- [ ] Droplet creado con Ubuntu 22.04
- [ ] SSH Key agregado al droplet
- [ ] Conexión SSH funcionando: `ssh root@TU_IP`

## 🚀 Ejecutar despliegue

```bash
git add .
git commit -m "Configure production deployment"
git push origin main
```

## 🔍 Verificar despliegue

1. **Monitorear GitHub Actions:**
   - https://github.com/AndresRG82/certificados/actions

2. **Verificar en el servidor:**
   ```bash
   ssh root@TU_IP
   cd /opt/certificados
   docker-compose ps
   curl http://localhost
   ```

3. **Verificar en navegador:**
   - http://TU_IP o https://tu-dominio.com

## 🔧 Comandos útiles post-despliegue

### En el servidor:
```bash
cd /opt/certificados

# Ver logs
docker-compose logs -f

# Estado de contenedores
docker-compose ps

# Reiniciar servicios
docker-compose restart

# Ejecutar comando Laravel
docker-compose exec app php artisan migrate

# Ver variables de entorno
docker-compose exec app env | grep APP
```

### Troubleshooting:
```bash
# Si algo falla, recrear todo
docker-compose down
docker-compose up -d --force-recreate

# Ver logs detallados
docker-compose logs app
docker-compose logs postgresql
```

## 🔄 Despliegues posteriores

¡Solo haz push a main y se despliega automáticamente!

```bash
git add .
git commit -m "Nueva funcionalidad"
git push origin main
```
