const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
	topicName: {type: String, required: true ,lowercase=true},
	topicCategories: {type: Array, required: true, minItems:1,uniqueItems=true},

});

const question = mongoose.model("subtopics",topicSchema)
