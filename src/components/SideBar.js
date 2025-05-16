import React from 'react'

export default function SideBar({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote, fetchData, sync }) {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  return (
    <div className='app-sidebar'>
      <div className='app-sidebar-header'>
        <h1>Notes</h1>
        <button onClick={fetchData}>Fetch Notes</button>
        <button onClick={sync}>Save Changes</button>
        <button onClick={onAddNote}>Add New Note</button>
      </div>
      <div className='app-sidebar-notes'>
        {sortedNotes.map((note) => (
          <div key={note.id} className={`app-sidebar-note ${note.id === activeNote && 'active'}`}
            onClick={() => setActiveNote(note.id)}>
            <div className='sidebar-note-title'>
              <strong>{note.title}</strong>
              <button onClick={() => onDeleteNote(note.id)}>Delete</button>
            </div>

            <p>{note.body && note.body.substr(0, 100) + '...'}</p>
            <small className='note-meta'>
              Last Modified{"  "}
              {new Date(note.lastModified).toLocaleDateString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </small>

          </div>
        ))}
      </div>
    </div>
  )
}
