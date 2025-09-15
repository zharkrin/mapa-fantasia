@echo off
echo Iniciando servidor Flask...

:: Crear entorno virtual si no existe
IF NOT EXIST venv (
    echo Creando entorno virtual...
    python -m venv venv
)

:: Activar entorno virtual
call venv\Scripts\activate.bat

:: Instalar dependencias
python -m pip install --upgrade pip
pip install -r requirements.txt

:: Configurar variables de entorno
set FLASK_APP=app.py
set FLASK_ENV=development

:: Iniciar servidor
flask run