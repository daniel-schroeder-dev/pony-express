const chalk = require('chalk');

const logger = (req, res, next) => {
  const { method, url } = req;
  res.on('finish', () => {
    console.log(formatLogString(method, url, res.statusCode));
  });
  next();
};

const formatLogString = (method, url, statusCode) => {
  method = addColorToMethodString(method);
  statusCode = addColorToStatusCode(statusCode);
  const tabs = url.length < 8 ? '\t\t' : '\t';
  return `${method}\t${url}${tabs}${statusCode}`;
};

const addColorToMethodString = method => {
  const methodsToColors = {
    'GET': chalk.redBright,
    'POST': chalk.greenBright,
    'PATCH': chalk.yellowBright,
    'DELETE': chalk.magentaBright,
  };
  return methodsToColors[method](method);
};

const addColorToStatusCode = statusCode => {
  if (statusCode <= 299) return chalk.greenBright(statusCode);
  if (statusCode <= 399) return chalk.yellowBright(statusCode);
  if (statusCode <= 499) return chalk.magentaBright(statusCode);
  return chalk.bgMagentaBright(statusCode);
};

module.exports = logger;
