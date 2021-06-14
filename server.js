const http = require('http');
const fs = require("fs");

const HTML_DIR = 'html_serve';
const PORT = process.env.PORT || process.argv[2] || 8080;

//Create MongoDB client
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'demo_db';
let db, collection;

MongoClient.connect(dbUrl, function(err, client) {
    if (err) {
        console.log("Failed to connect to DB server: ", err);
        response.writeHead(500);
        response.end(err);
    } else {
        console.log("Connected successfully to the db server.");
        db = client.db(dbName);
        collection = db.collection('doohickeys');
    }
});

//Create server
const server = http.createServer(onRequest);
server.listen(PORT);
console.log(`Server listening on port ${PORT}`);

function onRequest(request, response) {
    let respType = 'html';
    console.log(`Received request for: ${request.url}`);

    //MongoDB API calls on server side
    if ('/api_rest/doohickeys' === request.url) {
        collection.find({}).toArray(function(err, docs) {
            if (err) {
                response.writeHead(500);
                response.end(err);
            } else {
                response.writeHead(200, {"Content-type": "application/json"});
                response.end(JSON.stringify(docs));
            }
        });

    }
    // } else {
        
    // }

    //http calls
    if ('/' === request.url) {
        fs.readFile(`${HTML_DIR}/index.html`, function(err, data) {
            response.writeHead(200, {"Content-type": "text/html"});
            response.write(data);
            response.end();
        });
    } else {
        fs.readFile(`${HTML_DIR}${request.url}`, function(err, data) {
            if (err) {
                fs.readFile(`${HTML_DIR}/404.html`,function(err, data) {
                    response.writeHead(404, {"Content-type": "text/html"});
                    response.write(data);
                    response.end();
                });
                //If we can not find a file with the URL name
                console.log("File not found");
            } else {
                //Let's deal with CSS and JS cases
                if (request.url.match(/.css$/)) {
                    respType = 'css';
                } else if (request.url.match(/.js$/)) {
                    respType = 'javascript';
                }
                response.writeHead(200, {"Content-type": `text/${respType}`});
                response.end(data);
            }
        });
    }
}
