// get total
//create products
//save local storage
//clear inputs
//read
//count
//delete
//update
// search
//clean date

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
function getTotal() {
  let result = +price.value + +taxes.value + +ads.value - +discount.value;
  if (price.value) {
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

let prodArr = [];
if (JSON.parse(localStorage.getItem("Products")) != null) {
  prodArr = JSON.parse(localStorage.getItem("Products"));
  showItems();
} else {
  prodArr = [];
}

submit.onclick = function () {
  createProduct();
};
function createProduct() {
  if (title.value && price.value && category.value && total.innerHTML != null) {
    productObj = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      count: count.value,
      category: category.value.toLowerCase(),
      total: total.innerHTML,
    };
    if (mood == "create") {
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          prodArr.push(productObj);
        }
      } else {
        prodArr.push(productObj);
      }
    } else {
      prodArr[tmp] = productObj;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    localStorage.Products = JSON.stringify(prodArr);
    showItems();
    clearInputs();
  } else {
    alert("Please fill all inputs");
  }
}

function showItems() {
  table = "";
  for (let i = 0; i < prodArr.length; i++) {
    table += ` <tr>
                        <td>${i + 1}</td>
                        <td>${prodArr[i].title}</td>
                        <td>${prodArr[i].price}</td>
                        <td>${prodArr[i].taxes}</td>
                        <td>${prodArr[i].ads}</td>
                        <td>${prodArr[i].discount}</td>
                        <td>${prodArr[i].total}</td>
                        <td>${prodArr[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteBtn = document.getElementById("deleteAll");
  if (prodArr.length > 0) {
    deleteBtn.innerHTML = `<button onclick="deleteAll()">Delete All (${prodArr.length}) </button>`;
  } else {
    deleteBtn.innerHTML = "";
  }
}

function clearInputs() {
  let inputs = [title, price, taxes, ads, discount, count, category];
  inputs.map((inp) => (inp.value = ""));
  total.innerHTML = "";
  total.style.background = "#a00d02";
}

function deleteProduct(idx) {
  prodArr.splice(idx, 1);
  localStorage.Products = JSON.stringify(prodArr);
  showItems();
}

function deleteAll() {
  localStorage.clear();
  prodArr.splice(0);
  showItems();
}

function updateProduct(index) {
  title.value = prodArr[index].title;
  price.value = prodArr[index].price;
  taxes.value = prodArr[index].taxes;
  ads.value = prodArr[index].ads;
  discount.value = prodArr[index].discount;
  category.value = prodArr[index].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
  tmp = index;
}

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.focus();
  search.placeholder = "Search By " + searchMood;
  search.value = "";
  showItems();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < prodArr.length; i++) {
    if (searchMood == "title") {
      if (prodArr[i].title.includes(value.toLowerCase())) {
        table += ` <tr>
        <td>${i + 1}</td>
        <td>${prodArr[i].title}</td>
        <td>${prodArr[i].price}</td>
        <td>${prodArr[i].taxes}</td>
        <td>${prodArr[i].ads}</td>
        <td>${prodArr[i].discount}</td>
        <td>${prodArr[i].total}</td>
        <td>${prodArr[i].category}</td>
        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
    </tr>`;
      }
    } else {
      if (prodArr[i].category.includes(value.toLowerCase())) {
        table += ` <tr>
       <td>${i + 1}</td>
       <td>${prodArr[i].title}</td>
       <td>${prodArr[i].price}</td>
       <td>${prodArr[i].taxes}</td>
       <td>${prodArr[i].ads}</td>
       <td>${prodArr[i].discount}</td>
       <td>${prodArr[i].total}</td>
       <td>${prodArr[i].category}</td>
       <td><button onclick="updateProduct(${i})" id="update">update</button></td>
       <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
   </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

