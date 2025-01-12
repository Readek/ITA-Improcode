import { createContext, useState } from "react";
import { deleteLibrary, editLibrary, getEvents, getLibraries, newLibrary } from "../data/Library Fetch.mjs";
import { placeholderEventData, placeholderLibraryData } from "../data/Placeholder Data.mjs";

const DataContext = createContext();

function DataProvider({ children }) {
    
    const [ libraryData, setLibraryData ] = useState([]);
    const [ eventData, setEventData ] = useState([]);
    const [ areWeConnected, setAreWeConnected ] = useState(true);

    async function askForLibraries() {
        getLibraries().then((data) => {
            setLibraryData(data);
            setAreWeConnected(true);
        }).catch((e) => {
            console.log(e);
            console.log("Couldn't reach backend server. Using placeholder data.");
            setLibraryData(placeholderLibraryData);
            setAreWeConnected(false);
        })
    }

    async function addNewLibrary(data) {
        console.log(data);
        
        newLibrary(data).then((res) => {
            askForLibraries();
        });
    }

    async function updateLibrary(id, data) {
        editLibrary(id, data).then((res) => {
            askForLibraries();
        });
    }

    async function removeLibrary(id) {
        deleteLibrary(id).then((res) => {
            askForLibraries();
        });
    }

    async function askForEvents() {
        getEvents().then((data) => {
            console.log(data);
            
            setEventData(data);
            setAreWeConnected(true);
        }).catch((e) => {
            console.log(e);
            console.log("Couldn't reach backend server. Using placeholder data.");
            setEventData(placeholderEventData);
            setAreWeConnected(false);
        })
    }


    return (
        <DataContext.Provider value={{
            libraryData: libraryData,
            askForLibraries: askForLibraries, addNewLibrary: addNewLibrary,
            removeLibrary: removeLibrary, updateLibrary: updateLibrary,
            eventData: eventData, askForEvents: askForEvents,
            areWeConnected: areWeConnected
        }}>
            {children}
        </DataContext.Provider>
    )

}

export { DataContext, DataProvider };