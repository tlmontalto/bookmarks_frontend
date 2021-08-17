import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3003/'

let showForm = false

export default function Index() {

    const [bookmarks, setBookmarks] = useState([])
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(baseURL + 'bookmark')
            setBookmarks(res.data)
        }
        fetchData()
    })

    function deleteBookmark(id) {
        // console.log(id)
        const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id)
        setBookmarks(newBookmarks)
        try {
            axios.delete(`${baseURL}bookmark/${id}`)
        }
        catch (error) {
            console.log(error)
        }
    }

    const toggleForm = () => {
        showForm = !showForm
        console.log(showForm)
    }

    function updateBookmark(id) {
        id.preventDefault()
        const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id)
        setBookmarks(newBookmarks)
        try {
            axios.patch(`${baseURL}bookmark/${id}`)
        }
        catch (error) {
            console.log(error)
        }
    }



    return (
        <div>
            {bookmarks.map((bookmark) => (
                <div key={bookmark._id}>
                    <h3>{bookmark.title}</h3>
                    <h3><a href={'http://' + bookmark.url} target='_blank'>{bookmark.url}</a></h3>
                    <button onClick={() => deleteBookmark(bookmark._id)}>DELETE</button>
                    <button onClick={toggleForm}>EDIT</button>

                <form onSubmit={updateBookmark}>
                    <label htmlFor="title" >Title: </label>
                    <input onChange={(ev) => setTitle(ev.target.value)} type="text" id="title" name="title" defaultValue={bookmark.title} required/>

                    <label htmlFor="url">URL: </label>
                    <input onChange={(ev) => setUrl(ev.target.value)} type="text" id="url" name="url" defaultValue={bookmark.url} required/>

                    <button type="submit">Update</button>
                </form>

                </div>
            ))}
        </div>
    )
}
