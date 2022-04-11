

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url_api, true);
        request.onreadystatechange = (()=>{
            if(request.readyState === 4){
                (request.status === 200)
                 ? resolve(JSON.parse(request.responseText))
                 : reject(new Error('Error ' + url_api))

            }
        });
        request.send();
    });
}

const API = 'https://fakestoreapi.com/products/';
var app = document.getElementById("app");

window.fetch(API)
//call API and get JSON format
    .then((respuesta) => respuesta.json())
//print API on app = app.append(...todoLosItems)
    .then((responseJson) => {
        //console.log(responseJson);        
        var todosLosItems = [];
        responseJson.forEach((item) => {
            //console.log(item.price);
            //crear imagen
            const image = document.createElement("img");
            image.src = item.image
            image.className = 'card-img-top';

            //cerear tiutlo
            const title = document.createElement('h5');
            title.textContent = item.title;
            title.className = "card-title";
            //crear descripcion
            const description = document.createElement("p");
            description.textContent = item.description;

            //category
            const category = document.createElement('p');
            category.textContent = item.category;

            const divCard = document.createElement("div");
            divCard.append(title, description)
            divCard.className="card-body";

            //crear precio 
            const price = document.createElement("b");
            price.textContent = formatPrice(item.price);
            price.className = "nav me-auto ms-3 mt-3";

            //create Botones
            const addToCard = document.createElement("button");
            addToCard.textContent = "Add To Cart";
            addToCard.className = "btn btn-outline-success flex-row-reverse m-2"
            addToCard.id = "addToCard";
            addToCard.addEventListener('click', function(){
                console.log(title.textContent);
                console.log(price.textContent);
                console.log(category.textContent);
                addItemToCart(title.textContent, price.textContent)
                
            });

            const actionDiv = document.createElement("div");
            actionDiv.append(price, addToCard);
            actionDiv.className = "d-flex"
    

            //crer contenendor 
            const myContainer = document.createElement("div");
            myContainer.append(image, divCard, actionDiv);
            myContainer.className; "card h-100";

            const bigContainer = document.createElement("div");
            bigContainer.append = myContainer;
            bigContainer.className = 'col';
            bigContainer.style.backgroundColor = "white";


            todosLosItems.push(myContainer);
        });
        app.append(...todosLosItems);

    })

var viewCart = document.getElementById('viewCart');
viewCart.addEventListener('click', updateCartTotal)


function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = formatPrice(total);
    }




function addItemToCart(title, price) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == title) {
                alert('This item is already added to the cart')
                return
            }
        }
        var cartRowContents = `
            
            <div class="cart-item cart-column">
                
                <span class="cart-item-title">${title}</span>
            </div>
            <div class="cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <b class="cart-price">${price}</b> <br>
            </div>
            <div class="cart-quantity cart-column">
                <button class="btn btn-danger" type="button">X</button>
            </div>
            `
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    }




















//Intl format for price 
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat("en-EN",{
        style: "currency",
        currency: "USD",
    }).format(price)

    return newPrice;
}




























const anotherFunction = async (url_api) => {
    try{
        const data = await fetchData(url_api)
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const title = data[i].title;
            const price = data[i].price;
            const description = data[i].description;
            const image = data[i].image;
            const category = data[i].category;
            //console.log(title);
            app2.innerHTML = `
                <div class="col">
                    <div class="card h-100">
                    <img src="${image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title" id="itemTitle">${title}</h5>
                            <p class="card-text">${description}</p>
                        </div>
                        <div class=" d-flex">
                            <b class="nav me-auto ms-3 mt-3" id="itemPrice">$ ${price}</b>
                            <button class="btn btn-outline-success flex-row-reverse m-2" id="addButton">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `
        }
    }catch(error){
        console.log(`este es el error: ${error}`);
    }
    

    //Add cart Button
    // var addButton = document.getElementById("addButton");
    // addButton.addEventListener("click", function(){
    //     console.log("Add to Cart Button clicked");
    //     document.getElementById('shoppingList').innerHTML = `
    //     <li class="list-group-item d-flex justify-content-between lh-sm">
    //     <div>
    //       <h6 class="my-0 r-4">Product name</h6>
    //       <small class="text-muted">Brief de description</small>
    //       <br>

    //       <span class="text-danger" id="deleteButton"> 
    //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
    //           <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
    //         </svg>
    //         Delete</span>
    //     </div>
    //     <span class="text-muted">$12</span>
    //   </li>

    //     `;
        

    //                 //Delete item form cart 
    //         var deleteButton = document.getElementById("deleteButton");
    //         deleteButton.addEventListener('click', function(event){
    //             //console.log("clck on deleteButton");
    //             var deleteClicked = event.target
    //             deleteClicked.parentElement.parentElement.parentElement.remove() 
    //         })
    // })


}

//anotherFunction(API);





//In your Javascript code, you can store data by using:
//set_cookie("shopping_cart_items", items);
//Fetch the data by using:
//var data = get_cookie("shopping_cart_items");



//TODO: boton que agregue al carrito 
//crear la LISTA del carrito y mostrarla. 

//TODO: boton que elimine todos los items del carrito 








