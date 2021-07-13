import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ProductoCard = React.lazy(() => import('components/Product/ProductCard'))
const Categories = React.lazy(() => import("views/Categories/Categories"))
const Familias = React.lazy(() =>  import('views/Familias/Familias'))
const TheCheckout = React.lazy(() => import('containers/TheCheckout'))
const InvoiceCart = React.lazy(() => import('components/InvoiceCart/InvoiceCart'))
const Page404 = React.lazy(() => import('views/pages/page404/Page404'))
// const CatalogoProduct = React.lazy(() => import('./views/CatalogoProduct/CatalogoProduct'))
// const DetalleProduct = React.lazy(() => import('./views/CatalogoProduct/DetalleProduct'))
// const ProductoForm = React.lazy(() => import('./components/uploadForm/ProductoForm'))

const routes = [
  
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', componente: Dashboard },
  { path: '/product/:slug/name/:title', exact: false, name: 'Productos', componente: ProductoCard },  
  { path: '/categories/:slug', exact: false, name: 'Categorias', componente: Categories },  
  { path: '/familia/categories/:slug/familia/:item', exact: true, name: 'Familias', componente: Familias },  
  { path: '/cart/checkout', exact: false, name: "Crear Pedido", componente: TheCheckout },
  { path: '/checkout/invoice/:folio', exact: true, name: "Complete Invoice", componente: InvoiceCart },
  { path: '/error404', exact: true, name: "Error 404", componente: Page404 }
  

  // { path: '/product/:slug/:id', exact: false, name: 'Productos', componente: CatalogoProduct },  
  // { path: '/detalle/:slug/:title', exact: false,  name: 'Detalle de Producto', componente: DetalleProduct },
  
  
  

];

export default routes;
