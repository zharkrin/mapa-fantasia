from flask import Flask, send_from_directory, jsonify
import os

app = Flask(
    __name__,
    static_folder="frontend",      # Carpeta donde está el frontend
    static_url_path=""             # Sirve los archivos estáticos desde raíz
)

# -----------------------------
# Ruta principal: devuelve index.html
# -----------------------------
@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

# -----------------------------
# Ejemplo de API (puedes añadir más)
# -----------------------------
@app.route("/api/saludo")
def api_saludo():
    return jsonify({"mensaje": "Hola desde Flask 🚀"})

# -----------------------------
# Servir cualquier otro archivo del frontend (css, js, imágenes)
# -----------------------------
@app.route("/<path:path>")
def serve_static(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")  # fallback

# -----------------------------
# Lanzar servidor
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)