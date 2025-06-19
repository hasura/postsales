const fs = require('fs');
const yaml = require('js-yaml');

function generateRandomString() {
    const length = 8;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  
  function generateRandomValue(type, startValue, constant) {
    let DEFAULT = null;
    if(constant){
        DEFAULT = constant;
    }
    if (type === 'randomstring') {
      return generateRandomString();
    } else if (type === 'Int') {
      return Math.floor(Math.random() * (startValue || 1000));
    } else {
      //Todo: Add support for other value 
      return constant; // Default to null for unsupported types
    }
  }

  function generateArgsArray(parameters, calls) {
    const argsArray = [];
  
    for (let i = 0; i < calls; i++) {
      const argsObject = {};
  
      parameters.forEach((param) => {
        argsObject[param.name] = generateRandomValue(param.type, param.startValue, param?.constant);
      });
  
      argsArray.push(argsObject);
    }
  
    return argsArray;
  }

try {
  const fileContents = fs.readFileSync('mutationArgs/mutations.yml', 'utf8');
  const config = yaml.load(fileContents);

  const ArgsArray = {};

  config.mutations.forEach((mutation) => {
    const mutationName = mutation.name;
    const parameters = mutation.parameters || [];
    const calls = mutation.calls || 1;

    ArgsArray[mutationName] = generateArgsArray(parameters, calls);
  });

  console.log(ArgsArray);
  const jsonString = JSON.stringify(ArgsArray, null, 2);
  fs.writeFileSync('mutationArgs/generatedArgs.json', jsonString);
} catch (e) {
  console.error('Error reading or parsing the YAML file:', e.message);
}
