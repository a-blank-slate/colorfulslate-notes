import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(0);

  const fetchData = () => {
    let hackingCode = prompt("Please enter hacking code", "");
    if (hackingCode == null || hackingCode === "") {
      alert("mandatory input")
    } else {
      fetch(process.env.REACT_APP_WORKER_TODO_URL, {
        method: 'GET',
        headers: {
          "hackingCode": hackingCode
        }
      }).then(res => {
        return res.json()
      }).then(data => setNotes(data))
        .catch(error => console.log(error))
    }
  }

  const sync = () => {
    let hackingCode = prompt("Please enter hacking code", "");
    if (hackingCode == null || hackingCode === "") {
      alert("mandatory input")
    } else {
      if (notes.length !== 0) {
        fetch(process.env.REACT_APP_WORKER_TODO_URL, {
          method: 'PUT',
          headers: {
            "hackingCode": hackingCode
          },
          body: JSON.stringify(notes)
        }).then(res => {
          return res.json()
        }).then(data => alert('synced!'))
          .catch(error => console.log(error))
      } else {
        alert('Nothing to Sync!!');
      }
    }
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
    <div className="App" style={{ backgroundImage: "url('/white-image.jpg')" }}>
      <SideBar notes={notes} onAddNote={onAddNote}
        onDeleteNote={onDeleteNote} activeNote={activeNote}
        setActiveNote={setActiveNote} fetchData={fetchData} sync={sync} />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
