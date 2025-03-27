# app.py
from flask import Flask, jsonify
from handlers.handler import get_fetch_sample_data
from handlers.handler import execute_graphql_query

app = Flask(__name__)

# REST endpoint to fetch sample data where GQL query is hardcoded in handler
@app.route('/fetch-sample-data', methods=['GET'])
def fetch_sample_data():
    data = get_fetch_sample_data()
    try:
        return jsonify(data)
    except Exception as e:
        return jsonify({"Request error in fetch sample data": str(e)}), 500

# REST endpoint to execute graphql query which you can send via body
@app.route('/execute-graphql', methods=['POST'])
def graphql_handler():
    data = execute_graphql_query()
    try:
        return jsonify(data)
    except Exception as e:
        return jsonify({"Request error in execute graphql query": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
