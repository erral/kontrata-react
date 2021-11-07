import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { IntlProvider } from "react-intl";
import messages_eu from "./locales/eu.json";
import messages_es from "./locales/es.json";
import routes from "./routes";
import { EXTERNAL_LINKS } from "./constants";
import { Navbar, Icon, LanguageSelector, DarkModeToggle } from "./components";
import { Nav } from "react-bootstrap";
import { LANGUAGES } from "./constants";

import { ReactiveBase } from "@appbaseio/reactivesearch";

import {
  REACT_APP_ELASTIC_SCHEME,
  REACT_APP_ELASTIC_HOST,
  REACT_APP_ELASTIC_PORT,
} from "./constants.js";
import Store from "./Store";

const messages = {
  eu: messages_eu,
  es: messages_es,
};

function App() {
  return (
    <Store>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={"/" + Object.keys(LANGUAGES)[0]} />}
          />
          {Object.keys(routes).map((routeKey) => {
            let route = routes[routeKey];
            return Object.keys(LANGUAGES).map((lang) => {
              return (
                <Route
                  key={routeKey + lang}
                  path={route[lang]}
                  element={
                    <IntlProvider locale={lang} messages={messages?.[lang]}>
                      <Navbar>
                        <LanguageSelector route={route} lang={lang} />
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
                  }
                />
              );
            });
          })}
        </Routes>
      </BrowserRouter>
    </Store>
  );
}
export default App;
