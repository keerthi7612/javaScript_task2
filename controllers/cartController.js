import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../services/cartService.js";

// ➕ Add to cart
export const addToCartController = async (req, res) => {
  try {
    const cart = await addToCart(
      req.user.id,
      req.body.productId,
      req.body.quantity,
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📄 Get cart
export const getCartController = async (req, res) => {
  const cart = await getCart(req.user.id);
  res.json(cart);
};

// ❌ Remove item
export const removeItemController = async (req, res) => {
  const cart = await removeFromCart(req.user.id, req.params.productId);
  res.json(cart);
};

// 🧹 Clear cart
export const clearCartController = async (req, res) => {
  await clearCart(req.user.id);
  res.json({ message: "Cart cleared" });
};
