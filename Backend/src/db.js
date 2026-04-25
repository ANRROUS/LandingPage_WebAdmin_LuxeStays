import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ANRROUS:JhQq145CSyKiLPgO@cluster0.keey7.mongodb.net/miBaseDeDatos?retryWrites=true&w=majority");
        console.log(">>>Base de datos conectada<<<");
    } catch (error) {
        console.error("Error de conexión a MongoDB:", error);
    }
};
