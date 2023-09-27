
import React,{useContext, useEffect,useRef,useState} from "react";
import Noteitem from './Noteitem';
import notecontext from '../contexts/notes/notecontext';
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const {showalert}=props
  const context= useContext(notecontext);
  const {notes,getnotes,editNote}=context;
  let navigate=useNavigate();
  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking the token)
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      navigate("/login"); // Redirect to the login page if not authenticated
    } else {
      getnotes();
    }
    // eslint-disable-next-line
  }, [navigate]);

const ref= useRef(null)
const refClose= useRef(null)


  const [note, setnote] = useState({id:"", etitle: '', edescription: '', etag: 'default' });
 const updatenote=(currentNote)=>
 {
  ref.current.click();

  setnote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
 }

const handleonclick = (e) => {
  console.log("updating the note....")
  editNote(note.id,note.etitle,note.edescription,note.etag)
  refClose.current.click();
  props.showalert(" Updated successfully","success") 
};

const onchange = (e) => {
  setnote({ ...note, [e.target.name]: e.target.value });
};
  return (
    <>
    <Addnote showalert={showalert}/>
<button type="button" ref={ref} className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} minLength={5} required/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  disabled={note.etitle.length<5||note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleonclick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'>
         <h3>Your notes</h3>
         <div className="container">
         {notes.length===0 && 'No notes to display'}
         </div>
    {notes.map((note)=>{
      return <Noteitem key={note._id} updatenote={updatenote} showalert={showalert} note ={note}/>
    })}
    </div>
    </>    
  )
}

export default Notes
