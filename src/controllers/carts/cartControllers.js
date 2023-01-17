const Cart = require ("/Users/admin/Desktop/Workspaces/Term-3/ecommerce-backend/src/models/cart.js")


async function getCarts() {
  //get all the carts from the database
  const carts = await Cart.find()
  return carts
}

async function getCartById(cartId) {
  //get the cart from the database with id 'cartId'
  const cart = await Cart.findById(cartId)
  return cart
}

async function getCartByUserId(userId) {
  //get the cart from the database with user id 'userId'
  const cartByUserId = await Cart.findOne({ user_id: userId })
  return cartByUserId
}

async function getCartByUserIdWithProductInfo(userId) {
  const cartByUserIdWithProductInfo = await Cart.findOne({
    user_id: userId,
  }).populate({path: "products.product"})
  return cartByUserIdWithProductInfo
}

module.exports = {
  getCarts,
  getCartById,
  getCartByUserId,
  getCartByUserIdWithProductInfo,
}