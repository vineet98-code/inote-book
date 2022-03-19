var http = require('http');

var server = http.createServer(handledRequest);

function handledRequest(req,res){
    res.end('welcome');
}

server.listen(3000, () => {
    console.log('Server started at port 3000');
})


