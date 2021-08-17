import './App.css';
import {useState, useEffect} from 'react';
import NewBookmarkForm from './components/NewBookmarkForm';
import Index from './components/Index';

function App() {

const [bookmarks, setBookmarks] = useState([])

  return (
    <div>
      <h1>Welcome to the react app</h1>
      <NewBookmarkForm/>
      <Index/>
    </div>
  );
}

export default App;