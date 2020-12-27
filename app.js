const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const ms = [];

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Charset', 'UTF-8');
            res.end(fs.readFileSync('index.html'), 'UTF-8', null);
            break;
        case '/msg':
            if(req.method == 'POST')
            {
                req.on('data', (chunk) => {
                
                    let obj = JSON.parse(chunk.toString('UTF-8'));
                    if(!obj && !obj.text)
                    {
                        res.statusCode = 400;
                        res.end();
                        return;
                    }
                    ms.unshift({text: obj.text});
                    ms.splice(5);
                    res.statusCode = 202;
                    res.end();
                });
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Charset', 'UTF-8');
            res.end(JSON.stringify(ms));
            break;
        default:
            res.statusCode = 404;
            res.end();
            break;
    }
});

server.listen(port, hostname);