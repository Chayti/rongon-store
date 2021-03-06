// fetching products initially
const loadProductsInitially = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProductsInitially();



// fetching products on search
const loadProducts = () => {

  const inputFieldText = document.getElementById('input-field').value;
  if (inputFieldText) {
    const url = `https://fakestoreapi.com/products/category/${inputFieldText}`;
    // console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => showProducts(data));

    document.getElementById('all-products').textContent = " ";
    document.getElementById('product-details').textContent = " ";
  }
  else {
    alert("Please fill the search box");
  }

  document.getElementById('input-field').value = "";
};



// fetch details
const fetchDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));
}



// show all product in UI 
const showProducts = (products) => {

  if (products.length > 0) {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {

      const productImage = product.image;

      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
    <div class="single-product">
      
    <div>
        <img class="product-image" src=${productImage}></img>
      </div>
      
      <div class="title-box">
        <h3 class="product-title">${product.title}</h3>
      </div>
      
      <p>Category: ${product.category}</p>
      <p class="total-review"><a href="#">${product.rating.count} Reviews</a></p>
      <p class="text-warning">${product.rating.rate}</p>
      
      <h2>Price: $ ${product.price}</h2>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn" style="background-color:teal; color:azure;">Add to Cart</button>
      <button onclick="fetchDetails(${product.id})" id="details-btn" class="btn btn-warning">Details</button>

    </div>
      `;
      document.getElementById("all-products").appendChild(div);
    }
  }
  else {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2 class="text-primary text-center">No result found</h2>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};




//add to cart
let numOfProductsAddedToCart = 0;
const addToCart = (id, productPrice) => {

  numOfProductsAddedToCart++;
  updatePrice("price", productPrice);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = numOfProductsAddedToCart;

  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element).toFixed(2);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertedPrice = value;
  const total = +convertedOldPrice + convertedPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  console.log(id, value);
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    +getInputValue("price") + +getInputValue("delivery-charge") +
    +getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};

// buy now btn functionality
const buyProducts = () => {
  location.assign('https://www.amazon.com/');
}


// show details of products
const showDetails = (product) => {

  document.getElementById('product-details').textContent = " ";

  const div = document.createElement("div");
  div.classList.add("product-detail");

  div.innerHTML = `

      <div>
        <h3 class="single-product-title">${product.title}</h3>
      </div>

      <div>
        <p>${product.description}</p>
      </div>

      `;
  document.getElementById("product-details").appendChild(div);
}