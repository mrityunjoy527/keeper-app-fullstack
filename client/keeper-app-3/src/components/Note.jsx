import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {

  function del() {
    props.onDelete(props.idx);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={del}
      >
        <DeleteIcon/>
      </button>
    </div>
  );
}

export default Note;