import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function Main({ activeNote, onUpdateNote }) {

  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now()
    })
  }
  if (!activeNote)
    return <div className='no-active-note'>No Note Selected</div>
  return (

    <div className='app-main' >
      <div className='app-main-note-edit'>
        <input type='text' id="title" value={activeNote.title} placeholder="Enter Title.."
          onChange={(e) => onEditField("title", e.target.value)} autoFocus />
        <textarea id="body" placeholder='Write your note here...'
          onChange={(e) => onEditField("body", e.target.value)} value={activeNote.body} />
      </div>

    </div >

  )
}
