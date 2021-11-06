import { LANGUAGES } from "./constants";
import HomePage from "./pages/HomePage";
import CompanyPage from "./pages/CompanyPage";
import AuthorityPage from "./pages/AuthorityPage";
import { Navigate } from "react-router-dom";

const language_independent_routes = {
  languageroot: { component: () => <HomePage /> },
};
Object.keys(LANGUAGES).map((lang) => {
  return (language_independent_routes["languageroot"][lang] = `/${lang}`);
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
  base_company: {
    component: () => <Navigate to="/" />,
    eu: `/eu/enpresa`,
    es: `/es/empresa`,
  },
  base_authority: {
    component: () => <Navigate to="/" />,
    eu: `/eu/admninistrazioa`,
    es: `/es/administracion`,
  },
};

const routes = {
  ...language_dependant_routes,
  ...language_independent_routes,
};

export default routes;
