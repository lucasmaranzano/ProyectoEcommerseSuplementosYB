import React from "react";
import { Link } from "react-router-dom";
import formatPrice from "./Utils/FormatPrice";

// recibe como prop un array de productos y renderiza una lista de tarjetas correspondientes a cada producto 
function ItemList({ products }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {products.map((product) => (
        <div key={product.id} className="col">
          <div className="card h-100 shadow card-custom">
            <div className="position-absolute top-0 end-0 m-3">
              <span className="badge bg-success rounded-pill fs-6">
                {product.Precio === 0
                  ? formatPrice(product.Precio)
                  : `${formatPrice(product.Precio)}`}
              </span>
            </div>
            <img
              src={
                product.IMG
                  ? product.IMG
                  : "https://firebasestorage.googleapis.com/v0/b/suplementosyb-a73e2.appspot.com/o/Imagen_no_disponible.svg.png?alt=media&token=f37fdb42-281f-4590-a76c-1ec9de70281e"
              }
              alt={product.Producto}
              className="card-img-top custom-img"
            />
            <div className="card-body">
              <h5 className="card-title text-center">{product.Producto}</h5>
              <h6 className="card-subtitle mb-2 text-center text-muted">
                {product.Categoria}
              </h6>
              <div className="d-flex justify-content-center">
                <Link to={`/item/${product.id}`} className="btn btn-primary">
                  Ver Detalle
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
