const CART_PRODUCTS_LABEL = "cart-products";

const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=9");
  const products = await response.json();
  return products;
};

const renderProducts = async () => {
  const products = await getProducts();
  const container = document.querySelector(".products-container");
  // cart Buttons
  const openCart = document.querySelector(".cart-button");
const closeBtn = document.querySelector(".clouse-cart");
const deleteAllProducts = document.querySelector(".remove-all-products")
// nav buttons
const openNavMenu = document.querySelector(".nav-title");
const closeNavMenu = document.querySelector(".close-nav");
  for (const item of products) {
    // creating elements
    const productWrapper = document.createElement("li");
    const productImg = document.createElement("img");
    const productTitle = document.createElement("h4");
    const productDescription = document.createElement("p");
    const productPriceSection = document.createElement("section");
    const productPrice = document.createElement("span");
    const productBuyBtn = document.createElement("button");
    // setting values for elements
    productWrapper.classList.add("product-item");
    productPriceSection.classList.add("product-item-price");
    productImg.src = item.image;
    productTitle.innerText = item.title;
    productDescription.innerText = item.description;
    productPrice.innerText = `${item.price}$`;
    productBuyBtn.innerText = "Add to cart";
    productBuyBtn.addEventListener("click", () => addToCart(item));
    // appending elements inside the wrappers
    productPriceSection.append(productPrice, productBuyBtn);
    productWrapper.append(
      productImg,
      productTitle,
      productDescription,
      productPriceSection
    );
    container.append(productWrapper);
  }

  // cart buttons event listeners
  openCart.onclick = (event) => {
    openCartBtn(event);
  }
  closeBtn.onclick = (event) => {
    closeCart(event);
  }
  deleteAllProducts.onclick = (event) => {
    removeAllProductsFromCart(event);
  }
  // nav menu event listeners
  openNavMenu.onclick = (event) => {
    openingNav(event);
  }
  closeNavMenu.onclick = (event) => {
    closingNav(event);
  } 
  renderInitialCart();
};

const getCartTotal = (product) => {
  const totalAmount = document.querySelector(".total-amount > span");
  const cartItems = document.getElementsByClassName("cart-list-item");
  let total = 0;
  for (const item of cartItems) {
    const price = item.querySelector(".cart-list-price-section > span");
    const quantity = item.querySelector(".cart-list-quantity-section > input");
    const currentAmount = parseFloat(price.innerText) * quantity.value;
    total += currentAmount;
  }
  totalAmount.innerText = `${total.toFixed(2)}$`;
  localStorage.setItem("total", total.toFixed(2));
  saveProduct(product);
};

const removeProductFromCart = (event, product) => {
  event.target.parentElement.parentElement.remove();
  const cartListItems = document.getElementsByClassName("cart-list-item");
  if (!cartListItems.length) {
    const cartListWrapper = document.querySelector(".cart-list-wrapper ");
    const emptyCartTitle = document.querySelector(".cart-empty-title");
    cartListWrapper.style.display = "none";
    emptyCartTitle.style.display = "block";
    localStorage.clear();
    quantityItemInCart();
    return;
  }
  const currentCartProducts = getCurrentCartItems();
  const filteredArr = currentCartProducts.filter(
    (item) => item.id !== product.id
  );
  setCurrentCartItems(filteredArr);
  getCartTotal();
  quantityItemInCart();
};

const removeAllProductsFromCart = (event) => {
const cartList = document.querySelector(".cart-list");

while (cartList.firstChild) {
  cartList.removeChild(cartList.firstChild);
}

if (!cartList.length) {
  const cartListWrapper = document.querySelector(".cart-list-wrapper ");
  const emptyCartTitle = document.querySelector(".cart-empty-title");
  cartListWrapper.style.display = "none";
  emptyCartTitle.style.display = "block";
}

localStorage.clear();

getCartTotal();
quantityItemInCart();
}

const addToCart = (product) => {
  const cartItems = document.getElementsByClassName("cart-list-item");
  const cartListWrapper = document.querySelector(".cart-list-wrapper");
  cartListWrapper.style.display = "block";
  for (const item of cartItems) {
    if (product.id === +item.getAttribute("id")) {
      const quantityInput = item.querySelector(
        ".cart-list-quantity-section > input"
      );
      quantityInput.value++;
      getCartTotal(product);
      return;
    }
  }
  renderCartItem(product);
  getCartTotal(product);
  quantityItemInCart();
};

