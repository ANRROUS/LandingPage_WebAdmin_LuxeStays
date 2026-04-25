import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
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
    numero: {
        type: String,
        required: true,
    },
    fechaRegistro: {
        type: Date,
        required: true,
    },
})

export default mongoose.model('Client', clientSchema);