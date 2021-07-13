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

app.use( express.json() );

// path data
const pathJson = __dirname + "/data/data.json";

// send JSON 
app.get( '/loadJson', (request,response) => {
	fs.readFile( pathJson, (err,data) => {
			const json = JSON.parse(data);
			response.json(json);
	});
})
