import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }

}, {timestamps : true}); // date de création et de modification

export default mongoose.model("User", userSchema); // création du model (Task sera le nom dans la table) Task et export de celui-ci