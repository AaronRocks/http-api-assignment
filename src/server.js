const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./jsonResponse.js');
const xmlHandler = require('./xmlResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handleGet = (request, response, parsedUrl) => {
    if (parsedUrl.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
    } 
    else if (parsedUrl.pathname === '/badRequest') {
        // if (xml)
            // xmlHandler
        // else
            // jsonHandler.getUsers(request, response);
    } 
    else if (parsedUrl.pathname === '/unauthorized') {
    // if (xml)
      // xmlHandler
    // else
      // jsonHandler.getUsers(request, response);
    } 
    else if (parsedUrl.pathname === '/forbidden') {
        // if (xml)
        // xmlHandler
        // else
        // jsonHandler.getUsers(request, response);
    } 
    else if (parsedUrl.pathname === '/internal') {
        // if (xml)
        // xmlHandler
        // else
        // jsonHandler.getUsers(request, response);
    } 
    else if (parsedUrl.pathname === '/notImplemented') {
        // if (xml)
        // xmlHandler
        // else
        // jsonHandler.getUsers(request, response);
    } 
    else {
        htmlHandler.getIndex(request, response);
    }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  handleGet(request, response, parsedUrl);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
