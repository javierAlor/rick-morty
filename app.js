document.addEventListener("DOMContentLoaded", () =>{
   const header = document.querySelector(".header");

    const fetchData = async(link) => {
        const flex = document.querySelector(".list-items"); // seleccionamos el 
        flex.innerHTML = "";
        try{
            const res = await fetch(link) // nos devuelve los datos de una forma cruda
            var data = await res.json() // tenemos que convertir el objeto a un archivo json
            const personajes = [];
            // console.log(data);
            data.results.forEach(personaje => {
                personajes.push(personaje);
            });
           personajes.forEach(personaje=>{
               pintarCard(personaje);
           })
           console.log(data);
           const linkPrev = data.info.prev ?  `<a class="h2 link_btn_prev" href= "${data.info.prev}">⏮️</a>`: "";
           const linkNext = data.info.next ? `<a class="h2 link_btn_next"  href= "${data.info.next}">⏭️</a>`: "";
           header.innerHTML =  linkPrev + " " + linkNext;
           const link_next = document.querySelector(".link_btn_next");
           const link_prev = document.querySelector(".link_btn_prev");
           
            if(link_prev){
                 link_prev.addEventListener("click", function(e){
            e.preventDefault();
            fetchData(e.target.getAttribute("href"));
            })
            }
           link_next.addEventListener("click", function(e){
                e.preventDefault();
                fetchData(e.target.getAttribute("href"));
           })
           

            // console.log(personajes);
        }
        catch(error){
            console.log(error);
        }
    }
    
const pintarCard = (personaje) =>{
    
    const flex = document.querySelector(".list-items");
    const template = document.querySelector("#template-card").content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
   
    clone.querySelector('.card-body-img').setAttribute('src', personaje.image);
    clone.querySelector('.card-body-title').innerHTML = `${personaje.name}`
    clone.querySelector(".card-body-text").textContent = personaje.gender
    clone.querySelectorAll(".card-footer-social h3")[0].textContent = personaje.species 
    clone.querySelectorAll(".card-footer-social h3")[1].textContent = personaje.status 
  
    
    fragment.appendChild(clone);
    flex.appendChild(fragment);
   
}

    fetchData(`https://rickandmortyapi.com/api/character`);
  
   
       
 
    // personaje ={
    //     nombre: personajes.,    
    // }
 
    
});