import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './scss/style.scss';

// google analytics
import withTracker from 'components/withTracker/withTracker';

// Context
import { CatalogoProvider } from './context/catalogoContext'
import { TiendaProvider } from 'context/TiendaContext'
import { UserContextProvider } from './context/userContext'
import AppContextProvider from 'context/AppContext';
import { AuthProvider } from 'context/AuthContext'

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

const loading = (
  <small>Iniciando aplicación...</small>
)

const Login = React.lazy(() => import('./views/Login/Login'));

class App extends Component {

  render() {
    return (
      <UserContextProvider>
        <AuthProvider>
        <TiendaProvider>
        <CatalogoProvider>
        <AppContextProvider>

        <Router ref={this.onTopRef}>
            <React.Suspense fallback={loading}>
              <Switch>
                  <Route exact path="/login" name="Login" render={(props) => <Login {...props}/>} />
                  <Route path="/" name="Home" component={withTracker(TheLayout)} />
              </Switch>
            </React.Suspense>
        </Router>
        
        </AppContextProvider>
        </CatalogoProvider>
        </TiendaProvider>
      </AuthProvider>
      </UserContextProvider>
      
    );
  }
}

export default App;
