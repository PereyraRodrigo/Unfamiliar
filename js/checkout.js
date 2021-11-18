let buttonBuy = document.querySelector("#btnBuy")

buttonBuy.addEventListener('click', (event) => {
    Swal.fire({
        title: 'Thank you for your purchase!',
        text: "Your order was succesfully done. ",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Great!'
      })
});