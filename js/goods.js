const shopProducts = [
    { id: "1", nombre: "Dublin Ring", precio: 1200, imagen: "media/goods1.jpg" },
    { id: "2", nombre: "Tokyo Necklace", precio: 1900, imagen: "media/goods2.jpg" },
    { id: "3", nombre: "Good Vibes Cap", precio: 3500, imagen: "media/goods3.jpg" },
    { id: "4", nombre: "Watch Cap", precio: 4700, imagen: "media/goods4.jpg" },    
    { id: "5", nombre: "Good Vibes Cap", precio: 3500, imagen: "media/goods3.jpg" },    
    { id: "6", nombre: "Watch Cap", precio: 4000, imagen: "media/goods4.jpg" },    
    { id: "7", nombre: "Dublin Ring", precio: 1500, imagen: "media/goods1.jpg" },    
    { id: "8", nombre: "Tokyo Necklace", precio: 1900, imagen: "media/goods2.jpg" }    
]

$(document).ready(function () {
    $("#selectOptions").on("change", ordenar);
    renderizarProductos();
});


const renderizarProductos = () => {
    for (const products of shopProducts) {
        $("#cardscontainer").append(
            `<div class="col-md-3 pb-5">
            <div class="card">
                <img src="${products.imagen}" class="card-img-top img-fluid" alt="..." />                    
                <div class="card-body ps-0 pb-3">
                    <p class="card-title fs-7 fw-bold">${products.nombre}</p>
                    <p class="mb-0 fs-7 text-muted">${products.precio}</p>
                    <i class="bi bi-cart-plus-fill"></i>
                    <button id="item${products.id}" class="d-flex btn btn-dark p-2">Buy Item</button>
                </div>
            </div>
        </div>`);
        $(`#item${products.id}`).on("click", () => { console.log(`You've added ${products.nombre} to your cart.`);})        
    }
}


const ordenar = () => {
    let seleccion = $("#selectOptions").val();
    console.log(seleccion);
    if (seleccion == "low") {
        shopProducts.sort(function (a, b) {
            return a.precio - b.precio
        });
    } else if(seleccion == "high") {
        shopProducts.sort(function (a, b) {
            return b.precio - a.precio
        });
    } else if (seleccion == "order") {
        shopProducts.sort(function (a, b) {
            return a.nombre.localeCompare(b.nombre)
        });
    } 
    $("#cardscontainer div").remove();
    renderizarProductos();
}
console.log("what");
