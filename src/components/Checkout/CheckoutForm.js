import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

// componente checkoutform para gestionar el formulario de finalización de compra
function CheckoutForm({ cart, clearCart }) {
  // estados para controlar la visibilidad del modal, el envio del formulario y los datos del comprador
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [buyer, setBuyer] = useState({
    nombre: "",
    apellido: "",
    email: "",
    emailConfirm: "",
    telefono: "",
  });

  // funciones para abrir y cerrar el modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  // funcion para obtener la fecha y hora local en formato string
  const getLocalDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  // función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // verificamos si los correos ingresados coinciden
    if (buyer.email === buyer.emailConfirm) {
      // mapeamos la información del carrito
      const cartInfo = cart.map((item) => {
        return {
          id: item.id,
          Producto: item.Producto,
          PrecioUnitario: item.Precio,
          quantity: item.quantity,
          totalPorProducto: item.Precio * item.quantity,
        };
      });

      // calculamos el total del pedido
      const totalPedido = cart.reduce((sum, item) => {
        return sum + item.Precio * item.quantity;
      }, 0);

      // obtenemos la fecha y hora local
      const localDateTime = getLocalDateTime();

      // agregamos el pedido a la coleccion "orders" en firestore
      const ordersCollection = collection(db, "orders");
      addDoc(ordersCollection, {
        buyer,
        cartInfo,
        totalPedido,
        localDateTime,
      })
        .then((docRef) => {
          // mostramos una alerta de exito
          Swal.fire({
            icon: "success",
            title: "Pedido registrado",
            html: `<div className="alert alert-warning" role="alert">¡Gracias por tu compra ${buyer.nombre}!. Te enviaremos un correo electrónico a la brevedad a <strong>${buyer.email}</strong> para continuar con la compra. Tu ID de transacción es el siguiente: <strong>${docRef.id}</strong></div>`,
            allowOutsideClick: false,
          });
          clearCart();
          handleClose();
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      // mostramos una alerta de error si los correos no coinciden
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Los correos electrónicos no coinciden.",
        allowOutsideClick: false,
      });
      setSubmitting(false);
    }
  };
  // renderizamos el componente con el botón para abrir el modal y el formulario dentro del modal
  return (
    <>
      <Button variant="btn btn-outline-primary" onClick={handleShow}>
        Completar compra
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario de compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={buyer.nombre}
                onChange={handleChange}
                maxLength={20}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={buyer.apellido}
                onChange={handleChange}
                maxLength={20}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                value={buyer.telefono}
                onChange={handleChange}
                maxLength={10}
                pattern="[0-9]{10}"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={buyer.email}
                onChange={handleChange}
                maxLength={40}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Email</Form.Label>
              <Form.Control
                type="email"
                name="emailConfirm"
                value={buyer.emailConfirm}
                onChange={handleChange}
                maxLength={40}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={submitting}>
              Enviar
            </Button>
          </Form>
          {submitting && (
            <div className="mt-3 d-flex justify-content-center">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CheckoutForm;
