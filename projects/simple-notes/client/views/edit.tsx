import React from 'react'
import NoteEditor from "../components/editor"
import {useParams, useHistory} from 'react-router-dom'

import { RootState } from '../root-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { INoteData } from '../data/data-model';

import { addNote} from '../data/notes-slice'

import './edit.scss'

interface RouteParams {
    noteId?: string
}

const EditView: React.FC<{}> = () => {
    const browserHistory = useHistory()
    const params: RouteParams = useParams()
    const dispatch = useDispatch()

    let noteData: INoteData = {
        id: "note-" + (Math.random() * 1000000),
        title: "New Note",
        content: ""
    }

    if (params.noteId) {
        const allNotes: INoteData[] = useSelector((state: RootState) => state.Notes)
        let tmpNotes = allNotes.filter(note => note.id === params.noteId)
        
        if (tmpNotes.length > 0) {
            noteData = tmpNotes[0]
        }
    }

    const onSeeAllNotes = () => {
        browserHistory.push("/")
    }

    const onChange = (payload: INoteData) => {
        dispatch(addNote(payload))
    }

    return (
        <div className="edit-view">
            <div className="header">
                <button className="action-button" onClick={onSeeAllNotes}>See All Notes</button>
            </div>
            <NoteEditor noteData={noteData} onChange={onChange}/>
        </div>
    )
}
export default EditView