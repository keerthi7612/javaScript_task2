export const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);
};
