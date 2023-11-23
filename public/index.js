const http = require("http");
const fs = require('fs').promises;

const HOST = "localhost";
const PORT = 5000;

const requestListener = function (req, res) {
    if (req.url === "/") req.url = "/main.html";
    fs.readFile(__dirname + req.url)
        .then(page => {
            res.end(page);
        })
        .catch(err => {
            console.log(err);
            fs.readFile(__dirname + "/" + "error.html")
                .then(errPage => {
                    res.end(errPage);
                })
        });
}

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})