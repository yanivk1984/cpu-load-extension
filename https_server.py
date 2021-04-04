from flask import Flask, request, send_from_directory, send_file

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='')


@app.route('/')
def main():
    return send_file('index.html')


@app.route('/json')
def get_json():
    return send_file('json.json')


if __name__ == "__main__":
    app.run(host='10.0.0.20', port="4434", ssl_context=('cert.pem', 'key.pem'), debug=True)

