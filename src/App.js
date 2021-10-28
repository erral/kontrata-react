import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { IntlProvider } from "react-intl";
import messages_eu from "./locales/eu.json";
import messages_es from "./locales/es.json";
import routes from "./routes";
import useLocalStorage from "./utils/useLocalStorage";
import { DB_KEYS, EXTERNAL_LINKS } from "./constants";
import { Navbar, Icon, LanguageSelector, DarkModeToggle } from "./components";
import { Nav } from "react-bootstrap";
import { LANGUAGES } from "./constants";

import { ReactiveBase } from "@appbaseio/reactivesearch";

import {
  REACT_APP_ELASTIC_SCHEME,
  REACT_APP_ELASTIC_HOST,
  REACT_APP_ELASTIC_PORT,
} from "./constants.js";

const messages = {
  eu: messages_eu,
  es: messages_es,
};
const default_language = navigator.language.split(/[-_]/)[0]; // language without region code

function App() {
  const [language, setLanguage] = useLocalStorage(
    DB_KEYS.SELECTED_LANGUAGE,
    default_language
  );
  return (
    <>
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to={"/" + language} />
        </Route>
        <Switch>
          {Object.keys(routes).map((routeKey) => {
            let route = routes[routeKey];
            return Object.keys(LANGUAGES).map((lang) => {
              return (
                <Route key={routeKey + lang} path={route[lang]}>
                  <IntlProvider locale={lang} messages={messages?.[lang]}>
                    <Navbar>
                      <LanguageSelector
                        route={route}
                        language={lang}
                        setLanguage={setLanguage}
                      />
                      <Nav.Link href={EXTERNAL_LINKS.GITHUB} target="_blank">
                        <Icon name="github" size="28px" />
                      </Nav.Link>
                      <DarkModeToggle />
                    </Navbar>
                    <ReactiveBase
                      url={`${REACT_APP_ELASTIC_SCHEME}://${REACT_APP_ELASTIC_HOST}:${REACT_APP_ELASTIC_PORT}/`}
                      app={"contracts_" + lang}
                    >
                      <route.component />
                    </ReactiveBase>
                  </IntlProvider>
                </Route>
              );
            });
          })}
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
