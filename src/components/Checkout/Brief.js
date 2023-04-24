import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ItemQuantitySelector from "../ItemQuantitySelector";
import formatPrice from "../Utils/FormatPrice";
import { Link } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

// componente Brief que muestra un resumen del carrito
function Brief() {
  const { cart, setCart, clearCart } = useContext(CartContext);

  // función para manejar los cambios en la cantidad de un item en el carrito
  const handleQuantityChange = (item, quantity) => {
    if (quantity === 0) {
      const updatedCart = cart.filter((i) => i.id !== item.id);
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart];
      const itemIndex = updatedCart.findIndex((i) => i.id === item.id);
      if (itemIndex !== -1) {
        updatedCart[itemIndex].quantity = quantity;
        setCart(updatedCart);
      }
    }
  };

  // calcular el total del carrito
  const total = cart.reduce((sum, item) => {
    return sum + item.Precio * item.quantity;
  }, 0);

  // estructura del componente Brief
  return (
    <div className="container my-5">
      <h1 className="mb-5">Resumen del carrito:</h1>
      {cart.length === 0 ? (
        <p className="alert alert-danger text-center" role="alert">
          No hay productos en el carrito
        </p>
      ) : (
        <>
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th className="text-center">Producto</th>
                <th className="text-center">Precio unitario</th>
                <th className="text-center">Cantidad</th>
                <th className="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="align-middle">
                    <img
                      src={
                        item.IMG
                          ? item.IMG
                          : "https://firebasestorage.googleapis.com/v0/b/suplementosyb-a73e2.appspot.com/o/Imagen_no_disponible.svg.png?alt=media&token=f37fdb42-281f-4590-a76c-1ec9de70281e"
                      }
                      alt={item.Producto}
                      width={50}
                      height={50}
                      className="me-3"
                    />
                    <Link
                      to={`/item/${item.id}`}
                      className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    >
                      {item.Producto}
                    </Link>
                  </td>

                  <td className="text-center align-middle">
                    {item.Precio === 0
                      ? formatPrice(item.Precio)
                      : `${formatPrice(item.Precio)}`}
                  </td>

                  <td className="text-center align-middle itemquantitycustom">
                    <ItemQuantitySelector
                      quantity={item.quantity}
                      setQuantity={(quantity) =>
                        handleQuantityChange(item, quantity)
                      }
                    />
                  </td>
                  <td className="text-center align-middle">
                    {item.Precio === 0
                      ? formatPrice(0)
                      : `${formatPrice(
                          Math.round(item.Precio * item.quantity)
                        )}`}
                  </td>
                </tr>
              ))}
              <tr className="table-active">
                <td colSpan="3" className="text-end">
                  Total:
                </td>
                <td className="text-center align-middle">
                  {formatPrice(Math.round(total))}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-outline-danger me-2" onClick={clearCart}>
              Vaciar carrito
            </button>
            <CheckoutForm cart={cart} clearCart={clearCart} />
          </div>
        </>
      )}
    </div>
  );
}

export default Brief;
