import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export const Noteitems = (props) => {
    const context = useContext(noteContext)
    const { note } = props;
    const { updatedNote } = props;
    const { deleteNote } = context;
    
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa fa-fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)
                     props.showAlert("Note Deleted", "success")}}></i>
                   
                    <i className="fas fa-edit" onClick={()=> {updatedNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitems
