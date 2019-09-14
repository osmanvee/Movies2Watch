//Movie class: Represents a Movie
class Movie {
    constructor (title, date, genre) {
        this.title = title;
        this.date = date;
        this.genre = genre;
    }
}

//UI Class: Handles UI Tasks
class UI {
    static displayMovies() {
        

        const movies = Store.getMovies();
        movies.forEach((movie) => UI.addMovieToList(movie));        
    }

    static addMovieToList(movie) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.date}</td>
        <td>${movie.genre}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">DELETE</a></td>
        `;
    
     list.appendChild(row);   
    
    }
//Deletes the row once DELETE is pressed
    static deleteMovie(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }

        UI.showAlert('Movie Deleted',)
    }

   //Alert message
   static showAlert(message, className) {
       const div = document.createElement('div');
       div.className = `alert alert-${className}`;
       div.appendChild(document.createTextNode(message));
       const container = document.querySelector('.container');
       const form = document.querySelector('#book-form');
       container.insertBefore(div, form);
   }


    //This method will clear out the fields once we press the 'Add Movie'
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#date').value = '';
        document.querySelector('#genre').value = '';
    }
}

//Store Class: Handles Storage
class Store {
    static getMovies() {
        let movies;
        if(localStorage.getItem('movies') === null) {
            movies = [];
        } else {
            movies = JSON.parse(localStorage.getItem('movies'));
        }

        return movies; 
    }

    static addMovie(movie) {
    const movies = Store.getMovies();
    movies.push(movie);

    localStorage.setItem('movies', JSON.stringify(movies));
    }

    static removeMovie(title) {
        const movies = Store.getMovies();

        movies.forEach((movie, index) => {
            if(movie.title === title) {
                    movies.splice(index, 1);
            }
        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

//Event: Display Movies
document.addEventListener('DOMContentLoaded', UI.displayMovies);
//Event: Add a Movie

document.querySelector('#book-form').addEventListener('submit', (e)=> {
    //Prevent actual submit
    e.preventDefault();
    //Get Form Values
    const title = document.querySelector('#title').value;
    const date = document.querySelector('#date').value;
    const genre = document.querySelector('#genre').value;

    //Validationg
    if(title === '' || date=== '' || genre==='') {
UI.showAlert('Please fill in all fields', 'danger');
    } else {

        //Instantiate a Movie
    const movie = new Movie(title, date, genre);
    //Test if Movie object is created
    //console.log(movie);

    //Add Movie to UI
    UI.addMovieToList(movie);

    //Add Movie to Storage
    Store.addMovie(movie);
    //Alert
    UI.showAlert('Movie Added', 'success'); 

    //Clear Fields after adding
    UI.clearFields();
    }
});


//Event: Remove a Movie
document.querySelector("#book-list").addEventListener('click', (e) => {
//Remove movie from UI
    UI.deleteMovie(e.target);


//Remove movie from Storage
Store.removeMovie(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

UI.showAlert('Movie Deleted','danger');
});





