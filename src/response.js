const respond = (request, response, content, type, statusCode) => {
  response.writeHead(statusCode, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getPage = (request, response, acceptedTypes, statusCode, params) => {
  const body = {
    message: 'This is a successful response',
    statusMessage: 'Success',
  };

  // bad request 400
  if (statusCode === 400) {
    body.message = 'Missing valid query parameter set to true';
    body.id = 'bedRequest';
    body.statusMessage = 'Bad Request';
  } else if (statusCode === 401) {
    body.id = 'unauthorized';
    body.message = 'Missing loggedIn query set to yes';
    body.statusMessage = 'Unauthorized';
  } else if (statusCode === 403) {
    body.id = 'forbidden';
    body.message = 'You do not have access to this content.';
    body.statusMessage = 'Forbidden';
  } else if (statusCode === 500) {
    body.id = 'internalError';
    body.message = 'Internal server error. Something went wrong.';
    body.statusMessage = 'Internal Error';
  } else if (statusCode === 501) {
    body.id = 'notImplemented';
    body.message = 'A GET request for this page has not been implemented yet. Check again later for updated content';
    body.statusMessage = 'Not Implemented';
  } else if (statusCode === 200) {
    body.message = 'This is a successfull response';
  } else if (params === 'yes') {
    body.message = 'you successfully viewed the content';
  } else if (params === 'true') {
    body.message = 'the request has the desired parameters';
  } else {
    // if not any of the other status codes, error 404 not found
    body.id = 'notFound';
    body.message = 'The page you are looking for is not found';
    body.statusMessage = 'Not Found';
  }
  // default successful response status 200
  // either way, all id's and messages added to response

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${body.message}</message>`;
    // will only return true for message.id if it has been created as a property
    // through a non-200 status code
    if (body.id) {
      responseXML = `${responseXML} <id>${body.id}</id>`;
    }
    responseXML = `${responseXML} <statusMessage>${body.statusMessage}</statusMessage>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', statusCode);
  }

  const bodyString = JSON.stringify(body);
  return respond(request, response, bodyString, 'application/json', statusCode);
};

module.exports = {
  getPage,
};
