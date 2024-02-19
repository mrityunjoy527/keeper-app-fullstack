import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/notesDB");

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Note = new mongoose.model('note', noteSchema);

async function getAllNotes() {
    return await Note.find({});
}

app.get("/", async (req, res) => {
    const data = await getAllNotes();
    res.send(data);
});

app.post('/', (req, res) => {
    const note = Note(req.body);
    note.save();
    res.send('Successful');
});

app.post('/delete', async (req, res) => {
    const noteIdx = req.body.idx;
    await Note.deleteOne({_id: noteIdx});
    res.send("Deleted");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});