let clearCartButton = document.querySelector(".pushbar__clearCart")

let pushbarOverlay = document.querySelector('html')

let cartOverlay = document.querySelector(".pushbar")
let cartTotal = document.querySelector(".pushbar__totalPrice")
let cartItems = document.querySelector(".cart-items")

let cartContent = document.querySelector("#cartContainer")

let productsDOM = document.querySelector("#menList")


//carrito
let cart = []

//botones
let buttonsDOM =[]

//obteniendo productos
class Products{
    async getProducts() {
        try {
            let result = await fetch("../json/unfamiliarproducts.json")
            let data = await result.json();
            let products = data.men;
            return products
        } catch (error) {
            console.log("error");
        }
    }
}

// Renderizar productos
class UI{
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <div class="col-sm-6 col-md-4 col-lg-3 mt-5">
                <div class="product-grid">
                    <div class="product-image">
                        <a href="#" class="image">
                            <img class="pic-1" src="${product.image}">
                            <img class="pic-2" src="${product.image2}">
                        </a>
                        <ul class="product-links">
                            <li><a href="#" data-tip="Add to Wishlist" data-bs-toggle="modal" data-bs-target="#wishlistModal"><i class="bi bi-heart"></i></a></li>
                        </ul>
                        <button data-id="${product.id}" class="add-to-cart" href="#">Add to cart</button>
                    </div>
                    <div class="product-content">
                        <h3 class="title"><a href="#">${product.title}</a></h3>
                        <div class="price">$${product.price}</div>
                    </div>
                </div>
            </div>
            `
        })
        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll(".add-to-cart")];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
                       
            button.addEventListener('click', (event) => {
                // obtener producto de productos
                //amount tiene en cuenta la cantidad
                let cartItem = { ...Storage.getProduct(id), amount: 1 };
                //agregar productos al carrito
                cart = [...cart, cartItem];
                //guardar carrito en el local storage
                Storage.saveCart(cart)
                //suma cantidad en icono carrito
                this.setCartValues(cart);
                //renderizar items carrito
                this.addCartItem(cartItem)
                //sweetalert que confirma haber agregado item al carrito
                this.showCartAlert()
            })   
        })
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        //cuenta multiplica precio x cantidad
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount
        })
        //cambia numerito en icon navbar
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
        cartItems.innerText = itemsTotal;      
    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('pushbar__item');
        div.innerHTML = `
        <img src="${item.image}" alt="">
            <div class="pushbar__text">
                <p class="pushbar__name">${item.title}</p>
                <p class="pushbar__price">$${item.price}</p>
                <div class="pushbar__interaction">
                  <i class="bi bi-file-plus" data-id=${item.id}></i>
                  <p class="pushbar__amount">${item.amount}</p>
                  <i class="bi bi-file-minus" data-id=${item.id}></i>
                </div>
                <a href="#" class="pushbar__delete text-decoration-none text-light" data-id=${item.id}>Delete</a>
            </div>
        `;
        cartContent.appendChild(div);
    }
    showCartAlert() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 1500
          })          
          Toast.fire({
            icon: 'success',
            title: 'Item added to the cart'
          })
    }
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    cartLogic() {
        //boton para limpiar carrito
        clearCartButton.addEventListener('click', () => {
        this.clearCart()
        })
        //funcionamiento del carrito
        cartContent.addEventListener('click', event => {
            //para eliminar items del carrito
            if (event.target.classList.contains('pushbar__delete')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement)
                this.removeItem(id);
            }
            else if (event.target.classList.contains("bi-file-plus")) {
                let agregarAmount = event.target;
                let id = agregarAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                agregarAmount.nextElementSibling.innerText = tempItem.amount;
            }
            else if (event.target.classList.contains("bi-file-minus")) {
                let restarAmount = event.target;
                let id = restarAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                //logica para que no se pase del 0
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    restarAmount.previousElementSibling.innerText = tempItem.amount;
                }
                else {
                    cartContent.removeChild(restarAmount.parentElement.parentElement.parentElement)
                    this.removeItem(id)
                }
            }
        })
    }
    clearCart() {
        cart = [];
        this.setCartValues(cart);
        Storage.saveCart(cart);

        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0])
        }
    }
    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        this.getBoton(id);        
    }
    getBoton(id) {
        return buttonsDOM.find(button => button.dataset.id === id)
    }
}

//LocalStorage
class Storage{
    static saveProducts(products) {
        localStorage.setItem('products',JSON.stringify(products))
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart',JSON.stringify(cart))
    }
    static getCart() {
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    //setup app
    ui.setupAPP();
    //obtener todos los productos
    products.
        getProducts().
        then(products => {
            ui.displayProducts(products)
            Storage.saveProducts(products);
        })
        .then(() => {
            ui.getBagButtons()
            ui.cartLogic()
    });
});