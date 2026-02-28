import Cart from "../model/Cart.js";
import Product from "../model/Product.js";

// ➕ Add to cart
export const addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ productId, quantity }],
    });
    return cart;
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  return cart;
};

// 📄 Get cart
export const getCart = async (userId) => {
  return await Cart.findOne({ userId }).populate("items.productId");
};

// ❌ Remove item
export const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId,
  );

  await cart.save();
  return cart;
};

// 🧹 Clear cart
export const clearCart = async (userId) => {
  await Cart.updateOne({ userId }, { items: [] });
};
