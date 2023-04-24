import React from "react";

// componente para el boton de agregar item al carrito
function AddItemButton({ onClick, disabled }) {
  // retornamos el boton con sus propiedades y clases css
  return (
    <button className="btn btn-outline-primary" onClick={onClick} disabled={disabled}>
      Agregar al carrito
    </button>
  );
}

export default AddItemButton;