import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    cargo: {
        type: String,
        required: true,
    },
    desde: {
        type: Date,
        required: true,
    },
    hasta: {
        type: Date,
        required: true,
    },
})

export default mongoose.model('Personal', personalSchema);