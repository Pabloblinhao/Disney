
const content = document.getElementById("content");
const contentModal = document.getElementById("modal-content");
let modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];


span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const fetchDisneyOne = async (id) => {
    const apiresponse = await fetch(`https://api.disneyapi.dev/characters/` + id);

    if (apiresponse.status === 200) {
        const data = await apiresponse.json();
        let itemList = [];
        let film = [];
        let shortFilm = [];
        let tvShows = [];

        data.films.length > 0 ? data.films.forEach((f) => {
            film.push(`<label> ${f} </label>`)
        }) : film = [];

        data.shortFilms.length > 0 ? data.shortFilms.forEach((f) => {
            shortFilm.push(`<label> ${f} </label>`)
        }) : shortFilm = [];

        data.tvShows.length > 0 ? data.tvShows.forEach((f) => {
            tvShows.push(`<label> ${f} </label>`)
        }) : tvShows = [];

        
        itemList.push(
            `
            <div class="modal-item">
                <img class="item-img" src=${data.imageUrl}/> 
                <label class="item-title"> ${data.name} </label>
                <div class="filmologia">
                    <div>
                        <label class="item-title"> Lista de Filmes </label>
                        ${ film }
                    </div>

                    <div>
                        <label class="item-title"> Lista de Curtas </label>
                        ${ shortFilm }
                    </div>

                    <div>
                        <label class="item-title"> Lista de Shows </label>
                        ${ tvShows }
                    </div>
                </div>
            </div>
            `
        )


        contentModal.innerHTML = itemList;
        modal.style.display = "block";
    }
}

const fetchDisney = async () => {
    const apiresponse = await fetch(`https://api.disneyapi.dev/characters`);
    
    if (apiresponse.status === 200) {
        const data = await apiresponse.json();
        let itemList = [];

        data.data.forEach((d) => {
            let film = [];
            let shortFilm = [];
            let tvShows = [];

            d.films.length > 0 ? d.films.forEach((f) => {
                film.push(`<label> ${f} </label>`)
            }) : film = [];

            d.shortFilms.length > 0 ? d.shortFilms.forEach((f) => {
                shortFilm.push(`<label> ${f} </label>`)
            }) : shortFilm = [];

            d.tvShows.length > 0 ? d.tvShows.forEach((f) => {
                tvShows.push(`<label> ${f} </label>`)
            }) : tvShows = [];

            
            itemList.push(
                `<div onclick="fetchDisneyOne(${d._id})">
                    <img src=${d.imageUrl}/> 
                    <label> ${d.name} </label>
                    <div>
                        <label> Lista de Filmes </label>
                        ${ d.films.length }
                    </div>

                    <div>
                        <label> Lista de Curtas </label>
                        ${ d.shortFilms.length }
                    </div>

                    <div>
                        <label> Lista de Shows </label>
                        ${ d.tvShows.length }
                    </div>
                </div>`
            )
        })


        content.innerHTML = itemList;
    }
}

fetchDisney();