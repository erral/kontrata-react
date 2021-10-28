import { LANGUAGES } from "./constants";
import HomePage from "./pages/HomePage";
import CompanyPage from "./pages/CompanyPage";
import AuthorityPage from "./pages/AuthorityPage";
import { Redirect } from "react-router-dom";

const language_independent_routes = {
  languageroot: { component: () => <HomePage /> },
};
Object.keys(LANGUAGES).map((lang) => {
  language_independent_routes["languageroot"][lang] = `/${lang}`;
});

const language_dependant_routes = {
  company: {
    component: () => <CompanyPage />,
    eu: `/eu/enpresa/:cif`,
    es: `/es/empresa/:cif`,
  },
  authority: {
    component: () => <AuthorityPage />,
    eu: `/eu/admninistrazioa/:cif`,
    es: `/es/administracion/:cif`,
  },
  companyr: {
    component: () => <Redirect to="/" />,
    eu: `/eu/enpresa`,
    es: `/es/empresa`,
  },
  authorityr: {
    component: () => <Redirect to="/" />,
    eu: `/eu/admninistrazioa`,
    es: `/es/administracion`,
  },
};

const routes = {
  ...language_dependant_routes,
  ...language_independent_routes,
};

export default routes;
