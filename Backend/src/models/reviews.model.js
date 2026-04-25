import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    estrellas: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    propiedad: {
        type: String,
        required: true,
    },
    comentario: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    }
})

export default mongoose.model('Reviews', reviewSchema);