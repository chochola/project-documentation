// Server Start
const express = require ( "express" );
const app = express();
const server = require ( "http" ).createServer(app);
const options = { /* ... */ };
const io = require ( "socket.io" )( server, options);
const PORT = process.env.PORT || 4000;
server.listen( PORT );
console.log ( `Server listens at ${PORT}`);

// load index.html
app.use ( express.static( "src" ));
app.use ( express.urlencoded({ extended:false }));