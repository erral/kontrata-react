import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import { IntlProvider } from "react-intl";
import messages_eu from "./translations/eu.json";
import messages_es from "./translations/es.json";
import routes from './routes';
import useLocalStorage from './utils/useLocalStorage';
import { DB_KEYS, EXTERNAL_LINKS } from './constants';
import { Navbar, Icon, LanguageSelector, DarkModeToggle } from './components';
import { FormattedMessage } from 'react-intl';
import { Nav } from 'react-bootstrap';

const messages = {
  'eu': messages_eu,
  'es': messages_es
};
const default_language = navigator.language.split(/[-_]/)[0];  // language without region code

function App() {
  const [language, setLanguage] = useLocalStorage(DB_KEYS.SELECTED_LANGUAGE, default_language);

  return (
    <>
      <IntlProvider locale={language} messages={messages?.[language]}>
        <BrowserRouter>
          <Route exact path="/">
            <Redirect to={"/" + language} />
          </Route>
          <Switch>
            {routes.map(route => {
              return (
                <Route path={route.path}>
                  <Navbar>
                    <FormattedMessage id="app.testing_text"
                      defaultMessage="Edit <code>src/App.js</code> and save to reload.<br/>Now with {what}!"
                      description="Welcome header on app main page"
                      values={{ what: 'react-intl' }} />
                    <LanguageSelector route={route} language={language} setLanguage={setLanguage} />
                    <Nav.Link href={EXTERNAL_LINKS.GITHUB} target="_blank"><Icon name="github" size="28px" /></Nav.Link>
                    <DarkModeToggle />
                  </Navbar>
                  <route.component />
                </Route>
              )
            })}
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    </>
  );
}
export default App;
