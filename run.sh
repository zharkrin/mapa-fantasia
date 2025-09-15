#!/bin/bash
# Script para ejecutar la app Flask

echo "Iniciando servidor Flask..."

# Activar entorno virtual si existe
if [ -d "venv" ]; then
  source venv/bin/activate
fi

# Instalar dependencias
pip install -r requirements.txt

# Exportar variables de entorno
export FLASK_APP=app.py
export FLASK_ENV=development

# Iniciar servidor
flask run
