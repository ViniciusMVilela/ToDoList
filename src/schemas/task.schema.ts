import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true },
    descricao: { type: String, required: true },
    dateCreate: { type: Date, default: Date.now },
    dateFinish: { type: Date },
    type: { type: String, required: true },
    category: { type: String },
    status: { type: String, enum: ['to do', 'in progress', 'closed'], default: 'to do'},
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true }
}, {
    timestamps: true
});

export default model("task", taskSchema);
