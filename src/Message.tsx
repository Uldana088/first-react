// import React from "react";

// const ProductCard = ({ name, price, category }) => {
//   return (
//     <div className="border p-4 rounded-lg shadow-md">
//       <h3 className="text-lg font-bold">{name}</h3>
//       <p>Бағасы: {price} тг</p>
//       <small>Санат: {category}</small>
//     </div>
//   );
// };

// const App = () => {
//   const products = [
//     { id: 1, name: "Ноутбук", price: 300000, category: "Электроника" },
//     { id: 2, name: "Кітап", price: 5000, category: "Әдебиет" },
//     { id: 3, name: "Кроссовки", price: 25000, category: "Спорт" },
//     { id: 4, name: "Телефон", price: 150000, category: "Электроника" },
//   ];

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {products.map((product) => (
//         <ProductCard key={product.id} {...product} />
//       ))}
//     </div>
//   );
// };

// export default App;

// import React, {useState} from "react"

// function App(){
//   const [count, setCount] = useState(10);

//   function add(){
//     setCount(count-1);
//   }

//   return (
//     <div>
//     <h1>{count}</h1>
//     <button onClick={add}>-</button>
//     </div>
//   )
// }

// export default App;


