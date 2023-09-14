const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Determine the file path based on the request URL
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './pages/weather_data.html';
    }

    // Get the file extension
    const extname = String(path.extname(filePath)).toLowerCase();

    // Define content types for common file extensions
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
    };

    // Check if the requested file exists
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found, return a 404 response
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // Server error, return a 500 response
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            // File found, serve it with the appropriate content type
            res.writeHead(200, { 'Content-Type': contentType[extname] || 'text/plain' });
            res.end(content, 'utf-8');
        }
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
