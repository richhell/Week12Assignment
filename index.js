// Week 12 Assignment:
// Create a CRD application (CRUD without update) using json-server or another API
// Use fetch and async/await to interact with the API
// Use a form to create/post new entities
// Build a way for users to delete entities
// Include a way to get entities from the API and display them
// You do NOT need update, but you can add it if you'd like
// Use Bootstrap and/or CSS to style your project

//Books 
const booksContainer = document.getElementById("books-container")

async function onGetBooksClick() {
    const response = await fetch("http://localhost:3000/books")
    const bookList = await response.json()

    booksContainer.innerHTML = bookList.map(
        book => `<div class="bg-light rounded mt-5">
            <h3>${book.title} by ${book.author}</h3>
            <p>${book.genreId}</p>
        </div>`
    ).join("")
}

let lastCreatedItem = null; 

async function onAddBookClick() {
   
    const testBook = { title: "Test", author: "no one", genreId: 1 }
    const response = await fetch("http://localhost:3000/books", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(testBook) 
    })
    
    const newlyCreatedItem = await response.json()
    lastCreatedItem = newlyCreatedItem
}

async function onUpdateBookClick() {
    // Error check
    if(lastCreatedItem === null) {
        console.log("No item created yet to update.")
        return
    }
    
    fetch("http://localhost:3000/books/" + lastCreatedItem.id, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Test Updated", author: "no one", genreId: 2 })
    })
}

async function onDeleteBookClick() {
    
    if(lastCreatedItem === null) {
        console.log("No item created yet to delete")
        return
    }
    
    fetch("http://localhost:3000/books/" + lastCreatedItem.id, {
        method: "DELETE", 
    })
}

//List the Genres

const genresContainer = document.getElementById("genres-container")

async function onFetchGenresClick() {
    const response = await fetch("http://localhost:3000/genres")
    const genreList = await response.json()

    genresContainer.innerHTML = genreList.map(
        genre => `<div class="bg-light rounded mt-5">
            <h3>${genre.name}</h3>
            <p>id: ${genre.id}</p>
        </div>`
    ).join("")
}

