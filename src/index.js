var getMovieDetails = async (movieName) => {
    apiKey = "39167fdd";
    var content = "";
    content = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`)
        .then (response => response.json())
        .then( data => {
            // console.log(data);
            content = `
            <strong>Title : </strong>${data.Title}<br>
            <strong>Year : </strong>${data.Year}<br>
            <strong>Released : </strong>${data.Released}<br>
            <strong>Genre : </strong>${data.Genre}<br>
            <strong>Director : </strong>${data.Director}<br>
            <strong>Actors : </strong>${data.Actors}<br>
            <strong>Plot : </strong>${data.Plot}<br>
            <strong>IMDB Rating : </strong>${data.imdbRating}<br>
            `;
            // console.log(content);
            return content;
        });
    return content;
};

var deleteMovie = function () {
    console.log(this.className);
    let todoLi = this.parentNode;
    todoLi.remove();
};

var showDetail = function () {
    // console.log(this.className);
    if(this.className === 'collapsible') {
        this.className = 'active';
        var content = this.nextElementSibling.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + "px";
    } 
    else {
        this.className = 'collapsible';
        var content = this.nextElementSibling.nextElementSibling;
        content.style.maxHeight = null;
    }
};

var createMovie = async function (movieName) {
    let li = document.createElement('li');

    let movieInfo = document.createElement('button');
    movieInfo.innerHTML = movieName;
    movieInfo.className = "collapsible";

    var content = await getMovieDetails(movieName).then(res => res);
    let movieDetail = document.createElement('div');
    movieDetail.className = "movieDetails";
    // console.log(content);
    movieDetail.innerHTML = content;

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = deleteMovie;


    //nest todo elements in list item
    movieInfo.onclick = showDetail;
    li.appendChild(movieInfo);
    li.appendChild(deleteButton);
    li.appendChild(movieDetail);
    return li;
};


document.getElementById('add').onclick = async function () {
    // store the button's parent element (.addTodo <div>) in a variable
    // store the input, which is the *first* child element of the .addTodo <div>
    var addTextInput = this.parentNode.children[0];
    if (addTextInput.value === "") {
        return;
    } else {
        //add todo
        var list = document.getElementById('movieList');
        var movie = await createMovie(addTextInput.value);
        list.appendChild(movie);
        //reset input 
        addTextInput.value = "";
    }
}

// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     } 
//   });
// }