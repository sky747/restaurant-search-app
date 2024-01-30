const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

app.use('/api', (req, res) => {
  proxy.web(req, res, {
    target: 'https://webservice.recruit.co.jp',
    changeOrigin: true,
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
