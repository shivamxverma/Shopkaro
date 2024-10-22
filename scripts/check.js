import { cart, removefromCart , CartCount , addtocart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { DeliveryOption } from '../data/DeliveryOption.js';

import '../backend/backend_practice.js'

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let parenthtml = "";
cart.forEach((cartItem) => {
  let productItem;
  products.forEach((product) => {
    if (cartItem.productId === product.id) {
      productItem = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  DeliveryOption.forEach((option) => {
   if (option.id === deliveryOptionId) 
    deliveryOption = option;
  });

  const today = dayjs();
  const DeliveryDate = deliveryOption ? today.add(deliveryOption.DeliveryDays, 'days') : today;
  const datestring = DeliveryDate.format('dddd MMMM D');
  parenthtml += `
      <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
            <div class="delivery-date">
            Delivery Date : 
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
              "data-product-Id=${productItem.id}>
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                 ${DeliveryOptionHtml(productItem,cartItem)}
              </div>
            </div>
      </div>
    `;
});

document.querySelector(".order-summary").innerHTML = parenthtml;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const ele = document.querySelector(`.js-cart-item-container-${productId}`);
    ele.remove();
    removefromCart(productId);
  });
});

// Update Button in Checkout.js

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
      const inputElement = document.querySelector(`#update-input-value-${productId}`);
      const newValue = inputElement.value;
      // console.log(newValue);
      link.innerHTML = 'Update';
    }
  });
});

document.querySelector('.return-to-home-link').innerHTML = `${CartCount} items`


function DeliveryOptionHtml(productItem,cartItem) {
    let CartSummary = '';
    DeliveryOption.forEach((DeliveryItem) => {
      const today = dayjs();
      const DeliveryDate = today.add(DeliveryItem.DeliveryDays, 'days');
      const datestring = DeliveryDate.format('dddd MMMM D');
      const pricestring = DeliveryItem.PriceCents === 0 ? 'FREE' : `$${formatCurrency(DeliveryItem.PriceCents)} -`;


      const isChecked = (DeliveryOption.id === cartItem.DeliveryOptionid);
      CartSummary += `<div class="delivery-option js-delivery-option"
      data-product-id="${cartItem.productId}"
      data-delivery-option-id="${DeliveryOption.id}">
            <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option-input"
            name="delivery-option-${productItem.id}">
            <div>
            <div class="delivery-option-date">
            ${datestring}
            </div>
            <div class="delivery-option-price">
            ${pricestring} Shipping
            </div>
            </div>
          </div>`;
    });
    return CartSummary;
}

document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
      })
  })
  

