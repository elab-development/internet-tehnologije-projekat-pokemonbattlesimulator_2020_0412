import React, { useState } from 'react';
import './ItemStore.css';
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
import coinsImage from '../picsforshops/coins.png'; // Dodaj ovu sliku
import hpImage from '../picsforshops/hp.png'; // Dodaj ovu sliku

const ItemStore = () => {
  const [playerLevel, setPlayerLevel] = useState(3);
  const [coins, setCoins] = useState(1000);
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);

  const items = [
    { id: 1, name: 'Potion', description: 'Heals your Pokemon by 20 HP.', price: 100, image: potionImage, unlockLevel: 1 },
    { id: 2, name: 'Super Potion', description: 'Heals your Pokemon by 50 HP.', price: 250, image: superPotionImage, unlockLevel: 1 },
    { id: 3, name: 'Hyper Potion', description: 'Heals your Pokemon by 200 HP.', price: 500, image: hyperPotionImage, unlockLevel: 5 },
    { id: 4, name: 'Attack Booster', description: 'Increases attack by 10% for one battle.', price: 300, image: attackBoosterImage, unlockLevel: 3 },
    { id: 5, name: 'Evolutionary Stone 1', description: 'Evolves certain Pokemon.', price: 500, image: stone1Image, unlockLevel: 7 },
    { id: 6, name: 'Evolutionary Stone 2', description: 'Evolves certain Pokemon.', price: 600, image: stone2Image, unlockLevel: 7 },
    { id: 7, name: 'Evolutionary Stone 3', description: 'Evolves certain Pokemon.', price: 700, image: stone3Image, unlockLevel: 7 },
    { id: 8, name: 'Evolutionary Stone 4', description: 'Evolves certain Pokemon.', price: 800, image: stone4Image, unlockLevel: 7 },
    { id: 9, name: 'Evolutionary Stone 5', description: 'Evolves certain Pokemon.', price: 900, image: stone5Image, unlockLevel: 7 },
    { id: 10, name: 'Evolutionary Stone 6', description: 'Evolves certain Pokemon.', price: 1000, image: stone6Image, unlockLevel: 7 },
    { id: 11, name: 'Evolutionary Stone 7', description: 'Evolves certain Pokemon.', price: 1100, image: stone7Image, unlockLevel: 7 },
    { id: 12, name: 'Evolutionary Stone 8', description: 'Evolves certain Pokemon.', price: 1200, image: stone8Image, unlockLevel: 7 },
    { id: 13, name: 'Evolutionary Stone 9', description: 'Evolves certain Pokemon.', price: 1300, image: stone9Image, unlockLevel: 7 },
    { id: 14, name: 'Evolutionary Stone 10', description: 'Evolves certain Pokemon.', price: 1400, image: stone10Image, unlockLevel: 7 },
  ];

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

  return (
    <div className="item-store-container">
      <h1 className="item-store-title">Item Store</h1>
      <div className="coins-info">
        <p>Player Level: {playerLevel}</p>
        <p>Coins: <img src={coinsImage} alt="coins" className="coin-icon" /> {coins}</p>
        <p>HP: <img src={hpImage} alt="HP" className="hp-icon" /> 100</p>
      </div>

      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className={`item-card ${item.unlockLevel <= playerLevel ? 'available' : 'locked'}`}>
            <img src={item.image} alt={item.name} className="item-image" />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: <img src={coinsImage} alt="Coins" className="coin-icon" /> {item.price}</p>
            {item.unlockLevel <= playerLevel ? (
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            ) : (
              <p className="locked-item">Unlocks at level {item.unlockLevel}</p>
            )}
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Your Cart</h2>
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
        {cart.length > 0 && <button onClick={handleCheckout}>Checkout</button>}
      </div>

      <div className="inventory">
        <h2>Your Inventory</h2>
        <div className="inventory-grid">
          {inventory.length > 0 ? (
            inventory.map((item, index) => (
              <div key={index} className="inventory-item">
                <img src={item.image} alt={item.name} className="inventory-image" />
                <p>{item.name} (x{item.quantity})</p>
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
