import React,{useContext} from 'react'
import notecontext from '../contexts/notes/notecontext';

const Noteitem = (props) => {
  const context= useContext(notecontext);
  const {deleteNote}=context;
   const {note,updatenote}=props;
  return (
    <div className='col-md-3'>
  <div className="card">
    <div className="card-body">
      <div className="d-flex align-items-center">
      <h5 className="card-title"> {note.title}</h5>
      <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showalert("Deleted Successfully","success");}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updatenote(note)}></i>
    </div>
    
    <p className="card-subtitle mb-2 text-body-secondary"> {note.description}</p>
   
  </div>
</div>
</div>
  )
}

export default Noteitem
