import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import "./ItemListContainer.css";
import { Spinner } from "react-bootstrap";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// componente principal del contenedor de la lista de productos
function ItemListContainer() {
  // estado para almacenar los productos
  const [products, setProducts] = useState([]);

  // estado para controlar la carga de datos
  const [loading, setLoading] = useState(true);

  // estado para controlar si no se encuentra una categoria
  const [categoryNotFound, setCategoryNotFound] = useState(false);

  // obtener parametro de categoria de la url
  const { category } = useParams();

  useEffect(() => {
    // reiniciar estados antes de buscar productos
    setLoading(true);
    setCategoryNotFound(false);
    // referencia a la coleccion de productos en firebase
    const productsCollection = collection(db, "productos");

    // funcion para manejar el resultado de la consulta
    const handleQuerySnapshot = (querySnapshot) => {
      // filtrar los productos segun la categoria y almacenarlos en el estado
      const data = querySnapshot.docs
        .map((doc) => {
          if (!category || doc.data().Categoria === category) {
            return {
              id: doc.id,
              ...doc.data(),
            };
          } else {
            return null;
          }
        })
        .filter((doc) => doc !== null);

      // si no se encuentran productos en la categoria
      if (category && data.length === 0) {
        setCategoryNotFound(true);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    // funcion para manejar errores en la consulta
    const handleError = (error) => {
      console.log("Error al obtener los productos: ", error);
      setLoading(false);
    };

    // obtener productos de la coleccion
    getDocs(productsCollection).then(handleQuerySnapshot).catch(handleError);
  }, [category]);

  // renderizar el componente
  return (
    <div className="container">
      <h1 className="h3 mb-3 fw-normal text-center m-3">
        {categoryNotFound
          ? "CATEGORIA NO ENCONTRADA"
          : category
          ? category.toUpperCase()
          : "BIENVENIDO A NUESTRO CATALOGO"}
      </h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
}

export default ItemListContainer;
