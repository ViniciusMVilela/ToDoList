import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    id: Number,
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    weight: { type: Number, required: true }
}, {
    timestamps: true
});

export default model("user", userSchema)