import React, { Component } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import './scss/style.scss';

// Context
import { CatalogoProvider } from './context/catalogoContext'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));


// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      <CatalogoProvider>
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>

              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
              
            </Switch>
          </React.Suspense>
      </HashRouter>
      </CatalogoProvider>
    );
  }
}

export default App;
