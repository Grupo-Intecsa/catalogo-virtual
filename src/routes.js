import React from 'react';



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CatalogoProduct = React.lazy(() => import('./views/CatalogoProduct/CatalogoProduct'))


const routes = [
  { path: '/dashboard', exact: false, name: 'Home', componente: Dashboard },
  { path: '/product/:slug/:id', exact: false, name: 'Productos', componente: CatalogoProduct },

];

export default routes;
