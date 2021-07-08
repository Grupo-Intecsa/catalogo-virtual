import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './scss/style.scss';
// import logoSVG from 'assets/icons/git_logo.svg'

// google analytics
import withTracker from 'components/withTracker/withTracker';

// Context
import { CatalogoProvider } from './context/catalogoContext'
import { TiendaProvider } from 'context/TiendaContext'
import { UserContextProvider } from './context/userContext'
import AppContextProvider from 'context/AppContext';
import utils from 'utils/utils';

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const Validate = React.lazy(() => import('./components/admin/AdminLayout'))

const loading = (
  <small>Iniciando aplicación...</small>
)

const Login = React.lazy(() => import('./views/Login/Login'));

class App extends Component {

  render() {
    return (
      
      <UserContextProvider>
        <TiendaProvider>
        <CatalogoProvider>
        <AppContextProvider>

        <Router ref={this.onTopRef}>
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
