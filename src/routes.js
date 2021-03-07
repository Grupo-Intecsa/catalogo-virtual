import React from 'react';



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CatalogoProduct = React.lazy(() => import('./views/CatalogoProduct/CatalogoProduct'))
const ProductoForm = React.lazy(() => import('./components/uploadForm/ProductoForm'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: false, name: 'Dashboard', componente: Dashboard },
  { path: '/product/:slug/:id', exact: false, name: 'Productos', componente: CatalogoProduct },
  { path: '/product/:slug/:id', exact: false, name: 'Productos', componente: CatalogoProduct },
  // { path: '/admin/upload/', exact: true, name: 'Upload Form', componente: ProductoForm }

];



export default routes;
