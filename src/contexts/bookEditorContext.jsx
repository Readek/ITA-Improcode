import { createContext, useState } from "react";

const BookEditorContext = createContext();

let finalBooks;

function BookEditorProvider({children}) {

    const [ books, setBooks ] = useState([{title:'',quantity:0}]);

    function updateBook(id, title, quantity) {
        const newBooks = [...books];
        newBooks[id].title = title;
        newBooks[id].quantity = quantity;
        finalBooks = newBooks;        
    }

    function initFinalBooks(data) {
        finalBooks = [...data];
    }
    function getFinalBooks() {
        return finalBooks;
    }

    function removeBook(id) {
        const newBooks = [...finalBooks];
        newBooks.splice(id, 1);
        finalBooks = newBooks;
        setBooks(newBooks);
    }

    function addBook() {
        const newBooks = [...finalBooks];
        newBooks.push({title:'', quantity:0});
        finalBooks = newBooks;
        setBooks(newBooks);
    }

    return (
        <BookEditorContext.Provider value={{
            books: books, setBooks: setBooks,
            updateBook: updateBook, getFinalBooks: getFinalBooks,
            initFinalBooks: initFinalBooks, removeBook: removeBook,
            addBook: addBook
        }}>
            {children}
        </BookEditorContext.Provider>
    )

}

export { BookEditorContext, BookEditorProvider };