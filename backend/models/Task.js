import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    },
    user:{
        type: Schema.Types.ObjectId, // relation avec la table user
        ref: "User",
        required: true,
    }
}, {timestamps : true}); // date de création et de modification

export default mongoose.model("Task", taskSchema); // création du model (Task sera le nom dans la table) Task et export de celui-ci