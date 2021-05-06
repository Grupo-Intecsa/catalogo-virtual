
import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CatalogoProduct = React.lazy(() => import('./views/CatalogoProduct/CatalogoProduct'))
const DetalleProduct = React.lazy(() => import('./views/CatalogoProduct/DetalleProduct'))
const TheCheckout = React.lazy(() => import('containers/TheCheckout'))
const InvoiceCart = React.lazy(() => import('components/InvoiceCart'))

// const ProductoForm = React.lazy(() => import('./components/uploadForm/ProductoForm'))


const routes = [
  
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', componente: Dashboard },
  
  { path: '/product/:slug/:id', exact: false, name: 'Productos', componente: CatalogoProduct },    
  { path: '/detalle/:slug/:title', exact: false,  name: 'Detalle de Producto', componente: DetalleProduct },
  { path: '/cart/checkout', exact: false, name: "Crear Pedido", componente: TheCheckout },
  { path: '/checkout/invoce', exact: true, name: "Complete Invoice", componente: InvoiceCart }
  
  

];

export default routes;
