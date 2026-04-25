import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRoutes from './routes/auth.routes.js';
import propertiesRoutes from "./routes/property.routes.js";
import servicesRoutes from "./routes/service.routes.js";
import reservationRoutes from "./routes/reservation.routes.js"
import personalRoutes from "./routes/personal.routes.js"
import clientRoutes from "./routes/client.routes.js"
import reviewRoutes from "./routes/review.routes.js"
import visitRoutes from "./routes/visit.routes.js"

const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api',authRoutes);
app.use('/api',propertiesRoutes)
app.use('/api',servicesRoutes)
app.use('/api',reservationRoutes)
app.use('/api',personalRoutes)
app.use('/api',clientRoutes)
app.use('/api',reviewRoutes)
app.use('/api', visitRoutes)

export default app;