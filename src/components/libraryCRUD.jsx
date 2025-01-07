import { useContext } from "react";
import "../assets/libraryCRUD.css";
import { DataContext } from "../contexts/dataContext";

export default function LibraryCRUD({data, setBooksInPopover, setIsEditing}) {

    const { removeLibrary } = useContext(DataContext);

    return(<>
    <tr className="crudEntryDiv">
        <td className="crudEntry">{data.name}</td>
        <td className="crudEntry">
            <button popovertarget="booksPopover" onClick={() => {
                setBooksInPopover(data.books)
            }}>
                View Books
            </button>
        </td>
        <td className="crudEntry">{data.rating}/5</td>
        <td className="crudEntry">{data.open ? "Open" : "Closed"}</td>
        <td className="crudEntry">{data.longitude}</td>
        <td className="crudEntry">{data.latitude}</td>
        <td className="crudEntry">
            <button onClick={() => {setIsEditing(data)}}>Edit</button>
            <button onClick={() => {removeLibrary(data._id)}}>Delete</button>
        </td>
        
    </tr>
    </>)

}