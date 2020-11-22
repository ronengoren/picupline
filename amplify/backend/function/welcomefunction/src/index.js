exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
