# app.py
from flask import Flask, jsonify
from handlers.handler import get_fetch_sample_data
from handlers.handler import execute_graphql_query

app = Flask(__name__)

@app.route('/fetch-sample-data', methods=['GET'])
def fetch_sample_data():
    data = get_fetch_sample_data()
    try:
        return jsonify(data)
    except Exception as e:
        return jsonify({"Request error in fetch sample data": str(e)}), 500

@app.route('/execute-graphql', methods=['POST'])
def graphql_handler():
    data = execute_graphql_query()
    try:
        return jsonify(data)
    except Exception as e:
        return jsonify({"Request error in fetch sample data": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
