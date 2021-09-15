const shopProducts = [
    { id: "1", nombre: "Dublin Ring", precio: 1200, imagen: "media/goods1.jpg", imagen2:"media/goods2.jpg" },
    { id: "2", nombre: "Tokyo Necklace", precio: 1900, imagen: "media/goods2.jpg", imagen2:"media/goods1.jpg" },
    { id: "3", nombre: "Good Vibes Cap", precio: 3500, imagen: "media/goods3.jpg", imagen2:"media/goods4.jpg" },
    { id: "4", nombre: "Watch Cap", precio: 4700, imagen: "media/goods4.jpg", imagen2:"media/goods3.jpg" },    
    { id: "5", nombre: "Good Vibes Cap", precio: 3500, imagen: "media/goods3.jpg", imagen2:"media/goods2.jpg" },    
    { id: "6", nombre: "Watch Cap", precio: 4000, imagen: "media/goods4.jpg", imagen2:"media/goods3.jpg" },    
    { id: "7", nombre: "Dublin Ring", precio: 1500, imagen: "media/goods1.jpg", imagen2:"media/goods4.jpg" },    
    { id: "8", nombre: "Tokyo Necklace", precio: 1900, imagen: "media/goods2.jpg", imagen2:"media/goods3.jpg" }    
]

$(document).ready(function () {
    $("#selectOptions").on("change", ordenar);
    renderizarProductos();
});

let shopList = [];

class selectedItem{
    constructor(id,nombre,precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.amount = 1;
    }
}

const renderizarProductos = () => {
    for (const products of shopProducts) {
        $("#cardscontainer").append(
            `
            <div class="col-sm-6 col-md-4 col-lg-3 mt-5">
                <div class="product-grid">
                    <div class="product-image">
                        <a href="#" class="image">
                            <img class="pic-1" src="${products.imagen}">
                            <img class="pic-2" src="${products.imagen2}">
                        </a>
                        <ul class="product-links">
                            <li><a href="#" data-tip="Add to Wishlist"><i class="bi bi-heart"></i></a></li>
                        </ul>
                        <a id="item${products.id}" class="add-to-cart" href="#">Add to cart</a>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">${products.nombre}</a></h3>
                        <div class="price">$${products.precio}</div>
                    </div>
                </div>
            </div>
            `);
            $(`#item${products.id}`).on("click", () => {
                console.log(`You've added ${products.nombre} to your cart.`);
    
                $("#cartS").prepend(
                    `<div> You've added ${products.nombre} to your cart. </div>
                    `)
    
                shopList.push(new selectedItem(products.nombre, products.precio));
                console.log(shopList);
    
                localStorage.setItem("Cart", JSON.stringify(shopList))
            })        
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
