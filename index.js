const { Ultraviolet } = require('@tomphttp/ultraviolet');
const express = require('express');

const app = express();
const ultraviolet = new Ultraviolet({
  bare: 'https://tomphttp.com/bare/',
  prefix: '/service/',
  encodeUrl: Ultraviolet.url.encode,
  decodeUrl: Ultraviolet.url.decode,
  handler: Ultraviolet.handler
});

app.use(express.static('./public'));

// Proxy traffic through Ultraviolet
app.use('/service/', ultraviolet.middleware);

// Home Page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Welcome to the Mapple Proxy!</h1>
        <form method="GET" action="/service/">
          <input name="url" placeholder="Enter URL (e.g., mapple.tv)">
          <button type="submit">Go</button>
        </form>
      </body>
    </html>
  `);
});

app.listen(8080, () => console.log('Server running on port 8080'));
