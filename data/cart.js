export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 1,
  DeliveryOptionid: '1',
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 2,
  DeliveryOptionid: '2',
}, {
  productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  quantity: 3,
  DeliveryOptionid: '3',
}];

export let CartCount = parseInt(localStorage.getItem('CartCount')) || 0;

function SaveCartCount() {
  localStorage.setItem('CartCount', CartCount.toString());
}

function SaveData() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartQuantity() {
  CartCount = 0;
  cart.forEach((item) => {
    CartCount += item.quantity;
  });
  SaveCartCount();

  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = CartCount;
  }
}

export function addtocart(productId) {
  const selectQuantity = document.querySelector(`.js-product-quantity-container-${productId}`);
  const Quantity = parseInt(selectQuantity.value);
  let isAvailable = cart.find((item) => item.productId === productId);
  if (isAvailable) {
    isAvailable.quantity += Quantity;
  } else {
    cart.push({ productId, quantity: Quantity , DeliveryOptionid: '1'});
  }
  SaveData();
  updateCartQuantity();
}

export function removefromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  SaveData();
  updateCartQuantity();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.DeliveryOptionid = deliveryOptionId;
    SaveData();
  }
}
