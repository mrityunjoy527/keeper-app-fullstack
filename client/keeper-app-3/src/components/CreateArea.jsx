import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  function expand() {
    setExpanded(true);
  }

  const [noteController, setNoteController] = useState({
    title: "",
    content: "",
  });

  function controlNote(event) {
    const { name, value } = event.target;
    setNoteController((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const submitNote = async(event) => {
    if(noteController.title.length === 0 || noteController.content.length === 0) return;
    props.onAdd(noteController);
    setNoteController({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={submitNote} className="create-note">
        {isExpanded && (
          <input
            onChange={controlNote}
            name="title"
            placeholder="Title"
            value={noteController.title}
          />
        )}
        <textarea
          onClick={expand}
          onChange={controlNote}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? "3" : 1}
          value={noteController.content}
        />
        <Zoom in={isExpanded}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
