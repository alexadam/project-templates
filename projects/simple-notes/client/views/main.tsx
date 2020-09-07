import React from 'react'
import NotesList from "../components/notes-list"
import { useHistory } from 'react-router-dom'

import { RootState } from '../root-reducer';
import { useSelector } from 'react-redux';
import { INoteData } from '../data/data-model';

import './main.scss'

const MainView: React.FC<{}> = () => {
    const browseHistory = useHistory()
    const allNotes: INoteData[] = useSelector((state: RootState) => state.Notes)

    const onNewNote = () => {
        browseHistory.push("/new")
    }

    return (
        <div className="notes-view">
            <div className="header">
                <h1>All Notes</h1>
                <button className="action-button" onClick={onNewNote}>New Note</button>
            </div>
            <NotesList notes={allNotes}/>
        </div>
    )
}
export default MainView