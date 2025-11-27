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
        const result = data.filter(product => product.title.toLowerCase().includes(keys.toLowerCase()));
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
<div 
    data-modal-target="static-modal" data-modal-toggle="static-modal"
    id="${product.id}" class="h-full flex flex-col justify-between w-full bg-[#EBEBEB] p-5 border border-default rounded-base border-[#F77F00] shadow-xs">
    <a href="#" class="h-48 sm:h-56 mb-4 mx-auto flex justify-center">
        <img class="ax-h-full max-w-full object-contain" src="${product.image}"" />
    </a>
    <div>
        <a href="#">
            <span class="font-medium">${product.category}</span>
            <h5 class="h-14 overflow-hidden text-lg font-bold tracking-tight mt-2 h-16 ">${product.title}</h5>
        </a>
        <div class="flex items-center justify-between ">
            <span class="text-lg font-bold mt-2">$${product.price}</span>
        </div>
        <button data-modal-target="static-modal" data-modal-toggle="static-modal" class="w-full mt-2 text-black bg-[#F77F00] box-border border border-transparent hover:bg-brand-strong focus:ring-2 focus:ring-brand-medium shadow-xs font-bold leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button"
        onclick="displayPopup(${product.id})">
  Show details
  </button>
    </div>
</div>`
cardContainer.appendChild(card)
    })
}

document.addEventListener('DOMContentLoaded', displayCards("all"));

// filter cards



// search
const searchResultsContainer = document.getElementById("searchResults");
const searchInput = document.getElementById("input-group-1");
function handleSearchInput(event) {
    const keys = event.target.value.trim();
    if (keys.length > 0) {
        displaySearch(keys);
    } else {
        searchResultsContainer.innerHTML = "";
        searchResultsContainer.classList.remove("p-6");
    }
}
searchInput.addEventListener("input", handleSearchInput);

async function displaySearch(keys) {
    searchResultsContainer.innerHTML = "";     
    searchResultsContainer.classList.remove("p-6");
    let results = "";
    results = await searchData(keys);
    searchResultsContainer.innerHTML = "";
    
    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<div class="col-span-full text-center py-10 text-xl text-heading">No products found.</div>';
        return;
    }
    searchResultsContainer.classList.add("p-6");
    results.forEach(result => {
        const resultCard = document.createElement("div");
        resultCard.className = "flex items-start";
        resultCard.innerHTML = `<img src="${result.image}" class="flex-shrink-0 h-16 w-16 object-cover rounded-md mr-4">
                <div class="flex flex-col flex-grow">
                    <span class="text-gray-900 font-medium text-base line-clamp-2">${result.title}</span>
                    <span class="text-gray-700 font-bold text-lg mt-1">$${result.price}</span>
                </div>`
    searchResultsContainer.appendChild(resultCard);
    })
}

// displaySearch("Casual")

const popup = document.getElementById("static-modal");

async function displayPopup(id) {
    popup.innerHTML = "";
    let data = "";
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        data = await response.json();
    }
    catch(error){
        console.error(error);
    }

    const poupCard = document.createElement("div");
    poupCard.className = "w-full md:max-w-4xl md:m-20";
    poupCard.innerHTML = `
        <!-- Modal content -->
        <div class="relative bg-[#EBEBEB] border border-default border-[#F77F00] rounded-base shadow-sm p-4 md:p-5">
            <!-- Modal header -->
            <div class="flex items-center justify-between  pb-4 md:pb-5">
                <button type="button" class="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="static-modal">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <!-- CARD DETAILS ========= -->
<a href="#" class="flex w-full h-full">
    <div class="w-1/2 h-full flex items-center justify-center p-4">
    <img class="object-contain max-h-full" src="${data.image}" alt="">
</div>    
    <div class="flex flex-col justify-between md:p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-heading">${data.title}</h5>
        <!-- stars -->
        <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-5 h-5 text-[#F77F00]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
                <svg class="w-5 h-5 text-[#F77F00]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
                <svg class="w-5 h-5 text-[#F77F00]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
                <svg class="w-5 h-5 text-[#F77F00]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
                <svg class="w-5 h-5 text-[#F77F00]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/></svg>
            </div>
            <!-- --------- -->
        <p class="mb-6 text-body font-bold">${data.description}</p>
        <p class="mb-6 text-2xl font-bold text-heading">$${data.price}</p>
        <div>
            <div class="flex items-center space-x-4 pt-4 md:pt-5">
                <button data-modal-hide="static-modal" type="button" class=" bg-[#F77F00] box-border border border-[#F77F00] hover:bg-brand-strong focus:ring-2 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-body font-bold px-4 py-2.5 focus:outline-none">Add to cart</button>
                <button data-modal-hide="static-modal" type="button" class="text-body font-bold  box-border border border-[#F77F00] hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-2 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Add to wishlist</button>
            </div>
        </div>
    </div>
</a>

        </div>
    </div>
`
popup.appendChild(poupCard);
}

// displayPopup(3)