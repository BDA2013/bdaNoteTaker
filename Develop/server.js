const express = require('express');
const path = require('path');
const PORT = 3001;
const notesdb = require('./db/db.json');
const id = require('uuid').v4;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(notesdb));

app.post('/api/notes', (req, res) => {
  const newNoteTitle = req.body.title;
  const newNoteText = req.body.text;

  const newNote = { 
    title: newNoteTitle, 
    text: newNoteText
  };

  //assign new note an id
  newNote.id = id();
  notesdb.push(newNote);
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notesdb.find(note => note.id === id);
  const index = notesdb.indexOf(note);
  notesdb.splice(index, 1);
  res.json(notesdb);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
