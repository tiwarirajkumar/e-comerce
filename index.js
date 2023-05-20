token = tokenize();
auth_passcode = "MzAwMjEzNDAwOjE3MzgxM0JERDEwOTRFODlBQjM5RTMzNkQ1MjM3Q0Yw"
const products = [
    { id: 1, name: 'NIKE ATR', price: 40, image: 'images/1.jpg' },
    { id: 2, name: 'CAMPUS', price: 50, image: 'images/2.jpg' },
    { id: 3, name: 'SPARAX', price: 60, image: 'images/3.jpg' },
    { id: 4, name: 'ADIDAS', price: 70, image: 'images/4.jpg' },
    { id: 5, name: 'REEBOOK', price: 80, image: 'images/product-1.jpg'},
    { id: 6, name: 'PUMA', price: 30, image: 'images/product-2.jpg'},
    { id: 7, name: 'BATA', price: 90, image: 'images/product-3.jpg'},
    { id: 8, name: 'WOODLAND', price: 100,image: 'images/product-4.jpg'},
  ];


let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');


  // Function to add a product to the shopping cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItems = document.getElementById('cart-items');
  
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
        <div class="collection-card" style="background-image:url(${product.image})">
        <h1>${product.name}</h1>
        <a class="btn"><i class="fas fa-solid fa-indian-rupee-sign product-price"> ${product.price}</i></a>
        </div>`
        cartItems.appendChild(cartItem);

        calculate_total()
      }

function calculate_total() {
    let cartItems = document.getElementsByClassName('product-price');
    let total_price = 0;
    for (const item of cartItems){
        total_price = total_price + parseInt(item.innerHTML.trim());
    }
    document.getElementById("total-price").innerHTML = "Total: " + total_price;

}

menu.onclick = () => {
    menu.classList.toggle('fas-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fas-times');
    menu.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next() {
    slides[index].classList.remove('active');
    index=(index+1)% slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index=(index-1+slides.length)% slides.length;
    slides[index].classList.add('active');
}





// paymemt gateway
$("#divVCButton").click(function(){    
    console.log(token);
    $.post("https://api.na.bambora.com/v1/profiles",
    {
      card: {
        name: "Raj",
        number: "4504481742333",
        expiry_month: "05",
        expiry_year: "26",
        cvd: "123"
      },
      bank_account: {},
      create_from_id: {
        create_from_id: 12345678
      },
      token: {
        name: "Raj",
        code: token
      },
      billing: {
        name: "Raj",
        address_line1: 'Bangaore',
        city: "bangalore",
        country: "91",
        postal_code: "560068",
        phone_number: "8877665544",
    },
    custom:  {},
    comment: "",
    language: "En",
    validate: true

    },
   
    function(data, status){
      console.log("Data: " + data + "\nStatus: " + status);
      str = JSON.stringify(data);
      console.log(str);
    });
  });



  // tokenization
function tokenize(){
    token = ""
    $.post("https://api.na.bambora.com/scripts/tokenization/tokens",
    {
      number: "4504481742333",
      expiry_month: "05",
      expiry_year: "26",
      cvd: "123"
    },
    function(data, status){
    //   console.log("Data: " + data + "\nStatus: " + status);
      token = data['token']; 
    //   console.log(token);   
    });
    return token;
  };


  function set_price(){
    price = document.getElementById("total-price").innerHTML;
    price = price.split("Total:")
    price = price[1].trim();
    localStorage.setItem("price", price)
    window.location.href = 'checkout.html';
  }


  