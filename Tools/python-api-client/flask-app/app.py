# app.py
from flask import Flask, jsonify
from handlers.handler import get_data

app = Flask(__name__)

@app.route('/fetch', methods=['GET'])
def fetch_data():
    data = get_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
