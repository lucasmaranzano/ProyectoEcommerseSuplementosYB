import React, { useState, useEffect } from "react";
import { db, collection } from "../firebaseConfig";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ItemDetail from "./ItemDetail";
import { doc, getDoc } from "firebase/firestore";

function ItemDetailContainer() {
  // estados para manejar la carga del producto y el posible error de que no se encuentre
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  // obtiene el parametro de la URL de react router
  const { id } = useParams();

  useEffect(() => {
    // referencia a la coleccion "productos" en Firestore
    const productsRef = collection(db, "productos");
    // documento de Firestore del producto correspondiente al id obtenido de la URL
    const productDoc = doc(productsRef, id);
    // obtiene los datos del documento de Firestore del producto correspondiente al id obtenido de la URL
    getDoc(productDoc).then((docSnap) => {
      if (docSnap.exists()) {
        setProduct({
          id: docSnap.id,
          ...docSnap.data(),
        });
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [id]);

  // renderizado condicional del componente segun el estado de carga del producto
  return (
    <div className="container">
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="success" role="status"></Spinner>
        </div>
      ) : notFound ? (
        <div className="d-flex justify-content-center mt-5">
          <h3>PRODUCTO NO ENCONTRADO</h3>
        </div>
      ) : (
        // si el producto existe, renderiza el componente ItemDetail con el producto como prop
        product && <ItemDetail product={product} />
      )}
    </div>
  );
}

export default ItemDetailContainer;