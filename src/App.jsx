import React from "react"
import  { createContext, useContext, useReducer } from "react"
import "./App.css"

const CartContext = createContext()

const initialState = { cart: [] }
const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        cart: 
        [...state.cart, 
          action.payload
        ],
      }
    case "REMOVE_ITEM":
      const index = state.cart.findIndex((item) => item.id === action.payload)
      if (index > -1) {
        const newCart = [...state.cart]
        newCart.splice(index, 1)
        return { ...state, cart: newCart }
      }
      return state;
    case "CLEAR_CART":
      return {
        ...state,
         cart: [] 
        }
    default:
      return state
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

const products = [
  { id: 0, name: "Футболка", price: 8000 },
  { id: 1, name: "Куртка", price: 20000 },
  { id: 2, name: "Suit", price: 50000 },
  { id: 3, name: "Maika", price: 2000 },
  { id: 4, name: "Top", price: 5500 },
];

const ProductList = () => {
  const { dispatch } = useCart()

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>
              {product.name} - {product.price}T
            </span>
            <button
              onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}> Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
const Cart = () => {
  const { state, dispatch } = useCart()
  const { cart } = state

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} - {item.price}T
                </span>
                <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })} > Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total: {total}T</strong>
            <button onClick={() => dispatch({ type: "CLEAR_CART" })}> Clear Cart</button>
          </div>
        </>
      )}
    </div>
  )
}
const App = () => {
  return (
    <CartProvider>
      <div>
        <h1>Online shop</h1>
        <div>
          <ProductList />
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
};

export default App;
