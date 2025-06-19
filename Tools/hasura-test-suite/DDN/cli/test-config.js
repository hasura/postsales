'use strict';

const EasyGraphQLTester = require('easygraphql-load-tester');
const { fileLoader } = require('merge-graphql-schemas');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.artillery' });
const schema = fs.readFileSync(path.join(__dirname, 'schema/schema.graphql'), 'utf8');
const queriesPath = path.join(__dirname ,'queries', process.env.QUERY_FILE);

const queriesContent = fs.readFileSync(queriesPath, 'utf8');
//console.log(queriesContent);

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
//console.log('hi /n/n/n',events, '/n/n/n')
 const request_id = res.rawHeaders[5]
 //console.log('hi \n\n\n',res, '\n\n\n')
  const pattern = /query\s+(\w+)/i;
  const matches = pattern.exec( req.json.query);
  const operationName = matches[1];
  if (res) {
    if (res.body) {
      const payloadSize = Buffer.byteLength(JSON.stringify(res.body), 'utf8');
      events.emit('counter',`request.${operationName}.${request_id}.payloadsize_bytes`, payloadSize);

   //   events.emit("customStat", "operationName", operationName);
      console.log(`\n
      ----------------------------------
      Payload size: ${payloadSize} bytes 
      ----------------------------------\n`);
    }
  }
  done();
}



module.exports = { testCases, myBeforeRequestHook };


