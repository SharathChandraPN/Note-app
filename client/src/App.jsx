import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get(API_URL);
        setNotes(response.data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    getNotes();
  }, []);

  const addNote = async () => {
    if (!text.trim()) return;

    try {
      const response = await axios.post(API_URL, {
        text,
      });

      setNotes((currentNotes) => [response.data, ...currentNotes]);
      setText("");
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div>
      <h1>My Notes</h1>

      <input
        type="text"
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addNote}>Add Note</button>

      <div>
        {notes.map((note) => (
          <div key={note._id}>
            <span>{note.text}</span>

            <button onClick={() => deleteNote(note._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;