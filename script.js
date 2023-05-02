const $container = document.getElementById('container');
const baseURL = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
let countPage;

const getData = async (page) => {
    try {
        const response = await fetch(`${baseURL}/?page=${page}`);
        const data = await response.json();
        countPage = data.info.pages;

        data.results.forEach(Person => {
            const $div = document.createElement('div');
            $div.classList.add('person')
            $div.innerHTML = `
                <img src="${Person.image}" alt="${Person.name}">
                <div>
                    <h2 class="name">Name: ${Person.name}</h2>
                    <h3 class="status">Status: ${Person.status}</h3>
                    <p class="species">species: ${Person.species}</p>
                    <p class="info">Origin: ${Person.origin.name}</p>
                </div>
            `;
            $container.appendChild($div);
        })
        
    } catch (error) {
        console.log(error);
    }
}

getData(currentPage);

const $nextPage = document.querySelector('.btn-next-page');
$nextPage.addEventListener('click', (e) => {
    if (currentPage <= countPage) {
        $container.innerHTML = '';
        currentPage++;
        getData(currentPage)
    }
})

const $previousPage = document.querySelector('.btn-previous-page');
$previousPage.addEventListener('click', (e) => {
    if (currentPage > 1) {
        $container.innerHTML = '';
        currentPage--;
        getData(currentPage)
    }
})