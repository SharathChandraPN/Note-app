import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/notes`;

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
    <div className="app">
      <div className="notes-wrapper">

        <header className="header">
          <div className="header-icon">✓</div>

          <h1>Simple Notes</h1>

          <p>
            Capture your thoughts and keep them organized.
          </p>
        </header>

        <section className="add-note">
          <input
            type="text"
            placeholder="Write a note."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={addNote}>
            Add Note
          </button>
        </section>

        <div className="notes-title">
          <div>
            <h2>Your Notes</h2>
            <p>All your saved notes</p>
          </div>

          <span>{notes.length}</span>
        </div>

        <section className="notes">
          {notes.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📝</div>

              <h3>No notes yet</h3>

              <p>
                Add your first note using the box above.
              </p>
            </div>
          ) : (
            notes.map((note) => (
              <div className="note" key={note._id}>
                <div className="note-left">
                  <div className="note-dot"></div>

                  <p>{note.text}</p>
                </div>

                <button
                  className="delete"
                  onClick={() => deleteNote(note._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </section>

        <footer>
          {notes.length > 0
            ? `${notes.length} ${notes.length === 1 ? "note" : "notes"} saved`
            : "Start writing something"}
        </footer>

      </div>
    </div>
  );
}

export default App;
