import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ProductoCard = React.lazy(() => import('components/Product/ProductCard'))
const Categories = React.lazy(() => import("views/Categories/Categories"))
const Familias = React.lazy(() =>  import('views/Familias/Familias'))
const TheCheckout = React.lazy(() => import('containers/TheCheckout'))
const InvoiceCart = React.lazy(() => import('components/InvoiceCart/InvoiceCart'))
const Page404 = React.lazy(() => import('views/pages/page404/Page404'))
const BrandComponent = React.lazy(() =>  import('views/BrandComponent'))
const SearchView = React.lazy(() => import('views/SearchView'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', componente: Dashboard },
  
  // componente desglose de familias (categorias y brand menu)
  { path: '/familia/categories/:slug/familia/:item', exact: true, name: 'Familias', componente: Familias },  
  { path: '/products/brand/label/:slug/familia/:item', exact: true, name: 'Familias por Marca', componente: Familias },  

  // filtro de categorias
  // Slug texto plano
  { path: '/categories/:slug', exact: false, name: 'Categorias', componente: Categories },  
  { path: '/products/brand/:id/:slug', exact: true, name: "Todos los productos por marca", componente: BrandComponent },
  { path: '/search/:slug', exact: true, name: "Tu busqueda", componente: SearchView },
  
  // carrito
  { path: '/cart/checkout', exact: false, name: "Crear Pedido", componente: TheCheckout },
  { path: '/checkout/invoice/', exact: true, name: "Complete Invoice", componente: InvoiceCart },
  
  // tarjeta de carrito
  { path: '/product/:slug/name/:title', exact: false, name: 'Productos', componente: ProductoCard },  


  { path: '/error404', exact: true, name: "Error 404", componente: Page404 } 

];

export default routes;
