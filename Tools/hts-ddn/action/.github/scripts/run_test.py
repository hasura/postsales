import os
import subprocess
subprocess.run(['npm', 'run', 'codegen'], check=True)
subprocess.run(['artillery', 'run', 'artilleryTest.yml'], check=True)
