import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(0);

  const fetchData = () => {
    fetch('https://slate.the-colorful-slate.workers.dev', {
      method: 'GET',
    }).then(res => {
      return res.json()
    })
      .then(data => setNotes(data))
      .catch(error => console.log(error))
  }

  const sync = () => {
    fetch('https://slate.the-colorful-slate.workers.dev', {
      method: 'PUT',
      body: JSON.stringify(notes)
    }).then(res => {
      return res.json()
    }).then(data => alert('synced!'))
      .catch(error => console.log(error))
  }

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      body: "",
      title: "",
      lastModified: Date.now()
    }
    setNotes([newNote, ...notes])
    setActiveNote(newNote.id);
  }
  const onDeleteNote = (idToDelete) => {
    setNotes(
      notes.filter((note) => idToDelete !== note.id)
    )
  }
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  }
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) return updatedNote;
      return note;
    })

    setNotes(updatedNotesArray)
  }
  return (
    <div className="App">
      <SideBar notes={notes} onAddNote={onAddNote}
        onDeleteNote={onDeleteNote} activeNote={activeNote}
        setActiveNote={setActiveNote} fetchData={fetchData} sync={sync} />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
