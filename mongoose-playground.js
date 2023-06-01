// add here the code to interact with the database

const { mongoose } = require("mongoose");

const Pizza = require("./models/Pizza.model.js");

async function connectToMongoDB() {
	try {
		response = await mongoose.connect(
			"mongodb://127.0.0.1:27017/loopeyRestaurant"
		);
		console.log(
			"Connected to mongoDB! Database Name:",
			response.connections[0].name
		);

		const pizzaMargarita = {
			title: "margarita",
			price: 13,
			isVeggie: true,
		};
		const pizzaVeggie = {
			title: "veggie",
			price: 9,
		};

		/* 	const pizzaOneInDB = await Pizza.create(pizzaOne); //wait because Pizza.create() results in a promise. After it's resolved it makes the object in the DB
		console.log(pizzaOneInDB._id);
		await Pizza.create(pizzaTwo);
		console.log("All pizzas created!"); */

		await Pizza.insertMany([pizzaMargarita, pizzaVeggie]); //insert all objects in an array

		const pizzasPriceOverTen = await Pizza.find({ price: { $gt: 10 } }); // return an array of all objects in DB. can take a parameter that's an object with conditions to filter

		const allPizzas = await Pizza.find();
		/* console.log("Pizzas with Price > 10:", pizzasPriceOverTen);
		console.log("All pizzas:", allPizzas); */

		/* await Pizza.findByIdAndUpdate("6478ab940f908d98adc2efbb", { price: 20 });
		const updatedPizza = await Pizza.findById("6478ab940f908d98adc2efbb");
		console.log("Pizza price updated:", updatedPizza); */

		await Pizza.updateMany(
			{
				price: { $gt: 12 },
			},
			{ dough: "thin" }
		);
		console.log(
			"Pizzas with price >12:",
			await Pizza.find({ price: { $gt: 12 } })
		);
	} catch (error) {
		console.error("Error connecting to MongoDB: ", error);
	}
}

connectToMongoDB();
