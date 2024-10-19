 export const cart = [{
  productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity : 1
},{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 1
},{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 1
}
];

export function addtocart(productId) {
  let isAvailable;
  cart.forEach((item) => {
    if (item.productId === productId) {
      isAvailable = item;
    }
  });
  if (isAvailable) {
    isAvailable.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1,
    });
  }
}