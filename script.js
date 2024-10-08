let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

//to check all data is right
console.log(title,  price, taxes, ads,  discount, total, count, category, submit);



//get total
function getTotal() {
    //to check it work
//     // console.log('done');
    if (price.value != "") {
        //+ convert the string to number because all the input get string
         var totalResult = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = totalResult;
        total.style.background = "green";
        // console.log(totalResult);
        
   } else {
        total.innerHTML = "";
        total.style.background = "red";
    }
}

//  create product

let productsData;
if (localStorage.product != null) {
    productsData = JSON.parse(localStorage.product);    
} else {
    productsData = [];    
}



submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };
    // console.log(newProduct);


    //count
    
    // make if condition to know if there was countNo. > 1 to display many items in table
    if (newProduct.count > 1) {
        //make a for loop to add all item content as a number of count
        for (let i = 0; i < newProduct.count; i++) {
            //using count to fetch data
           productsData.push(newProduct);           
        }        
    } else {
        productsData.push(newProduct);
    };



    // productsData.push(newProduct);
    localStorage.setItem('product', JSON.stringify(productsData));
    // console.log(productsData);

    clearData(); 

    showData()
    
}

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// display data

function showData() {
    let table = '';
    for (let i = 0; i < productsData.length; i++) {
        // table = productsData[i];
        // console.log(table);
        table += ` <tr>
                    <td>${i}</td>
                    <td>${productsData[i].title}</td>
                    <td>${productsData[i].price}</td>
                    <td>${productsData[i].taxes}</td>
                    <td>${productsData[i].ads}</td>
                    <td>${productsData[i].discount}</td>
                    <td>${productsData[i].total}</td>
                    <td>${productsData[i].count}</td>
                    <td>${productsData[i].category}</td>
                    <td><button onclick="deleteProduct(${i})">Delete</button></td>
                    <td><button onclick="updateProduct(${i})">Update</button></td>
                </tr> 
`
        
    }



    document.getElementById('tbody').innerHTML = table;
    // delete all

//make a button appear when the table has products
    //1-create an empty div in html to add the button
    let btnDeleteAll = document.getElementById('deleteAll');
    if (productsData.length > 0) {
         //to know the number of items in the array we add (${productsData.length})
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All(${productsData.length})</button> 
        `
       
    } else {
        btnDeleteAll.innerHTML = '';
    }
}
showData();

//delete one product should have parameter
function deleteProduct(i) {
    // console.log(i);
    //use splice to delete item in array (place of delete, no of deleted item)
    productsData.splice(i, 1);

    //save data back to local storage
    // localStorage.setItem('product', JSON.stringify(productsData));
    localStorage.product = JSON.stringify(productsData);
    
    //show updated data
    showData();
    
}

// delete all

//make a button appear when the table has products
//1-create an empty div in html to add the button

function deleteAll() {
    // console.log('delete all');
    //delete all products in localStorage
    localStorage.clear();
    //delete all products in productsData array
    productsData.splice(0);
    //show updated data
    showData();
}





