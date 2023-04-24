// funcion para formatear el precio
function formatPrice(price) {
  // si el precio es igual a 0, retornamos un mensaje indicando que no hay stock
  if (price === 0) {
    return "Temporalmente sin stock";
  } else {
    // formateamos el precio agregando puntos como separador de miles
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "$" + formattedPrice;
  }
}

export default formatPrice;