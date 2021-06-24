import React, { Component } from 'react';
import { Route, HashRouter, Switch, BrowserRouter as Router } from 'react-router-dom';
import './scss/style.scss';
// import logoSVG from 'assets/icons/git_logo.svg'

// google analytics
import withTracker from 'components/withTracker/withTracker';

// Context
import { CatalogoProvider } from './context/catalogoContext'
import { TiendaProvider } from 'context/TiendaContext'
import { UserContextProvider } from './context/userContext'
import AppContextProvider from 'context/AppContext';

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const Validate = React.lazy(() => import('./components/admin/AdminLayout'))

const loading = (
  <small>Iniciando aplicación...</small>
)



// Pages
const Login = React.lazy(() => import('./views/Login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      
      <UserContextProvider>
        <TiendaProvider>
        <CatalogoProvider>
        <AppContextProvider>

        <Router>
            <React.Suspense fallback={loading}>
              <Switch>
                  <Route exact path="/login" name="Login" render={(props) => <Login {...props}/>} />
                  <Route exact path="/admin" name="Panel de Control" render={(props) => <Validate {...props}/>} />
                  <Route path="/" name="Home" component={withTracker(TheLayout)} />
              </Switch>
            </React.Suspense>
        </Router>
        
        </AppContextProvider>
        </CatalogoProvider>
        </TiendaProvider>
      </UserContextProvider>
      
    );
  }
}

export default App;
