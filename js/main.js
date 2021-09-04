const shopProducts = [
    { nombre: "Dublin Ring", precio: 1500, imagen: "media/goods1.jpg" },
    { nombre: "Tokyo Necklace", precio: 1900, imagen: "media/goods2.jpg" },
    { nombre: "Good Vibes Cap", precio: 3500, imagen: "media/goods3.jpg" },
    { nombre: "Watch Cap", precio: 4000, imagen: "media/goods4.jpg" },    
    { nombre: "Good Vibes Cap", precio: 3500, imagen: "media/goods3.jpg" },    
    { nombre: "Watch Cap", precio: 4000, imagen: "media/goods4.jpg" },    
    { nombre: "Dublin Ring", precio: 1500, imagen: "media/goods1.jpg" },    
    { nombre: "Tokyo Necklace", precio: 1900, imagen: "media/goods2.jpg" }    
]

/*
console.log(shopProducts);


const renderizarProductos = () => {
    for (const products of shopProducts) {
        $("#cardscontainer").append(`<div class="col-md-3">
        <div class="card">
        <img src="${products.imagen}" class="card-img-top img-fluid" alt="..." />
        <a href=""><i class="bi bi-heart corazon"></i></a>
        <div class="card-body ps-0 pb-3">
        <p class="card-title fs-7 fw-bold">${products.nombre}</p>
        <p class="mb-0 fs-7 text-muted">${products.precio}</p>
        <i class="bi bi-cart-plus-fill"></i>
        </div>
        </div>
        </div>`)
    }
}

renderizarProductos(); */



/* const guardarLocal = (clave,valor) => { localStorage.setItem(clave,valor)}
for (const products of shopProducts) {
    guardarLocal(products.nombre, JSON.stringify(products))
} */


const renderizarProductos = () => {
    for (const products of shopProducts) {
        $("#cardscontainer").append(`<div class="col-md-3">
        <div class="card">
        <img src="${products.imagen}" class="card-img-top img-fluid" alt="..." />
        <a href=""><i class="bi bi-heart corazon"></i></a>
        <div class="card-body ps-0 pb-3">
        <p class="card-title fs-7 fw-bold">${products.nombre}</p>
        <p class="mb-0 fs-7 text-muted">${products.precio}</p>
        <i class="bi bi-cart-plus-fill"></i>
        </div>
        </div>
        </div>`)
    }
}

renderizarProductos();