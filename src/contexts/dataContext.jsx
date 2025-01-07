import { createContext, useState } from "react";
import { deleteLibrary, getLibraries, newLibrary } from "../data/Library Fetch.mjs";
import { placeholderLibraryData } from "../data/Placeholder Data.mjs";

const DataContext = createContext();

function DataProvider({ children }) {
    
    const [ libraryData, setLibraryData ] = useState([]);

    async function askForLibraries() {
        getLibraries().then((data) => {
            setLibraryData(data);
        }).catch((e) => {
            console.log(e);
            console.log("Couldn't reach backend server. Using placeholder data.");
            setLibraryData(placeholderLibraryData);
        })
    }

    async function addNewLibrary(data) {
        newLibrary(data).then((res) => {
            askForLibraries();
        });
    }

    async function removeLibrary(id) {
        deleteLibrary(id).then((res) => {
            askForLibraries();
        });
    }


    return (
        <DataContext.Provider value={{
            libraryData: libraryData,
            askForLibraries: askForLibraries, addNewLibrary: addNewLibrary,
            removeLibrary: removeLibrary
        }}>
            {children}
        </DataContext.Provider>
    )

}

export { DataContext, DataProvider };