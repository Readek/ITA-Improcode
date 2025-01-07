import { createContext, useState } from "react";

const BookEditorContext = createContext();

function BookEditorProvider({children}) {

    const [ books, setBooks ] = useState([{title:'',quantity:0}]);

    function updateBook(id, title, quantity) {
        const newBooks = [...books];
        newBooks[id].title = title;
        newBooks[id].quantity = quantity;
        setBooks(newBooks);
    }

    return (
        <BookEditorContext.Provider value={{
            books: books, setBooks: setBooks,

        }}>
            {children}
        </BookEditorContext.Provider>
    )
    
}

export { BookEditorContext, BookEditorProvider };