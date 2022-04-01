//In your Javascript code, you can store data by using:
//set_cookie("shopping_cart_items", items);
//Fetch the data by using:
//var data = get_cookie("shopping_cart_items");

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

//url from the API 
//import fetchData from "./fetch.js";
const API = 'https://fakestoreapi.com/products/';

const anotherFunction = async (url_api) => {
    try{
        const data = await fetchData(url_api)
        //console.log(data);
        for (let i = 0; i < data.length; i++) {
            const title = data[i].title;
            const price = data[i].price;
            const description = data[i].description;
            const image = data[i].image;
            const category = data[i].category;
            //console.log(title);
            document.getElementById("app").innerHTML += `
                <div class="col">
                    <div class="card h-100">
                    <img src="${image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${description}</p>
                        </div>
                        <div class=" d-flex">
                            <b class="nav me-auto ms-3 mt-3">$ ${price}</b>
                            <button class="btn btn-outline-success flex-row-reverse m-2">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `
        }
    }catch(error){
        console.log(error);
    }
}
anotherFunction(API);


//TODO: boton que agregue al carrito 
//crear la LISTA del carrito y mostrarla. 

//TODO: boton que elimine todos los items del carrito 





// var autocomplete=new autocomplete({
//     input:document.getElementById("test"),
//     key:'your auth code',
//     itemtemplate:'<a href="http://geocoder.ca/?locate={{geocodeaddr}}" class="list-group-item list-group-item-action flex-column align-items-start"> \
//     <img width="24px" src="img/geocodelogo.svg"/> {{geocodeaddr}} <span class="float-right badge badge-warning"> > </span> </a>'

// });




