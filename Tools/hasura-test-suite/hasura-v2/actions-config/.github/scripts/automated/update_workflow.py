import os
import json

directory = 'library/loadTest' 

def get_folder_names(directory):
    return [name for name in os.listdir(directory) if os.path.isdir(os.path.join(directory, name))]

data = get_folder_names(directory)

service_names = data

workflow_template = """
name: Run Hasura Tests Suite
on:
  workflow_dispatch:
    inputs:
"""

inputs = {
    'GRAPHQL_ENDPOINT': 'GraphQL Endpoint',
    'HASURA_ADMIN_SECRET': 'Hasura Admin Secret',
    'TEST_DURATION': 'Test Duration',
    'STARTING_ARRIVAL_RATE': 'Starting Arrival Rate',
    'ENDING_ARRIVAL_RATE': 'Ending Arrival Rate',
    'MAXIMUM_VIRTUAL_USER': 'Maximum Virtual User',
    'TEST_NAME': 'Test Name',
    'PUSHGATEWAY': 'Pushgateway',
    'QUERY_FILE': 'Query File',
    'SERVICE_NAME': 'Service Name'
}


for name, description in inputs.items():
    if name == 'SERVICE_NAME':
        workflow_template += f"      {name}:\n"
        workflow_template += f"        description: '{description}'\n"
        workflow_template += f"        required: true\n"
        workflow_template += f"        type: choice\n"
        workflow_template += f"        options: {service_names}\n"
    else:
        workflow_template += f"      {name}:\n"
        workflow_template += f"        description: '{description}'\n"
        workflow_template += f"        required: true\n"

workflow_template += """
jobs:
  run-artillery-tests:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install Artillery globally
      run: npm install -g artillery

    - name: Install node modules and generate graphQL schema
      working-directory: .github/test-configs/loadTest
      run: |
        npm install
        npm run codegen

    - name: Generating Schema
      run: python .github/scripts/test.py
"""

with open('.github/workflows/run_hts.yml', 'w') as f:
    f.write(workflow_template)


print("Workflow configuration updated successfully.")
