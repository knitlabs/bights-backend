const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const querySchema = new Schema({
	question: { type: String, required: true },
	subtopic: { type: String, required: true },
	topic: { type: String, required: true },
	questionConceptual: {type: String, required:true, default:true},
	language: {type:String, required:false},
	creationDate: { type: Date, required: true },
	initatedBy:{type:String,required:true},
	answeredBy:{type:String,required:true}

});

const question = mongoose.model("query",querySchema)
