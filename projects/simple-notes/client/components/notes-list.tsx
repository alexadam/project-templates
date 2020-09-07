import React from 'react'
import { useHistory } from 'react-router-dom'
import {INoteData} from '../data/data-model'

import './notes-list.scss'

interface NotesListProps {
    notes: INoteData[]
}

const NotesList: React.FC<NotesListProps> = (props: NotesListProps) => {
    const browserHistory = useHistory()

    const onEditNote = (id: string) => {
        browserHistory.push("/edit/" + id)
    }

    let notesElems = props.notes.map(
        (note) => <button className="action-link" onClick={() => onEditNote(note.id)} key={note.id}>{note.title}</button>
    )

    return (
        <div className="notes-list">
            {notesElems}
        </div>
    )
}
export default NotesList