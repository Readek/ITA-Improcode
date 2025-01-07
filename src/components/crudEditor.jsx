import { useContext, useEffect, useRef, useState } from "react";
import "../assets/crudEditor.css";
import { DataContext } from "../contexts/dataContext";
import CrudEditorBook from "./crudEditorBook";
import { BookEditorContext } from "../contexts/bookEditorContext";

export default function CrudEditor({isAdding, isEditing}) {

    const [ name, setName ] = useState('');
    const [ rating, setRating ] = useState(0);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ longitude, setLongitude ] = useState(0);
    const [ latitude, setLatitude ] = useState(0);

    const dialogRef = useRef();

    const { addNewLibrary } = useContext(DataContext);
    const { books, setBooks } = useContext(BookEditorContext);

    useEffect( () => {
        if (isAdding) dialogRef.current.showModal();
    }, [isAdding]);

    useEffect( () => {
        if (isEditing) {
            dialogRef.current.showModal();
            setName(isEditing.name);
            setBooks(isEditing.books);
            setRating(isEditing.rating);
            setIsOpen(isEditing.open);
            setLongitude(isEditing.longitude);
            setLatitude(isEditing.latitude);
        }
    }, [isEditing]);

    function hideModal() {
        dialogRef.current.close();
    }

    function submitLibrary() {
        if (name, books, longitude, latitude) {

            addNewLibrary({
                name: name,
                books: sdf,
                rating: rating,
                open: isOpen,
                longitude: longitude,
                latitude: latitude
            });

            dialogRef.current.close();

        }
    }

    return(<>

    <dialog ref={dialogRef} id="crudDialog">
    
    <div id="crudDialogContent">

        <div id="crudDialogTitle">
            {isEditing ? "Editing library" : "Adding a new library"}
        </div>

        <div className="crudEditor">

            <div className="crudEditorSection">
                <label>Library name</label>
                <input type="text" value={name} placeholder="Library name" onChange={e => setName(e.target.value)} className="crudEditorInputText"/>
            </div>

            <div className="crudEditorSection">
                <label>Books</label>
                <div className="crudEditorBooks">
                    {books.map((book, i) => (
                        <CrudEditorBook
                            id={i}
                            initData={book}
                            key={book.title+i}
                        ></CrudEditorBook>
                    ))}
                </div>
                <button>Add book</button>
            </div>

            <div className="crudEditorRateOpen">
                <div className="crudEditorSection">
                    <label>Library rating</label>
                    <input type="number" value={rating} placeholder="0" max={5} onChange={e => setRating(e.target.value)} className="crudEditorInputNum"/>
                </div>
                <div className="crudEditorSection">
                    <label>Is open</label>
                    <input type="checkbox" checked={isOpen} onChange={e => setIsOpen(e.target.checked)} className="crudEditorInputCheck"/>
                </div>
                
            </div>

            <div className="crudEditorSection">
                <label>Longitude</label>
                <input type="number" value={longitude} placeholder="123456789" onChange={e => setLongitude(e.target.value)} className="crudEditorInputNum"/>
            </div>

            <div className="crudEditorSection">
                <label>Latitude</label>
                <input type="number" value={latitude} placeholder="123456789" onChange={e => setLatitude(e.target.value)} className="crudEditorInputNum"/>
            </div>

        </div>

    <button onClick={() => {submitLibrary()}}>
        {isEditing ? "Submit library changes" : "Submit new library"}
    </button>
    <button onClick={() => {hideModal()}}>Cancel</button>

    </div>

    </dialog>

    </>)

}