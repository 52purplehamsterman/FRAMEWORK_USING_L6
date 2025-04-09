module.exports = function errorMiddleware(err, req, res) {
    console.error('Ошибка сервера:', err.message);
      if (res.headersSent) {
      return;
    }
      res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error', error: err.message }));
  };