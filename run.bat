@echo off
echo Iniciando servidor Flask...

:: Activar entorno virtual si existe
IF EXIST venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
)

:: Instalar dependencias
pip install -r requirements.txt

:: Configurar variables de entorno
set FLASK_APP=app.py
set FLASK_ENV=development

:: Iniciar servidor
flask run
