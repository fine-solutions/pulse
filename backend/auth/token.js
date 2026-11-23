const isTokenValid = (request, response) => {
  const token = request.get('Authorization');
  if (token !== 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf') {
    response.statusCode = 401;
    response.json({ answer: 'Unauthorized' });
    return false;
  } else {
    return true;
  }
};

export {
  isTokenValid
}
