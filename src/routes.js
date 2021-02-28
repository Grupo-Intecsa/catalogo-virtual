import React from 'react';



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CatalogoProduct = React.lazy(() => import('./views/CatalogoProduct/CatalogoProduct'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: false, name: 'Dashboard', componente: Dashboard },
  { path: '/product/categorias/:id', exact: false, name: 'Productos', componente: CatalogoProduct },

];

export default routes;
