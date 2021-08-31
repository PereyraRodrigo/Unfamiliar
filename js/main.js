const shopProducts = [
    { nombre: "Dublin Ring", precio: 1500, imagen: "media/goods1.jpg" },
    { nombre: "Tokyo Necklace", precio: 1900, imagen: "media/goods2.jpg" },
    { nombre: "Good Vibes Cap", precio: 3500, imagen: "media/goods3.jpg" },
    { nombre: "Watch Cap", precio: 4000, imagen: "media/goods4.jpg" }    
]



const cards = i => {
    let cardsContainer = document.createElement("div");
    cardsContainer.setAttribute("class", "card");
    return cardsContainer;
}
const images = i => {

    let img = document.createElement("img");
    img.setAttribute("src", shopProducts[i].imagen)
    img.setAttribute("class", "card-img-top img-fluid")
    return img;
}

const titles = i => {
    let title = document.createElement("p")
    title.setAttribute("class", "card-title fs-7 fw-bold")
    title.innerHTML = shopProducts[i].nombre;
    return title;
}



const precios = i => {

    let price = document.createElement("p");
    price.setAttribute("class", "mb-0 fs-7 text-muted")
    price.innerHTML = `${shopProducts[i].precio}$`;
    return price;
    
}

const botones = i => {
    let button = document.createElement("i");
    button.setAttribute("class", "bi bi-cart icons")
    return button;
}


const guardarProductosEnCarrito = (button, i) => {
    
    button.addEventListener("click", () => {
        
        const productoNombre = shopProducts[i].nombre;
        const productoPrecio = shopProducts[i].precio;

        let productosObject = {
            productoNombre,
            productoPrecio,
        }       
    
        if(localStorage.getItem('productos') === null){
            let productosArray = []
            productosArray.push(productosObject)
            localStorage.setItem('productos', JSON.stringify(productosArray))
        }else{ 
            let productosEnLocalStorage = JSON.parse(localStorage.getItem('productos'));
            productosEnLocalStorage.push(productosObject);
            localStorage.setItem('productos', JSON.stringify(productosEnLocalStorage))
        }             
    })
}

const mostrarTodosLosProductos = (main,cardsContainer,img,title,price,button) =>{

    cardsContainer.appendChild(img)
    cardsContainer.appendChild(title) 
    cardsContainer.appendChild(price)
    cardsContainer.appendChild(button)
    main.appendChild(cardsContainer)
    /* realMain.appendChild(main) */
}

/* const realMain = document.createElement("div")
realMain.setAttribute("class", "container") */

for (let i = 0; i < shopProducts.length; i++) {

    //genero un main que contenga cada card
    const realMain = document.createElement("div")
    main.setAttribute("class", "col-md-8 d-flex justify-content-center m-auto my-5");
    document.body.appendChild(realMain)

    let cardsContainer = cards();
    const img = images(i);
    const title = titles(i);
    const price = precios(i);
    const button = botones(i);

    guardarProductosEnCarrito(button, i)
    
    mostrarTodosLosProductos(main, cardsContainer, img, title, price, button)
}

console.log(shopProducts);