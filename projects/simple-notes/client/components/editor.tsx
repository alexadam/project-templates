import React, { useState, ChangeEvent, useEffect } from 'react'
import { INoteData } from '../data/data-model'

import './editor.scss'

interface NoteEditorProps {
    noteData: INoteData,
    onChange: (payload: INoteData) => void
}

const NoteEditor: React.FC<NoteEditorProps> = (props: NoteEditorProps) => {
    const [title, setTitle] = useState(props.noteData.title)
    const [content, setContent] = useState(props.noteData.content)

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.target.value
        if (newTitle.length > 0) {
            setTitle(newTitle)
        }
    }

    const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newContent = e.target.value
        setContent(newContent)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const payload: INoteData = {
                id: props.noteData.id,
                title: title,
                content: content
            } 

            props.onChange(payload)
          }, 500)

          return () => {
            clearTimeout(timer);
          }
    }, [title, content])

    return (
        <div className="note-editor">
            <div className="title">
                <input type="text" value={title} onChange={onTitleChange}/>
            </div>
            <div className="content">
                <textarea value={content} onChange={onContentChange} rows={30}></textarea>
            </div>
        </div>
    )
}
export default NoteEditor