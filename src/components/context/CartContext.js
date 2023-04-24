import React, { createContext, useState, useEffect } from 'react';

// creamos el contexto del carrito
export const CartContext = createContext();

// componente cartprovider para proporcionar funciones y estado del carrito
export const CartProvider = ({ children }) => {
  // manejamos el estado del carrito y obtenemos los datos guardados en localstorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // guardamos el carrito en localstorage cuando se actualiza
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // funcion para agregar un item al carrito
  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, item]);
    }
  };

  // funcion para eliminar un item del carrito
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  // funcion para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // devolvemos el provider con las funciones y el estado del carrito
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
