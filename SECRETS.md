# 🔐 Configuración de GitHub Secrets

Este documento explica cómo configurar los GitHub Secrets necesarios para el deployment automático.

## 🚀 Scripts de Validación

### Validación Local
```bash
# Ejecutar validación local (requiere GitHub CLI)
./validate-secrets.sh

# O especificar un repositorio diferente
./validate-secrets.sh usuario/repositorio
```

### Validación en CI/CD
El script `check-secrets-ci.sh` se ejecuta automáticamente durante el deployment para validar la configuración.

## 📋 Secrets Requeridos

### Para Docker Hub
| Secret | Descripción | Ejemplo |
|--------|-------------|---------|
| `DOCKER_USERNAME` | Usuario de Docker Hub | `miusuario` |
| `DOCKER_PASSWORD` | Token/Password de Docker Hub | `dckr_pat_abc123...` |

### Para DigitalOcean
| Secret | Descripción | Cómo obtenerlo |
|--------|-------------|----------------|
| `DO_HOST` | IP del servidor | IP de tu droplet |
| `DO_USER` | Usuario SSH | `root` (por defecto) |
| `DO_SSH_KEY` | Clave SSH privada | Contenido completo de `~/.ssh/id_rsa` |

## ⚙️ Secrets Opcionales

### Aplicación
| Secret | Descripción | Valor por defecto |
|--------|-------------|-------------------|
| `APP_KEY` | Clave de encriptación Laravel | Se genera automáticamente |
| `APP_URL` | URL de la aplicación | `http://localhost` |

### Base de Datos
| Secret | Descripción | Valor por defecto |
|--------|-------------|-------------------|
| `DB_DATABASE` | Nombre de la base de datos | `certificados` |
| `DB_USERNAME` | Usuario de la base de datos | `app` |
| `DB_PASSWORD` | Contraseña de la base de datos | `password` |

### Correo Electrónico
| Secret | Descripción | Valor por defecto |
|--------|-------------|-------------------|
| `MAIL_MAILER` | Driver de correo | `log` |
| `MAIL_HOST` | Servidor SMTP | `localhost` |
| `MAIL_PORT` | Puerto SMTP | `587` |
| `MAIL_USERNAME` | Usuario SMTP | (vacío) |
| `MAIL_PASSWORD` | Contraseña SMTP | (vacío) |
| `MAIL_ENCRYPTION` | Tipo de encriptación | `tls` |
| `MAIL_FROM_ADDRESS` | Email remitente | `noreply@certificados.local` |

## 🛠️ Configuración Paso a Paso

### 1. Acceder a GitHub Secrets
1. Ve a tu repositorio en GitHub
2. Navega a: `Settings` → `Secrets and variables` → `Actions`
3. Haz clic en `New repository secret`

### 2. Configurar Docker Hub
1. Crea una cuenta en [Docker Hub](https://hub.docker.com/)
2. Genera un Access Token:
   - Ve a `Account Settings` → `Security` → `New Access Token`
   - Copia el token generado
3. Configura los secrets:
   - `DOCKER_USERNAME`: Tu usuario de Docker Hub
   - `DOCKER_PASSWORD`: El token generado

### 3. Configurar DigitalOcean
1. Crea un droplet en [DigitalOcean](https://www.digitalocean.com/)
2. Genera un par de claves SSH (si no tienes):
   ```bash
   ssh-keygen -t rsa -b 4096 -C "tu@email.com"
   ```
3. Agrega tu clave pública al droplet
4. Configura los secrets:
   - `DO_HOST`: IP pública de tu droplet
   - `DO_USER`: `root` (o el usuario que uses)
   - `DO_SSH_KEY`: Contenido completo de tu clave privada (`cat ~/.ssh/id_rsa`)

### 4. Generar APP_KEY
```bash
# En tu proyecto Laravel local
php artisan key:generate --show
```

## 🔍 Verificación

### Verificar Secrets Localmente
```bash
# Instalar GitHub CLI si no lo tienes
sudo apt install gh

# Autenticarse
gh auth login

# Ejecutar validación
./validate-secrets.sh
```

### Ver Secrets Configurados
```bash
gh secret list --repo usuario/repositorio
```

## 🚨 Troubleshooting

### Error: "command not found"
- Instala GitHub CLI: `sudo apt install gh`
- Autentícate: `gh auth login`

### Error: "API rate limit exceeded"
- Espera un momento y vuelve a intentar
- Asegúrate de estar autenticado correctamente

### Deployment falla con "***"
- Los secrets no están configurados correctamente
- Ejecuta `./validate-secrets.sh` para diagnosticar

### SSH connection failed
- Verifica que `DO_HOST` sea la IP correcta
- Asegúrate de que `DO_SSH_KEY` tenga el formato correcto (incluye `-----BEGIN` y `-----END`)
- Verifica que el usuario `DO_USER` sea correcto

## 📚 Recursos Adicionales

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Docker Hub Access Tokens](https://docs.docker.com/docker-hub/access-tokens/)
- [DigitalOcean SSH Keys](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/)
- [Laravel Environment Configuration](https://laravel.com/docs/configuration)

## 🔄 Flujo de Deployment

1. **Push a main** → Trigger GitHub Actions
2. **Validate Secrets** → Verificar configuración
3. **Run Tests** → Ejecutar pruebas
4. **Build Docker Image** → Construir imagen
5. **Push to Docker Hub** → Subir imagen
6. **Deploy to DigitalOcean** → Despliegue automático

¡Una vez configurados todos los secrets requeridos, el deployment será completamente automático! 🚀