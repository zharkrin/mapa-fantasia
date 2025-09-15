#!/bin/bash
# Script para ejecutar la app Flask con creación automática de entorno virtual

echo "Iniciando servidor Flask..."

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
    echo "Creando entorno virtual..."
    python3 -m venv venv
fi

# Activar entorno virtual
source venv/bin/activate

# Instalar dependencias
pip install --upgrade pip
pip install -r requirements.txt

# Exportar variables de entorno
export FLASK_APP=app.py
export FLASK_ENV=development

# Iniciar servidor
flask run