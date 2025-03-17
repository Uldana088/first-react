import { useState, useEffect } from "react";

const Products = ["phone", "laptop", "AirPods", "Cosmetics", "clock", "plansched"];

const App = () => {
  const [SongyQaralgandar, setSongyQaralgandar] = useState([]);

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem("SongyQaralgandar")) || [];
    setSongyQaralgandar(localProducts);
  }, []);

  const handleproduct = (product) => {
    setSongyQaralgandar((prev) => {
      const newLists = [product, ...prev.filter((item) => item !== product)];
      localStorage.setItem("SongyQaralgandar", JSON.stringify(newLists));
      return newLists;
    });
  };

  return (
    <div>
      <h1>Menu products</h1>
      <div>
        {Products.map((product) => (
          <button key={product} onClick={() => handleproduct(product)}>
            {product}
          </button>
        ))}

        <h2>Songy Qaralgandar</h2>
        <ul>
          {SongyQaralgandar.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