const openingNav = (event) => {
const navItems = document.querySelectorAll(".nav-item");
const navAim = document.querySelector(".nav-animated-element");
navItems.forEach((item) => {
  item.classList.remove("display-none");
});
navAim.classList.add("animation");
}

const closingNav = (event) => {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.classList.add("display-none");
  })
  const navAim = document.querySelector(".nav-animated-element");
  navAim.classList.remove("animation");
}

const openCartBtn = (event) => {
  const cartList = document.querySelector(".cart");
  const cartListWrapper = document.querySelector(".cart-list-wrapper");
  cartListWrapper.style.display = "block";
  cartList.style.display = "block";
  cartList.classList.add("display-block");
  cartList.classList.remove("display-none");

  const cartListItems = document.getElementsByClassName("cart-list-item");
  if (!cartListItems.length) {
    const cartListWrapper = document.querySelector(".cart-list-wrapper ");
    const emptyCartTitle = document.querySelector(".cart-empty-title");
    cartListWrapper.style.display = "none";
    emptyCartTitle.style.display = "block";
    return;
  }
}

const closeCart = (event) => {
  const cartListWrapper = document.querySelector(".cart");
  cartListWrapper.style.display = "none";
  cartListWrapper.classList.add("display-none");
  cartListWrapper.classList.remove("display-block");
}

const quantityItemInCart = () => {
  const cart = document.querySelector(".cart-list");
  const numberCartItems = document.querySelector(".items-in-cart");
  const arrayCart = Array.from(cart.children);

  numberCartItems.textContent = arrayCart.length;
}

const renderCartItem = (product, inputNumber) => {
  const cart = document.querySelector(".cart-list");
  const cartEmpty = document.querySelector(".cart-empty-title");
  
  // creating elements
  const cartListItem = document.createElement("li");
  const cartListImgSection = document.createElement("section");
  const cartListPriceSection = document.createElement("section");
  const cartListQuantitySection = document.createElement("section");
  const image = document.createElement("img");
  const title = document.createElement("h4");
  const price = document.createElement("span");
  const quantity = document.createElement("input");
  const removeBtn = document.createElement("button");

  quantity.addEventListener("change", () => getCartTotal(product));
  removeBtn.addEventListener("click", (event) =>
    removeProductFromCart(event, product)
  );
  
  // setting values
  cartListItem.classList.add("cart-list-item");
  cartListImgSection.classList.add(
    "cart-list-item-section",
    "cart-list-img-section"
  );
  cartListPriceSection.classList.add(
    "cart-list-item-section",
    "cart-list-price-section"
  );
  cartListQuantitySection.classList.add(
    "cart-list-item-section",
    "cart-list-quantity-section"
  );
  image.src = product.image;
  title.innerText = product.title;
  price.innerText = `${product.price}$`;
  quantity.type = "number";
  quantity.value = inputNumber || 1;
  quantity.min = 1;
  removeBtn.innerText = "REMOVE";
  // openCart.style.display = "block";
  cartEmpty.style.display = "none";
  // appending values
  cartListImgSection.append(image, title);
  cartListPriceSection.appendChild(price);
  cartListQuantitySection.append(quantity, removeBtn);
  cartListItem.setAttribute("id", product.id);
  cartListItem.append(
    cartListImgSection,
    cartListPriceSection,
    cartListQuantitySection
  );
  cart.appendChild(cartListItem);
};

const renderInitialCart = () => {
  const currentCartProducts = getCurrentCartItems();
  if (!currentCartProducts.length) {
    return;
  }
  currentCartProducts.forEach((item) => renderCartItem(item, item.amount));
  getCartTotal();
  quantityItemInCart();
};

const saveProduct = (product) => {
  if (!product) {
    return;
  }
  const currentCartProducts = getCurrentCartItems();
  const productInCart = currentCartProducts.findIndex(
    (item) => item.id === product.id
  );
  if (productInCart > -1) {
    product.amount++;
    currentCartProducts.splice(productInCart, 1, product);
  } else {
    product.amount = 1;
    currentCartProducts.push(product);
  }
  setCurrentCartItems(currentCartProducts);
};

const getCurrentCartItems = () => 
  JSON.parse(localStorage.getItem(CART_PRODUCTS_LABEL)) || [];


const setCurrentCartItems = (products) => {
  localStorage.setItem(CART_PRODUCTS_LABEL, JSON.stringify(products));
};

renderProducts();