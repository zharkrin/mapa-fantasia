@echo off
REM === Archivo: iniciar_flask.bat ===
REM Activa el entorno virtual (si lo usas)
REM Sustituye "venv" por el nombre de tu entorno
call venv\Scripts\activate

REM Establece variables de entorno
set FLASK_APP=app.py
set FLASK_ENV=development

REM Ejecuta Flask
flask run

REM Mantiene la ventana abierta si ocurre un error
pause
