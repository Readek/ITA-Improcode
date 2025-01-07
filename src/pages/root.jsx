import { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar";
import LibraryCRUD from "../components/libraryCRUD";
import "../assets/root.css";
import { DataContext } from "../contexts/dataContext";
import BooksPopover from "../components/booksPopover";
import CrudEditor from "../components/crudEditor";
import { BookEditorProvider } from "../contexts/bookEditorContext";

export default function Root() {

    const { libraryData, askForLibraries } = useContext(DataContext);
    const [ booksInPopover, setBooksInPopover ] = useState([]);
    const [ isAdding, setIsAdding ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);

    useEffect( () => {
        if (!libraryData.length) askForLibraries();
    }, []);

    // using native modals in react absolutely sucks
    useEffect( () => {
        setIsEditing(false);
        if (isAdding) setTimeout(() => {setIsAdding(false);}, 50);
    }, [isAdding]);

    return (<>
    
    <NavBar></NavBar>

    <div className="crudDiv">

        <div className="crudTitle">Libraries</div>

        <table className="crudContent">
            <thead>
                <tr className="crudEntryDiv">
                    <th className="crudEntry">Name</th>
                    <th className="crudEntry">Books</th>
                    <th className="crudEntry">Rating</th>
                    <th className="crudEntry">Availability</th>
                    <th className="crudEntry">Longitude</th>
                    <th className="crudEntry">Latitude</th>
                </tr>
            </thead>
            <tbody>
                {libraryData.map(library => (
                    <LibraryCRUD
                        data={library}
                        setBooksInPopover={setBooksInPopover}
                        setIsEditing={setIsEditing}
                        key={library._id}
                    ></LibraryCRUD>
                ))}
            </tbody>
        </table>

        <button onClick={() => {setIsAdding(true)}}>
            Add New Library
        </button>

        <BookEditorProvider>
            <CrudEditor isAdding={isAdding} isEditing={isEditing}></CrudEditor>
        </BookEditorProvider>

        <BooksPopover books={booksInPopover}></BooksPopover>

    </div>
    
    </>)

}