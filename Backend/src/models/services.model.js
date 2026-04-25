import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
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
    precio: {
        type: Number,
        required: true,
    },
    duracion:{
        type: Number,
        required: true,
    }
})

export default mongoose.model('Services', servicesSchema);