import React from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../root.reducer"
import { INoteData } from "./notes.model"
import './notes.scss'

interface INotesProps {
}

const Notes = (props: INotesProps) => {
  const navigate = useNavigate()
  const allNotes: INoteData[] = useSelector((state: RootState) => state.Notes)

  const onNewNote = () => {
    navigate("/new")
  }

  return (
    <div className="all-notes">
      <div className="container">
        <div className="menu">
          <button onClick={onNewNote}>+ New Note</button>
        </div>
      </div>

      <div className="note-list">
        {allNotes.map((note) => <Link key={note.id} to={"/note/" + note.id} className="note-link">{note.title}</Link>)}
      </div>
    </div>
  )
}
export default Notes