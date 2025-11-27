// const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

async function fetchData(){
    try{
        const response = await fetch(`https://fakestoreapi.com/products`);
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
}

async function filterData(category){
    try{
        const response = await fetch(`https://fakestoreapi.com/products`);
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        const result = data.filter(product => product.category === category);
        return result;
    }
    catch(error){
        console.error(error);
    }
}

async function searchData(keys){
    try{
        const response = await fetch(`https://fakestoreapi.com/products`);
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        const result = data.filter(product => product.title.includes(keys));
        return result;
    }
    catch(error){
        console.error(error);
    }
}

const cardContainer = document.getElementById("card-container");

// all cards
async function displayCards(type) {
     cardContainer.innerHTML = "";
     cardContainer.innerHTML = '<div class="col-span-full text-center py-10 text-xl text-body">Loading products...</div>';
     
     let products = "";
     if (type == "all") {
        products = await fetchData();
     }
     else
     {
        products = await  filterData(type);
     }

     cardContainer.innerHTML = "";
     if (products.length === 0) {
        cardContainer.innerHTML = '<div class="col-span-full text-center py-10 text-xl text-heading">No products found.</div>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.innerHTML = `
<div class="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
    <a href="#">
        <img class="rounded-base mb-6" src="${product.image}"" />
    </a>
    <div>
        <div class="flex items-center space-x-3 mb-6">
            <span class="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">SOLD OUT</span>
        </div>
        <a href="#">
            <span class="bg-brand-softer  text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">${product.category}</span>
            <h5 class="text-xl text-heading font-semibold tracking-tight">${product.title}</h5>
        </a>
        <div class="flex items-center justify-between mt-6">
            <span class="text-3xl font-extrabold text-heading">$${product.price}</span>
            
        </div>
    </div>
</div>`
cardContainer.appendChild(card)
    })
}

document.addEventListener('DOMContentLoaded', displayCards("all"));

// filter cards



// search
const searchResultsContainer = document.getElementById("searchResults");
async function displaySearch(keys) {
     searchResultsContainer.innerHTML = "";     
     let results = "";
     results = await searchData(keys);

     if (results.length === 0) {
        searchResultsContainer.innerHTML = '<div class="col-span-full text-center py-10 text-xl text-heading">No products found.</div>';
        return;
    }
    const resultsContainer = document.createElement("div");

    results.forEach(result => {
        const resultCard = document.createElement("div");
        resultCard.innerHTML = ``

cardContainer.appendChild(card)
    })
}