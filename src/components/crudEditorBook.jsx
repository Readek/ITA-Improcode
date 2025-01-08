import { useContext, useEffect, useState } from "react";
import "../assets/crudEditorBook.css";
import { BookEditorContext } from "../contexts/bookEditorContext";

export default function CrudEditorBook({id, initData}) {

    const [ title, setTitle ] = useState(initData.title);
    const [ quantity, setQuantity ] = useState(initData.quantity);

    const { updateBook, removeBook } = useContext(BookEditorContext);

    function onBookChange() {        
        updateBook(id, title, quantity);
    }

    useEffect( () => {
        updateBook(id, title, quantity);
    }, [title, quantity]);

    return(<>

    <div className="crudEditorBook">
        <input
            type="text"
            placeholder="Book Title"
            onChange={e => {
                setTitle(e.target.value)
            }}
            className="crudEditorInputText"
            value={title}
        />
        <input
            type="number"
            min={0}
            onChange={e => {
                setQuantity(e.target.value);
            }}
            className="crudEditorBookNum"
            value={quantity}
        />
        <button onClick={() => {removeBook(id)}}>-</button>
    </div>

    </>)

}