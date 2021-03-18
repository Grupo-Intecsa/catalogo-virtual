import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CatalogoProduct = React.lazy(() => import('./views/CatalogoProduct/CatalogoProduct'))
// const ProductoForm = React.lazy(() => import('./components/uploadForm/ProductoForm'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', componente: Dashboard },
  { path: '/product/:slug/:id', name: 'Productos', componente: CatalogoProduct },
  { path: '/product/:slug', name: 'Familias', componente: CatalogoProduct },
  

];

export default routes;
