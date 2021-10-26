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
      <IntlProvider locale={language} messages={messages?.[language]}>
        <BrowserRouter>
          <Route exact path="/">
            <Redirect to={"/" + language} />
          </Route>
          <Switch>
            {routes.map((route, key) => {
              return (
                <Route key={key} path={route.path}>
                  <Navbar>
                    <LanguageSelector
                      route={route}
                      language={language}
                      setLanguage={setLanguage}
                    />
                    <Nav.Link href={EXTERNAL_LINKS.GITHUB} target="_blank">
                      <Icon name="github" size="28px" />
                    </Nav.Link>
                    <DarkModeToggle />
                  </Navbar>
                  <route.component />
                </Route>
              );
            })}
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    </>
  );
}
export default App;
