import app from './app.js';
import {connectDB} from './db.js';

connectDB();

const port = process.env.PORT || 3001;

app.listen(port);
console.log('Servidor :',port);