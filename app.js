const express = require("express");
const hbs = require("hbs");

const app = express();

// app.get(path, code); when we get a request for path, execute code

app.use(express.static("public")); //make everything inside /public available
app.set("views", __dirname + "/views"); //telling the program that the views I'll use for handlebars (hbs) is in the views folder
app.set("view engine", "hbs"); //sets HBS as my template engine

hbs.registerPartials(__dirname + "/views/partials"); //storing partials in that directory

app.get("/", (request, response, next) => {
	//req, res,next are objects that have info and functionality related to the request
	console.log("homepage has been requested");
	response.render(__dirname + "/views/home-page.hbs");
});

app.get("/contact-page", (req, res, next) => {
	console.log("contact page has been requested");
	res.render(__dirname + "/views/contact-page.hbs"); //render instead of sendFile because we're rendering a view with Handlebars
});

const pizzaDetails = {
	margarita: {
		name: "Margarita",
		price: 15,
		img: "/images/margarita.jpg",
		ingredients: ["mozzarella", "tomato sauce", "basilica leaves", "cheese"],
	},
	veggie: {
		name: "Veggie",
		price: 18,
		img: "/images/veggie.jpg",
		ingredients: [
			"bell pepper",
			"onion",
			"tofu balls",
			"tomato sauce",
			"cheese",
		],
	},
	seafood: {
		name: "Seafood",
		img: "/images/seafood.jpg",
		ingredients: ["shrimp", "onion", "tomato sauce", "cheese"],
	},
};

app.get("/pizzas/margarita", (req, res, next) => {
	/* res.send("page for margarita"); */
	res.render("product", pizzaDetails.margarita); //render("name-of-view") linking my view.hbs file. Also accepts objects as a parameter for extra info we want to pass to handlebars. {{}} <- use this on .hbs to use that info

	console.log("pizza margarita resquested");
});

app.get("/pizzas/veggie", (req, res, next) => {
	/* res.send("page for veggie"); */
	res.render("product", pizzaDetails.veggie);
	console.log("pizza veggie resquested");
});

app.get("/pizzas/seafood", (req, res, next) => {
	/* res.send("page for seafood"); */
	res.render("product", pizzaDetails.seafood);
	console.log("pizza seafood requested");
});

app.listen(3000, () => {
	console.log("Server listening to port 3000");
}); //this listens for requests on that port
