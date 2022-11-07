const base = 'https://swapi.dev/api';
const route = 'people'
const id = 1;

const url = `${base}/${route}/${id}`;

async function fetchData(){
    // anropa servern och vänta på svar
    const resp = await fetch(url);
    const data = await resp.json();
    // logga svaret
    console.log(data);
}

fetchData()