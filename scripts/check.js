import { cart, removefromCart , CartCount , addtocart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { DeliveryOption } from '../data/DeliveryOption.js';

dayjs();

let parenthtml = "";
cart.forEach((cartItem) => {
  let productItem;
  products.forEach((product) => {
    if (cartItem.productId === product.id) {
      productItem = product;
    }
  });
  parenthtml += `
      <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
            <div class="delivery-date-${productItem.id}">
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${productItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${productItem.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(productItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label-${productItem.id}">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary
                  js-update-link"
                  data-product-Id=${productItem.id}>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                  js-delete-link"
                  data-product-Id=${productItem.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options js-delivery-options
              " data-product-Id=${productItem.id}>
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

              </div>
            </div>
      </div>
    `;
});

document.querySelector(".order-summary").innerHTML = parenthtml;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const ele = document.querySelector(`.js-cart-item-container-${productId}`)
    removefromCart(productId);
    ele.remove();
  });
});

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const productQuantity = document.querySelector(`.quantity-label-${productId}`);
    
    if (link.innerHTML.trim() === 'Update') {
      link.innerHTML = 'Save';
      productQuantity.innerHTML = `
        <input type="number" 
          maxlength="2" 
          class="w-16 p-1 text-center text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="00"
          min="0" 
          max="99">
      `;
    } else {
      link.innerHTML = 'Update';
      const input = productQuantity.querySelector('input');
      const newQuantity = input.value;
      productQuantity.innerHTML = newQuantity;
      addtocart(productId,newQuantity);
    }

    console.log(cart);
  });
});

document.querySelector('.return-to-home-link').innerHTML = `${CartCount} items`


document.querySelectorAll('.js-delivery-options').forEach((element) => {

  const productId = element.dataset.productId;
  let html = '';
  DeliveryOption.forEach((DeliveryItem) => {
    const today = dayjs();
    const DeliveryDate = today.add(DeliveryItem.DeliveryDays, 'days');
    const datestring = DeliveryDate.format('dddd MMMM D');
    const pricestring = DeliveryItem.PriceCents === 0 ? 'FREE' : formatCurrency(DeliveryItem.PriceCents);
    
    html += `<div class="delivery-option">
          <input type="radio" checked
          class="delivery-option-input js-delivery-option-input"
          name="delivery-option-${productId}">
          <div>
          <div class="delivery-option-date">
          ${datestring}
          </div>
          <div class="delivery-option-price">
          ${pricestring}
          </div>
          </div>
        </div>`;
  });
  const selectedOption = document.querySelector('.js-delivery-option-input:checked');
  const selectedOptionValue = selectedOption ? selectedOption.value : null;
  document.querySelector(`.delivery-date-${productId}`).innerHTML = `Delivery Date: ${selectedOptionValue}`;
  element.innerHTML += html;
});
