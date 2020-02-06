const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponse.js');
const responseHandler = require('./response.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');

  // basic status code is success
  let statusCode = 200;
  let params = query.parse(parsedUrl.query);
  // default index page
  if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  }
  // pasrse the style page
  else if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } 
  else {
    // anything else will check the url. If it is not accepted, will return 404 page
    if (parsedUrl.pathname === '/badRequest') {
      // check if the user has querystring of valid=true -> if not, retrun status code 400
      if (!params.valid || params.valid !== 'true')
        statusCode = 400;
    }
    else if (parsedUrl.pathname === '/unauthorized'){
        // check if user has querystring of loggedIn=yes -> if not status code 401
        if (params.loggedIn !== 'yes')
        statusCode = 401;
    }
    else if (parsedUrl.pathname === '/forbidden'){
        statusCode = 403;
    }
    else if (parsedUrl.pathname === '/internal'){
        statusCode = 500;
    }
    else if (parsedUrl.pathname === '/notImplemented'){
        statusCode = 501;
    }
    else if (parsedUrl.pathname === '/success'){}
    else{
        statusCode = 404;
    }
    responseHandler.getPage(request, response, acceptedTypes, statusCode, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
