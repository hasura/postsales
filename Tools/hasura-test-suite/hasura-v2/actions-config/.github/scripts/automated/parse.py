import os
import json

directory = 'library/loadTest' 

def get_folder_names(directory):
    return [name for name in os.listdir(directory) if os.path.isdir(os.path.join(directory, name))]

def get_folders_and_graphql_files(directory):
    data = {}
    for root, dirs, files in os.walk(directory):
        for dir in dirs:
            folder_path = os.path.join(root, dir)
            graphql_files = [file for file in os.listdir(folder_path) if file.endswith('.graphql')]
            data[dir] = graphql_files
    return data
data = get_folder_names(directory)

print("Parsed data saved to output.json", data)
