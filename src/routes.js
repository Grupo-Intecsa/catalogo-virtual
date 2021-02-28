import React from 'react';



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CatalogoProduct = React.lazy(() => import('./views/CatalogoProduct/CatalogoProduct'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: false, name: 'Dashboard', componente: Dashboard },
  { path: '/product/categorias/6034c3e949c0b8191c0bc2e2', exact: false, name: 'Productos', componente: CatalogoProduct },

];

export default routes;
