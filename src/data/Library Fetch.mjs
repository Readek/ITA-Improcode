import { backendUrl } from "./Backend Info.mjs";

/** Ask for the full list of libraries */
export async function getLibraries() {
    const data = await fetch(`${backendUrl}/libraries`);
    if (!data.ok) return null;
    return data.json();
}

/**
 * Adds a new library to the database
 * @param {Object} data 
 */
export async function newLibrary(data) {
    const response = await fetch(`${backendUrl}/libraries`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response;
}

export async function editLibrary(id, data) {    
    const response = await fetch(`${backendUrl}/libraries/${id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response;
}

export async function deleteLibrary(id) {
    const response = await fetch(`${backendUrl}/libraries/${id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({_id: id})
    });
    return response;
}