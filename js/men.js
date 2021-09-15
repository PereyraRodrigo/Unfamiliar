const shopProducts = [
    { id: "1", nombre: "Madrid Pants", precio: 1500, imagen: "media/main5.jpg", imagen2:"media/main6.jpg" }, 
    { id: "2", nombre: "Barcelona Pants", precio: 1800, imagen: "media/main6.jpg", imagen2:"media/main5.jpg" }, 
    { id: "3", nombre: "Cataluña Pants", precio: 2500, imagen: "media/main7.jpg", imagen2:"media/main8.jpg" }, 
    { id: "4", nombre: "Canarias Pants", precio: 3400, imagen: "media/main8.jpg", imagen2:"media/main7.jpg" }, 
    { id: "5", nombre: "Brazil Jacket", precio: 8400, imagen: "media/main5.jpg", imagen2:"media/main8.jpg" }, 
    { id: "6", nombre: "Russia Jacket", precio: 7800, imagen: "media/main8.jpg", imagen2:"media/main5.jpg" }, 
    { id: "7", nombre: "Germany Jacket", precio: 5400, imagen: "media/main6.jpg", imagen2:"media/main7.jpg" }, 
    { id: "8", nombre: "Italy Jacket", precio: 6700, imagen: "media/main7.jpg", imagen2:"media/main6.jpg" }, 
    { id: "9", nombre: "Argentina Shirt", precio: 4200, imagen: "media/main8.jpg", imagen2:"media/main5.jpg" }, 
    { id: "10", nombre: "Chile Shirt", precio: 4000, imagen: "media/main7.jpg", imagen2:"media/main6.jpg" }, 
    { id: "11", nombre: "Venezuela Shirt", precio: 5200, imagen: "media/main5.jpg", imagen2:"media/main6.jpg" },
    { id: "12", nombre: "Mexico Shirt", precio: 2600, imagen: "media/main5.jpg", imagen2:"media/main6.jpg" }
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
        $("#cardscontainerMen").append(
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
    $("#cardscontainerMen div").remove();
    renderizarProductos();
}

let pantsCards = document.getElementById("pants");
let pantsVisibility = false;

pantsCards.onclick = () => {
    showHidden("allPantCards", pantsVisibility);
    pantsVisibility = !pantsVisibility
}

function showHidden(namee, visibility) {
    let element = document.getElementById(namee);
    if (visibility == false) {
        if (element.classList.contains("oculto")) {
            element.classList.remove("oculto")
        }
        element.className += " visible"
    } else {
        if (element.classList.contains("visible")) {
            element.classList.remove("visible")
        }
        element.className += " oculto"
    }
}

let jacketCards = document.getElementById("jackets");
let jacketsVisibility = false;

jacketCards.onclick = () => {
    showHidden("allJacketCards", jacketsVisibility);
    jacketsVisibility = !jacketsVisibility
}

let shirtsCards = document.getElementById("shirts");
let shirtsVisibility = false;

shirtsCards.onclick = () => {
    showHidden("allShirtsCards", shirtsVisibility);
    shirtsVisibility = !shirtsVisibility
}