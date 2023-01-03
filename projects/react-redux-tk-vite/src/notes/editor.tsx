import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../root.reducer";
import { addNote, updateNote, removeNote } from "./notes.slice";
import { INoteData } from "./notes.model";
import './editor.scss'

interface RouteParams {
  noteId?: string
}

const NoteEditor = () => {
  const params: RouteParams = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const allNotes: INoteData[] = useSelector((state: RootState) => state.Notes)

  const [noteData, setNoteData] = useState({
    id: 'doc' + Math.floor(Math.random() * 1000000000),
    title: "New Note",
    content: ''
  } as INoteData)

  useEffect(() => {
    if (params.noteId) {
      let tmpNotes = allNotes.filter(note => note.id === params.noteId)
      if (tmpNotes.length > 0) {
        setNoteData(tmpNotes[0])
      }
    } else {
      dispatch(addNote(noteData)) // if nothing found, add the default note
    }
  }, []);

  const onTitleChange = (e: any) => {
    const newTitle = e.target.value as string

    if (newTitle.trim().length === 0) {
      // TODO -> title error - cannot be empty
    }

    const payload = {
      ...noteData,
      title: newTitle
    }

    setNoteData(payload)
    dispatch(updateNote(payload))
  }

  const onContentChange = (e: any) => {
    const newContent = e.target.value as string

    const payload = {
      ...noteData,
      content: newContent
    }

    setNoteData(payload)
    dispatch(updateNote(payload))
  }


  const onRemoveNote = () => {
    const ans = confirm("Are you sure you want to delete this note?")
    if (ans) {
      dispatch(removeNote(noteData))
      navigate('/')
    }
  }

  return (
    <div className="note-editor">
      <div className="editor-toolbar">
        <div className="menu">
          <div className="start-menu">
            <button onClick={() => navigate('/')}>&larr; All Notes</button>
          </div>
          <div className="end-menu">
            <button onClick={onRemoveNote} className="important">Delete</button>
          </div>

        </div>
      </div>
      <div className="note-title">
        <input
          type="text"
          value={noteData.title}
          onChange={onTitleChange}
          className="doc-title-input"
        />
      </div>
      <div className="note-content">
        <textarea
          value={noteData.content}
          onChange={onContentChange}
        ></textarea>
      </div>
    </div>
  )
}
export default NoteEditor