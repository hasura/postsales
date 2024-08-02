from flask import Flask, request, jsonify
import os
import sys
import re
import threading
import subprocess
import requests
import logging

app = Flask(__name__, static_folder='../build', static_url_path='/')


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route("/api/get-log")
def get_log():
    try:
        log_file_path = "terminal_log.txt"
        with open(log_file_path, "r") as log_file:
            log_data = log_file.read()
        return log_data, 200
    except Exception as e:
        return str(e), 500


def run_artillery():
    try:
        # Logging setup
        if os.path.exists('terminal_log.txt'):
            with open('terminal_log.txt', 'w'):
                pass
        logging.basicConfig(filename='terminal_log.txt', level=logging.INFO)
        logging.info("Starting artillery run...")

    
        with open('terminal_log.txt', 'a') as log_file:
            subprocess.run(["artillery", "run", "artilleryTest.yml", "--dotenv=.env.artillery"], stdout=log_file, stderr=log_file)
    except Exception as e:
        error_msg = f"Error running artillery: {e}"
        print(error_msg)
        logging.error(error_msg)

@app.route("/api/call-python-function", methods=['POST'])
def call_python_function():
    try:
        json_data = request.json
        if json_data:
            if isinstance(json_data, dict):
                result = write_env_file(json_data)
                if result:
                    env_file_path = ".env.artillery"
                    if os.path.exists(env_file_path):
                        # Run artillery in a separate thread
                        threading.Thread(target=run_artillery).start()
                    return "File created successfully."
                else:
                    return "Failed to create file.", 500  # Internal Server Error
            else:
                return "Invalid JSON data format.", 400  # Bad Request
        else:
            return "No JSON data received.", 400  # Bad Request
    except Exception as e:
        error_msg = f"Error handling request: {e}"
        print(error_msg)
        logging.error(error_msg)
        return "An error occurred.", 500  # Internal Server Error

def write_env_file(json_data):
    env_file_path = ".env.artillery"
    try:
        with open(env_file_path, 'w') as f:
            for key, value in json_data.items():
                formatted_key = key.upper().replace(" ", "_")
                f.write(f"{formatted_key}={value}\n")
            f.write(f"QUERY_FILE={query_file_name}\n")
        return 'True'
    except Exception as e:
        print(f"Error writing .env file: {e}")
        return False

@app.route("/api/get-file-names", methods=['POST'])
def get_file_names():
    try:
        folder_path = request.json.get('folderPath')  # Extract folder path from the request
        if folder_path:
            file_names = os.listdir(folder_path)  # Get list of filenames in the folder
            return jsonify(file_names)
        else:
            return "No folder path received.", 400
    except Exception as e:
        print(f"Error getting file names: {e}")
        return "An error occurred.", 500

@app.route("/api/get-files")
def get_files():
    try:
        folder_path = "./graphQL/queries"
        files = os.listdir(folder_path)
        return {"files": files}
    except Exception as e:
        print(f"Error getting files: {e}")
        return "error"

def update_env_file(selected_file_name):
    global query_file_name  
    query_file_name = selected_file_name
    env_file_path = ".env.artillery"
    try:
        with open(env_file_path, 'r') as f:
            existing_content = f.read()

        match = re.search(r'^\s*FILE_NAME\s*=\s*.+', existing_content, flags=re.MULTILINE)

        if match:
            updated_content = re.sub(r'^\s*FILE_NAME\s*=\s*.+', f'FILE_NAME={selected_file_name}', existing_content, flags=re.MULTILINE)
        else:
           
            updated_content = existing_content + f'\nFILE_NAME={selected_file_name}'

 
        with open(env_file_path, 'w') as f:
            f.write(updated_content)

        return True
    except Exception as e:
        print(f"Error updating .env file: {e}")
        return False


@app.route("/api/save-query-file", methods=['POST'])
def save_query_file():
    try:
        data = request.json
        selected_file_name = data.get('fileName')
        if update_env_file(selected_file_name):
            return jsonify({"success": True, "message": "File name updated successfully!"}), 200
        else:
            return jsonify({"success": False, "message": "Failed to update file name!"}), 500
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({"success": False, "message": "Internal server error"}), 500
