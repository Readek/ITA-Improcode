import { useState } from "react";
import "../assets/crudEditorBook.css";

export default function CrudEditorBook({id, initData}) {

    const [ title, setTitle ] = useState(initData.title);
    const [ quantity, setQuantity ] = useState(initData.quantity);
    
    return(<>
    
    <div className="crudEditorBook">
        <input
            type="text"
            placeholder="Book Title"
            onChange={e => setTitle(e.target.value)}
            className="crudEditorInputText"
            value={title}
        />
        <input
            type="number"
            min={0}
            onChange={e => setQuantity(e.target.value)}
            className="crudEditorBookNum"
            value={quantity}
        />
        <button>-</button>
    </div>
    
    
    </>)

}