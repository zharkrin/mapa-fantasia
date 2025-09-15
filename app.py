from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder="frontend", template_folder="frontend")

# Ruta principal → sirve el index.html
@app.route("/")
def index():
    return send_from_directory(app.template_folder, "index.html")

# Sirve cualquier archivo estático (css, js, imágenes, etc.)
@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
