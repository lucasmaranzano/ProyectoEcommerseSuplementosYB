import React, { useState, useContext } from "react";
import ItemQuantitySelector from "./ItemQuantitySelector";
import AddItemButton from "./AddItemButton";
import { CartContext } from "./context/CartContext";
import formatPrice from "./Utils/FormatPrice";
import { useNavigate } from "react-router-dom";

// componente ItemDetail que muestra la información detallada del producto
function ItemDetail({ product }) {
  // definimos el estado de la cantidad de productos en el carrito
  const [cartQuantity, setCartQuantity] = useState(0);

  // obtenemos la función addToCart del contexto del carrito
  const { addToCart } = useContext(CartContext);

  // función de navegacion de la biblioteca react router
  const navigate = useNavigate();

  // funcion para agregar el producto al carrito con la cantidad seleccionada
  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      quantity: cartQuantity,
    };
    addToCart(itemToAdd);
    setCartQuantity(0);
  };

  // estructura del componente ItemDetail
  return (
    <div className="card mt-5 mx-auto shadow" style={{ maxWidth: "800px" }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center">
          <img
            src={
              product.IMG
                ? product.IMG
                : "https://firebasestorage.googleapis.com/v0/b/suplementosyb-a73e2.appspot.com/o/Imagen_no_disponible.svg.png?alt=media&token=f37fdb42-281f-4590-a76c-1ec9de70281e"
            }
            alt={product.Producto}
            className="card-img-top"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title text-center text-bg-info">
              {product.Producto}
            </h5>
            <p className="card-text">{product.Descripcion}</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Categoria: </strong> {product.Categoria}
              </li>
              <li className="list-group-item">
                <strong>Origen: </strong> {product.Origen}
              </li>
              <li className="list-group-item">
                <strong>Precio: </strong> {formatPrice(product.Precio)}
              </li>
            </ul>
            <ItemQuantitySelector
              quantity={cartQuantity}
              setQuantity={setCartQuantity}
            />
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => navigate(-1)}
              >
                Volver
              </button>
              <AddItemButton
                onClick={handleAddToCart}
                disabled={product.Precio === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// exportamos el componente ItemDetail como por defecto
export default ItemDetail;
