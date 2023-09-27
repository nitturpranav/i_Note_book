import React, { useContext, useState } from 'react';
import notecontext from '../contexts/notes/notecontext';

const Addnote = (props) => {
  const context = useContext(notecontext);
  const { addnote } = context;
  const [note, setnote] = useState({ title: '', description: '', tag: 'default' });

  const handleonclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setnote({title: '', description: '', tag: ''})
    props.showalert(" Added successfully","success") 
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className='container'>
        <h3>Add Notes</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp"  value={note.title} onChange={onchange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' onChange={onchange} value={note.description} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} minLength={5} value={note.tag} required/>
          </div>
          <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleonclick}>Add Note</button>
        </form>
      </div>
    </div>
  );
}

export default Addnote;
