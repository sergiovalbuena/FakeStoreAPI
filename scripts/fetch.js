


//fetch function, promise, try/catch
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

export {fetchData}