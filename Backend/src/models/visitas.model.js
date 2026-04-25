import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
    visitDate:{
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Visit', visitSchema)