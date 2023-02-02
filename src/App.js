import './App.css';
import { Card } from './components/Card';
import { useState, useEffect, useMemo } from 'react';

function App() {

  const [products, setProducts] = useState()
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const fetchData = async () => {
    const response = await fetch(`https://dummyjson.com/products`)
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return data
    }
  }

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  useEffect(() => {   
    fetchData()
    .then(data => {setProducts(data.products)})
    setLoading(false)
  },[])

  function getFilteredList() {
    let ordered = [];
    if (selectedCategory === "all") {
      return products;
    }
    if(selectedCategory === "price"){
      ordered = products.sort((a, b) => (a.price > b.price) ? 1 : -1);
      return ordered
    }else if(selectedCategory === "title"){
      ordered = products.sort((a, b) => (a.title > b.title) ? 1 : -1)
      return ordered;
    }else if(selectedCategory === "rating"){
       ordered = products.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
      return ordered
    }

  }

  var filteredList = useMemo(getFilteredList, [selectedCategory, products]);


  
  return (
    
    <div className="App">
      {loading && <p>Loading...</p>}
      <div className="filter-area">
        <div>Filter by Category:</div>
        <div>
            <select
                name="category-list"
                id="category-list"
                onChange={handleCategoryChange}
            >
                <option value="all">All</option>
                <option value="price">By price</option>
                <option value="rating">By rating</option>
                <option value="title">By title</option>
            </select>
        </div>
      </div>
      <div className="container">
        {filteredList &&
          filteredList.map((product) => {
            return(
              <Card key={product.id} product={product}/>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
