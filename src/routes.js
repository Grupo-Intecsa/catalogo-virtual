import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ProductoCard = React.lazy(() => import('components/Product/ProductCard'))
const Categories = React.lazy(() => import("views/Categories/Categories"))
const Familias = React.lazy(() =>  import('views/Familias/Familias'))
const TheCheckout = React.lazy(() => import('containers/TheCheckout'))
const InvoiceCart = React.lazy(() => import('components/InvoiceCart/InvoiceCart'))
const Page404 = React.lazy(() => import('views/pages/page404/Page404'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', componente: Dashboard },
  { path: '/product/:slug/name/:title', exact: false, name: 'Productos', componente: ProductoCard },  
  { path: '/categories/:slug', exact: false, name: 'Categorias', componente: Categories },  
  { path: '/familia/categories/:slug/familia/:item', exact: true, name: 'Familias', componente: Familias },  
  { path: '/cart/checkout', exact: false, name: "Crear Pedido", componente: TheCheckout },
  { path: '/checkout/invoice/:folio', exact: true, name: "Complete Invoice", componente: InvoiceCart },
  { path: '/error404', exact: true, name: "Error 404", componente: Page404 } 

];

export default routes;
