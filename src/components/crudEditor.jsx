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

    const { addNewLibrary, updateLibrary } = useContext(DataContext);
    const { books, setBooks, getFinalBooks, initFinalBooks, addBook } = useContext(BookEditorContext);

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
            initFinalBooks(isEditing.books);
        } else {
            setName("");
            setBooks([{title:'',quantity:0}]);
            setRating(0);
            setIsOpen(false);
            setLongitude(0);
            setLatitude(0);
            initFinalBooks([{title:'',quantity:0}]);
        }
    }, [isEditing]);

    function hideModal() {
        dialogRef.current.close();
    }

    function submitLibrary() {
        if (name, longitude, latitude) {

            const dataToSend = {
                name: name,
                books: getFinalBooks(),
                rating: rating,
                open: isOpen,
                longitude: longitude,
                latitude: latitude
            }

            if (isEditing) {
                updateLibrary(isEditing._id, dataToSend);
            } else {
                addNewLibrary(dataToSend);
            }

            dialogRef.current.close();

        }
    }

    return(<>

    <dialog ref={dialogRef} id="crudDialog">
    
    <div id="crudDialogContent">

        <div id="crudDialogTitle">
            {isEditing ? "Editing Book Store" : "Adding a new Book Store"}
        </div>

        <div className="crudEditor">

            <div className="crudEditorSection">
                <label>Book store name</label>
                <input type="text" value={name} placeholder="Book Store name" onChange={e => setName(e.target.value)} className="crudEditorInputText"/>
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
                <button onClick={() => {addBook()}}>Add book</button>
            </div>

            <div className="crudEditorRateOpen">
                <div className="crudEditorSection">
                    <label>Store rating</label>
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
        {isEditing ? "Submit store changes" : "Submit new store"}
    </button>
    <button onClick={() => {hideModal()}}>Cancel</button>

    </div>

    </dialog>

    </>)

}