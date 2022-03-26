import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Auth from './pages/Auth';
import Home from './pages/Home';
import WebinarDetail from './pages/WebinarDetail';
import RegisteredWebinars from './pages/RegisteredWebinars';

function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        {!isAuth && (
          <Route path="/auth">
            <Auth />
          </Route>
        )}
        {isAuth && (
          <Route path="/registered">
            <RegisteredWebinars />
          </Route>
        )}
        <Route path="/webinar/:webinarId">
          <WebinarDetail />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
