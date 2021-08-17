import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3003/'

export default function Index() {

    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(baseURL + 'bookmark')
            setBookmarks(res.data)
        }
        fetchData()
    })

    // const deleteBookmark = async (ev) => {
    //     // ev.preventDefault()
    //     try {
    //         await axios.delete(baseURL + 'bookmark/')
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }
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

    return (
        <div>
            {bookmarks.map((bookmark) => (
                <div key={bookmark._id}>
                    <h3>{bookmark.title}</h3>
                    <h3><a href={'http://' + bookmark.url} target='_blank'>{bookmark.url}</a></h3>
                    {/* <button onClick={deleteBookmark}>DELETE</button> */}
                    <button onClick={() => deleteBookmark(bookmark._id)}>DELETE</button>
                </div>
            ))}
        </div>
    )
}
