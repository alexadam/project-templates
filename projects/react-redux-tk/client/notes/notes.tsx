import React from "react"
import { useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { RootState } from "../root-reducer"
import { INoteData } from "./model"
import './notes.scss'

interface INotesProps {
}

const Notes = (props: INotesProps) => {
  const browseHistory = useHistory()
  const allNotes: INoteData[] = useSelector((state: RootState) => state.Notes)

  const onNewNote = () => {
    browseHistory.push("/new")
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