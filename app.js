const express = require("express");

const app = express();

// app.get(path, code); when we get a request for path, execute code

app.use(express.static("public")); //make everything inside /public available

app.get("/", (request, response, next) => {
	//req, res,next are objects that have info and functionality related to the request
	console.log("homepage has been requested");
	response.sendFile(__dirname + "/views/home-page.html");
});

app.get("/contact-page", (req, res, next) => {
	console.log("homepage has been requested");
	res.sendFile(__dirname + "/views/contact-page.html");
});

app.listen(3000, () => {
	console.log("Server listening to port 3000");
}); //this listens for requests on that port
