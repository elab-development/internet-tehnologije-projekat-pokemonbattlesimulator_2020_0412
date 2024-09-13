import React, { useState, useEffect } from 'react';
import './ItemStore.css'; 
import { useNavigate } from 'react-router-dom';
import potionImage from '../picsforshops/potion.jpg';
import superPotionImage from '../picsforshops/superpotion.png';
import hyperPotionImage from '../picsforshops/hyperpotion.png';
import attackBoosterImage from '../picsforshops/attackbooster.jpg';
import stone1Image from '../picsforshops/stone1.png';
import stone2Image from '../picsforshops/stone2.png';
import stone3Image from '../picsforshops/stone3.png';
import stone4Image from '../picsforshops/stone4.png';
import stone5Image from '../picsforshops/stone5.png';
import stone6Image from '../picsforshops/stone6.png';
import stone7Image from '../picsforshops/stone7.png';
import stone8Image from '../picsforshops/stone8.png';
import stone9Image from '../picsforshops/stone9.png';
import stone10Image from '../picsforshops/stone10.png';
import coinsImage from '../picsforshops/coins.png'; 
import hpImage from '../picsforshops/hp.png'; 


const ItemStore = () => {
  const navigate = useNavigate();
  const [playerLevel, setPlayerLevel] = useState(3);
  const [coins, setCoins] = useState(1000);
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'potion',
    image: null,
    
  });

  const items = [
    { id: 1, name: 'Potion', description: 'Heals your Pokemon by 20 HP.', price: 100, image: potionImage, unlockLevel: 1, category: 'potion' },
    { id: 2, name: 'Super Potion', description: 'Heals your Pokemon by 50 HP.', price: 250, image: superPotionImage, unlockLevel: 1, category: 'potion' },
    { id: 3, name: 'Hyper Potion', description: 'Heals your Pokemon by 200 HP.', price: 500, image: hyperPotionImage, unlockLevel: 5, category: 'potion' },
    { id: 4, name: 'Attack Booster', description: 'Increases attack by 10% for one battle.', price: 300, image: attackBoosterImage, unlockLevel: 3, category: 'booster' },
    { id: 5, name: 'Evolutionary Stone 1', description: 'Evolves certain Pokemon.', price: 500, image: stone1Image, unlockLevel: 7, category: 'stone' },
    { id: 6, name: 'Evolutionary Stone 2', description: 'Evolves certain Pokemon.', price: 600, image: stone2Image, unlockLevel: 7, category: 'stone' },
    { id: 7, name: 'Evolutionary Stone 3', description: 'Evolves certain Pokemon.', price: 700, image: stone3Image, unlockLevel: 7, category: 'stone' },
    { id: 8, name: 'Evolutionary Stone 4', description: 'Evolves certain Pokemon.', price: 800, image: stone4Image, unlockLevel: 7, category: 'stone' },
    { id: 9, name: 'Evolutionary Stone 5', description: 'Evolves certain Pokemon.', price: 900, image: stone5Image, unlockLevel: 7, category: 'stone' },
    { id: 10, name: 'Evolutionary Stone 6', description: 'Evolves certain Pokemon.', price: 1000, image: stone6Image, unlockLevel: 7, category: 'stone' },
    { id: 11, name: 'Evolutionary Stone 7', description: 'Evolves certain Pokemon.', price: 1100, image: stone7Image, unlockLevel: 7, category: 'stone' },
    { id: 12, name: 'Evolutionary Stone 8', description: 'Evolves certain Pokemon.', price: 1200, image: stone8Image, unlockLevel: 7, category: 'stone' },
    { id: 13, name: 'Evolutionary Stone 9', description: 'Evolves certain Pokemon.', price: 1300, image: stone9Image, unlockLevel: 7, category: 'stone' },
    { id: 14, name: 'Evolutionary Stone 10', description: 'Evolves certain Pokemon.', price: 1400, image: stone10Image, unlockLevel: 7, category: 'stone' },
  ];


  const filteredItems = items.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRoles = localStorage.getItem('userRoles');
    
    if (token && userRoles) {
      try {
        const parsedRoles = JSON.parse(userRoles);
        setIsAuthenticated(true);
        setIsAdmin(parsedRoles.includes('admin'));
      } catch (error) {
        console.error('Error parsing user roles:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, [navigate]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addToCart = (item) => {
    const itemInCart = cart.find(cartItem => cartItem.id === item.id);
    if (itemInCart) {
      setCart(cart.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    setCart(cart.filter(cartItem => cartItem.id !== item.id));
  };

  const updateQuantity = (item, amount) => {
    setCart(cart.map(cartItem => 
      cartItem.id === item.id 
        ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + amount) } 
        : cartItem
    ));
  };

  const handleCheckout = () => {
    const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (coins >= totalCost) {
      setCoins(coins - totalCost);
      setInventory([...inventory, ...cart]);
      setCart([]);
      alert('Purchase successful!');
    } else {
      alert('Not enough coins to complete the purchase!');
    }
  };


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    
    if (name === 'image') {
      setNewItem({
        ...newItem,
        [name]: files[0] 
      });
    } else {
      setNewItem({
        ...newItem,
        [name]: value 
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('file', newItem.image);  
  
    try {
      
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      
      if (result.path) {
       
        const newProduct = {
          ...newItem,
          image: result.path,  
        };

        setNewItem(newProduct); 
  
        
        console.log('Product added:', newProduct);
  
        
  
      } else {
        console.error('File upload failed:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  return (
    <div className="item-store-container">
      <h1 className="item-store-title">Item Store</h1>

      
      {isAuthenticated && isAdmin && (
      <div className="add-item-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={newItem.name} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={newItem.description} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={newItem.price} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <select name="category" value={newItem.category} onChange={handleChange} required>
            <option value="potion">Potion</option>
            <option value="booster">Booster</option>
            <option value="stone">Stone</option>
          </select>
        </label>
        <label>
          Image:
          <input type="file" name="image" onChange={handleChange} required />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
      )}
      {isAuthenticated && isAdmin && (
    <div className="product-details">
  <h2>{newItem.name}</h2> 
  <p><strong>Description:</strong> {newItem.description}</p>  
  <p><strong>Price:</strong> <img src={coinsImage} style={{ width: '12px', height: '12px' }}/> {newItem.price}</p>  
  <p><strong>Category:</strong> {newItem.category}</p> 
  <img src={newItem.image} alt={newItem.name} style={{ width: '300px', height: '300px' }}  />  
</div>
    )}
      

      {isAuthenticated ? (
  <div className="coins-info">
    <p>Player Level: {playerLevel}</p>
    <p>Coins: <img src={coinsImage} alt="coins" className="coin-icon" /> {coins}</p>
    <p>HP: <img src={hpImage} alt="HP" className="hp-icon" /> 100</p>
  </div>
) : (
  <p>Please log in to view your player information.</p>
)}



      {!isAuthenticated ? (
  <p>Please log in to buy items.</p>
) : (
  <>
    <p>You can choose from:</p>
    <div className="filters">
      <button onClick={() => handleCategoryChange('all')}>All</button>
      <button onClick={() => handleCategoryChange('potion')}>Potions</button>
      <button onClick={() => handleCategoryChange('booster')}>Boosters</button>
      <button onClick={() => handleCategoryChange('stone')}>Stones</button>
    </div>
  </>
)}

<div className="item-list">
  {currentItems.map((item) => (
    <div key={item.id} className={`item-card ${item.unlockLevel <= playerLevel ? 'available' : 'locked'}`}>
      <img src={item.image} alt={item.name} className="item-image" />
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Price: <img src={coinsImage} alt="Coins" className="coin-icon" /> {item.price}</p>
      {item.unlockLevel <= playerLevel ? (
        isAuthenticated ? (
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        ) : (
          <button disabled>Please log in</button>
        )
      ) : (
        <button disabled>Locked</button>
      )}
    </div>
  ))}
</div>


{isAuthenticated && (
  <div className="pagination">
    {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => (
      <button
        key={i}
        onClick={() => handlePageChange(i + 1)}
        className={currentPage === i + 1 ? 'active' : ''}
      >
        {i + 1}
      </button>
    ))}
  </div>
)}


<div className="cart">
  <h2>Your Cart</h2>
  {isAuthenticated ? (
    <ul>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <li key={index}>
            {item.name} - <img src={coinsImage} alt="Coins" className="coin-icon" /> {item.price} (x{item.quantity})
            <button onClick={() => updateQuantity(item, 1)}>+</button>
            <button onClick={() => updateQuantity(item, -1)}>-</button>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))
      ) : (
        <p>Cart is empty</p>
      )}
    </ul>
  ) : (
    <p>Please log in to view your cart</p>
  )}
  {isAuthenticated && cart.length > 0 && <button onClick={handleCheckout}>Checkout</button>}
</div>


      <div className="inventory">
        <h2>Your Inventory</h2>
        <div className="inventory-grid">
          {inventory.length > 0 ? (
            inventory.map((item, index) => (
              <div key={index} className={`inventory-item ${item.unlockLevel > playerLevel ? 'not-available' : ''}`}>
                <img src={item.image} alt={item.name} className="inventory-image" />
                <p>{item.name} (x{item.quantity})</p>
                {item.unlockLevel > playerLevel && <p className="not-available-text">Not Available</p>}
              </div>
            ))
          ) : (
            <p className="inventory-message">No items in inventory</p>
          )}
        </div>
      </div>
    </div>

  );
};

export default ItemStore;
