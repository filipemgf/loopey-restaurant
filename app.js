const express = require("express");
const hbs = require("hbs");
const Pizza = require("./models/Pizza.model");
const { default: mongoose } = require("mongoose");
mongoose;

const app = express();

// app.get(path, code); when we get a request for path, execute code

app.use(express.static("public")); //make everything inside /public available
app.set("views", __dirname + "/views"); //telling the program that the views I'll use for handlebars (hbs) is in the views folder
app.set("view engine", "hbs"); //sets HBS as my template engine

hbs.registerPartials(__dirname + "/views/partials"); //storing partials in that directory

async function connectToMongoDB() {
	try {
		response = await mongoose.connect(
			"mongodb://127.0.0.1:27017/loopeyRestaurant"
		);
		console.log(
			"Connected to mongoDB! Database Name:",
			response.connections[0].name
		);
	} catch (error) {
		console.error("Error connecting to MongoDB: ", error);
	}
}

connectToMongoDB();

app.get("/", (request, response, next) => {
	//req, res,next are objects that have info and functionality related to the request
	console.log("homepage has been requested");
	response.render(__dirname + "/views/home-page.hbs");
});

app.get("/contact-page", (req, res, next) => {
	console.log("contact page has been requested");
	res.render(__dirname + "/views/contact-page.hbs"); //render instead of sendFile because we're rendering a view with Handlebars
});

/* //non-specific routes
app.get("/pizzas/margarita", async (req, res, next) => {
	console.log("Margarita page requested");

	try {
		const pizzaFromDB = await Pizza.findOne({ title: "margarita" });
		console.log(pizzaFromDB);
		res.render("product", pizzaFromDB);
	} catch (error) {
		console.log("Error getting pizza from db", error);
	}
});

Pizza.findOne({ title: "margarita" }) // using .then().catch()
		.then((margaritaFromDB) => {
			res.render("product", margaritaFromDB);
		})
		.catch((error) =>
			console.log("Error getting Margarita Pizza from db", error)
		);

app.get("/pizzas/veggie", async (req, res, next) => {
	console.log("Veggie page requested");

	try {
		const pizzaFromDB = await Pizza.findOne({ title: "veggie" });
		console.log(pizzaFromDB);
		res.render("product", pizzaFromDB);
	} catch (error) {
		console.log("Error getting pizza from db", error);
	}
});

app.get("/pizzas/seafood", async (req, res, next) => {
	console.log("Seafood page requested");

	try {
		const pizzaFromDB = await Pizza.findOne({ title: "seafood" });
		console.log(pizzaFromDB);
		res.render("product", pizzaFromDB);
	} catch (error) {
		console.log("Error getting pizza from db", error);
	}
});

*/

/* //creating a generic route with req.params (example)
app.get("/drinks/:drinkName", async (req, res, next) => {
	console.log(req.params); //object in this format: {drinkName: WhateverWeCallInBrowser}
	res.send("We are asking for: " + req.params.drinkName);
}); */ //generic route example

app.get("/pizzas", async (req, res, next) => {
	console.log("product-list requested");

	try {
		const pizzasArr = await Pizza.find();
		res.render("product-list", { pizzasArr });
	} catch (error) {
		console.log(error);
	}
});

app.get("/pizzas/:pizzaName", async (req, res, next) => {
	console.log(`${req.params.pizzaName} requested`);

	try {
		const pizzaFromDB = await Pizza.findOne({
			title: req.params.pizzaName,
		});
		res.render("product", pizzaFromDB);
	} catch (error) {
		console.log(error);
	}
});

app.listen(3000, () => {
	console.log("Server listening to port 3000");
}); //this listens for requests on that port
