// Leta reda på knappen
const btn = document.querySelector('button');
const main = document.querySelector('main');

// Lyssna efter klick
btn.addEventListener('click', async function() {
    // Vid klick
    // 1. Bygg ihop URL
    const base = 'https://swapi.dev/api';
    const resource = 'planets';
    const id = 1;
    const url = `${base}/${resource}/${id}`;

    // 2. Anropa fetchData-funktionen med URL
    main.innerHTML = 'loading...'
    const data = await fetchData(url);
    console.log(data);
    // 3. Gör något med svaret
    updateDOM(data);
})


// Vid klick, anropa servern
async function fetchData(url){
    const resp = await fetch(url)
    const data = await resp.json();
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

    main.insertAdjacentHTML('beforeend', template);

}