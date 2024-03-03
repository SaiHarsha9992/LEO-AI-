import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use('/images', express.static('images'));
const port = 3000;

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port);