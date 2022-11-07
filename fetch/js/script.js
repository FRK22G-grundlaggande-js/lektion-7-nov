// Leta reda på knappen
const btn = document.querySelector('button');
const main = document.querySelector('main');

// Lyssna efter klick
btn.addEventListener('click', async function() {
    // Vid klick
    // 1. Bygg ihop URL
    try {
    const base = 'https://swapi.dev/api';
    const resource = document.querySelector('select').value;
    const id = document.querySelector('input').value;
    const url = `${base}/${resource}/${id}`;

    // 2. Anropa fetchData-funktionen med URL
    main.innerHTML = 'loading...'
    const data = await fetchData(url);

    // 3. Gör något med svaret
    updateDOM(data);

    // Om något gick fel, fånga upp
    } catch(err){ // Fånga up ev fel i await funktionerna, ex. hittar ej resursen
        console.error(err)
        main.innerHTML = err; // visa för användare att något sket sig
    }
})


// Vid klick, anropa servern
async function fetchData(url){
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);
        if(data.detail === 'Not found'){
           throw Error(data.detail) // Kasta ett fel!
        };
        return data;
}


function updateDOM(data){
    
    main.innerHTML = '';
    let template = '';


    // Is is a person?
    if(data.hair_color){
        console.log('Its a person!')

        template = `
        <article>
            <h1>${data.name}</h1>
            <p>Längd: ${data.height}</p>
        </article>
        `
    }

    // Is it a planet?
    if(data.diameter){

        console.log('Its a planet!')

        template = `
        <article>
            <h1>${data.name}</h1>
            <p>diameter: ${data.diameter}</p>
        </article>
        `
    }

    // Is it a starship?
    if(data.starship_class){

        console.log('Its a starship!')

        template = `
        <article>
            <h1>${data.name}</h1>
            <p>Class: ${data.starship_class}</p>
        </article>
        `
    }

    main.insertAdjacentHTML('beforeend', template);

}