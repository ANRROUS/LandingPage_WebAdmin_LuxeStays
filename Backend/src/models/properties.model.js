import mongoose from "mongoose";

const propertiesSchema = new mongoose.Schema({
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
    clasificacion: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true,
    },
    distrito: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    }
})

export default mongoose.model('Properties', propertiesSchema);