import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const baseURL = 'http://localhost:3003/'

export default function NewBookmarkForm() {

    const history = useHistory()

    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const addBookmark = async (ev) => {
        ev.preventDefault()
        try {
            await axios.post(baseURL + 'bookmark', {
                title: title,
                url: url
            })
            // history.push('/')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>New Bookmark:</h1>
            <form onSubmit={addBookmark}>

                <label htmlFor="title" >Title: </label>
                <input onChange={(ev) => setTitle(ev.target.value) } type="text" id="title" name="title" value={title} required/>

                <label htmlFor="url" >URL: </label>
                <input onChange={(ev) => setUrl(ev.target.value)} type="text" id="url" name="url" value={url} required/>

                <button type="submit">Add Bookmark</button>

            </form>
        </div>
    )
}
