const parseRequest = req => {
  return new Promise((resolve, reject) => {
    let chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(JSON.parse(Buffer.concat(chunks).toString())));  
  });
};

module.exports = parseRequest;