/* const { mongoose, Schema } = require("mongoose"); */ //same as:

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//patern: the blueprint for my model
const pizzaSchema = new Schema({
	title: {
		type: String,
		/* unique: true, */ //makes the value unique. will throw error if you try to create another object with the same title.
	},
	/* price: Number, */
	price: {
		type: Number, //same as above
		required: true, //Mongoose Built in validator: makes it so price is REQUIRED
		min: 5,
	},
	isVeggie: {
		type: Boolean,
		default: false,
	},
	ingredients: [String], // <- Must include Array of WHAT
	imageFile: String,
	dough: {
		type: String,
		enum: ["classic", "thin", "extra-thin", "with garlic"], //defines the ONLY available values for dough:
	},
});

//model: what I use to interact
const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
