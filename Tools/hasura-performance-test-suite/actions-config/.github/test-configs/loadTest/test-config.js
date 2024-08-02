'use strict';

const EasyGraphQLTester = require('easygraphql-load-tester');
const { fileLoader } = require('merge-graphql-schemas');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.artillery' });
const schema = fs.readFileSync(path.join(__dirname, 'schema/schema.graphql'), 'utf8');
const queriesPath = path.join(__dirname,'..', '..', '..', 'library', 'loadTest', process.env.SERVICE_NAME , process.env.QUERY_FILE);

const queriesContent = fs.readFileSync(queriesPath, 'utf8');

const customQueries = queriesContent.split(/\n(?=\w)/).filter(query => query.trim() !== '');
console.log(customQueries);
const ArgsArray = require('./mutationArgs/generatedArgs.json');
const easyGraphQLLoadTester = new EasyGraphQLTester(schema, ArgsArray);
const testCases = easyGraphQLLoadTester.artillery({
  customQueries,
  onlyCustomQueries: true,
  queryFile: true,
  withMutations: true,
});


function myBeforeRequestHook(req, res, context, events, done) {
 const request_id = res.rawHeaders[5]
  const pattern = /query\s+(\w+)/i;
  const matches = pattern.exec( req.json.query);
  const operationName = matches[1];
  if (res) {
    if (res.body) {
      const payloadSize = Buffer.byteLength(JSON.stringify(res.body), 'utf8');
      events.emit('counter',`request.${operationName}.${request_id}.payloadsize_bytes`, payloadSize);
      console.log(`\n
      ----------------------------------
      Payload size: ${payloadSize} bytes 
      ----------------------------------\n`);
    }
  }
  done();
}

module.exports = { testCases, myBeforeRequestHook };


