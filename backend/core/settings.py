import os
from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-nddxx4#ll%)ve_-w^dwn!kz(-p@!h*l7$*ufi^hibh-+747wv="
DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# -----------------------------------------
# APPS
# -----------------------------------------
DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "corsheaders",
    "django_filters",
    "rolepermissions",
    "drf_spectacular",
]

LOCAL_APPS = [
    "apps.usuarios",
    "apps.authentication",
    "apps.utils",
    "apps.subscriptions",
    "apps.billing",
    "apps.clinic",
    "apps.documents",
    "apps.whatsapp",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS + [
    "rest_framework.authtoken"
]

# -----------------------------------------
# MIDDLEWARE
# -----------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "apps.authentication.middleware.UserRolePermissionMiddleware",
]

ROOT_URLCONF = "core.urls"

# -----------------------------------------
# TEMPLATES
# -----------------------------------------
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

# -----------------------------------------
# DATABASE
# -----------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# -----------------------------------------
# PASSWORD VALIDATION
# -----------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# -----------------------------------------
# INTERNATIONALIZATION
# -----------------------------------------
LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

# -----------------------------------------
# STATIC FILES
# -----------------------------------------
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# -----------------------------------------
# MEDIA FILES
# -----------------------------------------
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# -----------------------------------------
# AUTH SETTINGS
# -----------------------------------------
AUTH_USER_MODEL = "usuarios.CustomUser"

AUTHENTICATION_BACKENDS = (
    "apps.authentication.backends.EmailBackend",
    "django.contrib.auth.backends.ModelBackend",
)

# -----------------------------------------
# REST FRAMEWORK
# -----------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "apps.authentication.authentication.CookieJWTAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# -----------------------------------------
# CORS
# -----------------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True
CORS_EXPOSE_HEADERS = ["Set-Cookie"]

# -----------------------------------------
# CSRF / COOKIES CONFIG (IMPORTANTE)
# -----------------------------------------
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SAMESITE = "Lax"
SESSION_COOKIE_SAMESITE = "Lax"

# -----------------------------------------
# ROLE PERMISSIONS
# -----------------------------------------
ROLEPERMISSIONS_MODULE = "apps.usuarios.roles"


SIMPLE_JWT = {
    # Tempo de vida do token de acesso (5 minutos é o padrão, vamos aumentar)
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30), 
    
    # Tempo de vida do token de refresh (7 dias é o padrão, vamos manter)
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7), 

    # IMPORTANTE: Garante que os tokens podem ser lidos dos cookies
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION', # Deixa o padrão
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
}

# -----------------------------------------
# SWAGGER SETTINGS
# -----------------------------------------
SPECTACULAR_SETTINGS = {
    'TITLE': 'NEXKODONTO API',
    'DESCRIPTION': 'Documentação da API do sistema NEXKODONTO',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'COMPONENT_SPLIT_PATCH': True,
    'COMPONENT_SPLIT_REQUEST': True,
    'SWAGGER_UI_SETTINGS': {
        'deepLinking': True,
        'persistAuthorization': True,
        'displayOperationId': True,
    },
}