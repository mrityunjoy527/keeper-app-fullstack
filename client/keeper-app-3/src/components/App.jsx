import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import { useEffect, useState } from "react";
import Note from "./Note";
import axios from "axios";

function App() {
  const [notesController, setNotesController] = useState([]);

  async function getAllNotes() {
    const res = await axios.get("http://localhost:3001/");
    setNotesController((prev) => res.data);
    return res.data;
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  async function addNote(note) {
    await axios.post("http://localhost:3001/", note, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await getAllNotes();
    setNotesController((prev) => data);
  }

  async function deleteNote(index) {
    await axios.post(
      "http://localhost:3001/delete",
      {
        idx: index,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = await getAllNotes();
    setNotesController((prev) => data);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notesController.map((note, idx) => (
        <Note
          key={note._id}
          idx={note._id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
