import mongoose from "mongoose";

const reservationsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    cliente: {
        type: String,
        required: true,
    },
    propiedad: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    }
})

export default mongoose.model('Reservations', reservationsSchema);