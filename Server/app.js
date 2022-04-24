import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from "cors";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/user', router)
app.use('/api/blog', blogRouter)



// app.use(express.static('client/build'))
// app.get('*', (req, res) => {
//     res.sendFile(`${__dirname}/client/build/index.html`)
// })


const port = process.env.PORT || 5000
mongoose.connect('mongodb+srv://abdallah:abdallah2020@nodeexpressprojects.wnuke.mongodb.net/Blog?retryWrites=true&w=majority')
    .then(() => app.listen(port, () => console.log(`server is listening on port ${port}...`)))
    .catch(() => console.log(error))

