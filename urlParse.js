

const http = require('http');
const { URL } = require('url');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
  
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);

    if (requestUrl.pathname === '/parse' && requestUrl.searchParams.has('url')) {
        const urlToParse = requestUrl.searchParams.get('url');

        try {
            const parsedUrl = new URL(urlToParse);

            res.end(`
                        <h1>Parsed URL Components</h1>
                        <p><strong>Original URL:</strong> ${urlToParse}</p>
                        <hr>
                        <p><strong>Protocol:</strong> ${parsedUrl.protocol}</p>
                        <p><strong>Full URL:</strong> ${parsedUrl.href}</p>
                        <p><strong>Host:</strong> ${parsedUrl.host}</p>
                        <p><strong>Hostname:</strong> ${parsedUrl.hostname}</p>
                        <p><strong>Port:</strong> ${parsedUrl.port || '(none)'}</p>
                        <p><strong>Path:</strong> ${parsedUrl.pathname}</p>
                        <p><strong>Search:</strong> ${parsedUrl.search}</p>
                        <p><strong>Search Params:</strong> <pre>${JSON.stringify(Object.fromEntries(parsedUrl.searchParams.entries()), null, 2)}</pre></p>
                        <p><strong>Hash:</strong> ${parsedUrl.hash}</p>
            `);
        } catch (error) {
            res.end(`
                        <h1>Error Parsing URL</h1>
                        <p class="error">Could not parse the provided URL: <strong>${urlToParse || 'No URL provided'}</strong></p>
                        <p>Error details: ${error.message}</p>
                        <p>Please try a valid URL, for example: <a href="/parse?url=https://www.example.com:8080/path/name?user=john&age=25#section1">/parse?url=https://www.example.com:8080/path/name?user=john&age=25#section1</a></p>
            `);
        }
    } else {
        res.end(`
            <h1>Welcome to the Node.js URL Parser Server</h1>
            <p>This is a basic web server created using Node.js HTTP module.</p>
            <p>To parse a URL, go to: <a href="/parse?url=https://www.example.com:8080/path/name?user=john&age=25#section1">/parse?url=https://www.example.com:8080/path/name?user=john&age=25#section1</a></p>
            <p>You can replace the example URL with any URL you want to parse.</p>
        `);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Try parsing a URL: http://localhost:${PORT}/parse?url=https://www.example.com:8080/path/name?user=john&age=25#section1`);
});