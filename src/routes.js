import { LANGUAGES } from "./constants";
import HomePage from "./pages/HomePage";
import CompanyPage from "./pages/CompanyPage";
import AuthorityPage from "./pages/AuthorityPage";
import { Redirect } from 'react-router-dom';

const language_independent_routes = Object.keys(LANGUAGES).map(lang => {
  return {
    component: () => <HomePage />,
    path: `/${lang}`
  }
})

const language_dependant_routes = [
  {
    component: () => <p>LAGUNTZA</p>,
    path: `/eu/laguntza`,
    // sibling: `/es/ayuda`,
  },
  {
    component: () => <p>AYUDA</p>,
    path:`/es/ayuda`,
    sibling:`/eu/laguntza`,
  },
  {
    component: () => <CompanyPage />,
    path:`/es/empresa/:cif`,
    sibling:`/eu/enpresa/:cif`,
  },
  {
    component: () => <CompanyPage />,
    path:`/eu/enpresa/:cif`,
    sibling:`/es/empresa/:cif`,
  },
  {
    component: () => <Redirect to="/" />,
    path:`/es/empresa`,
    sibling:`/eu/enpresa`,
  },
  {
    component: () => <Redirect to="/" />,
    path:`/eu/enpresa`,
    sibling:`/es/empresa`,
  },

  {
    component: () => <AuthorityPage />,
    path:`/es/administracion/:cif`,
    sibling:`/eu/administrazioa/:cif`,
  },
  {
    component: () => <AuthorityPage />,
    path:`/eu/administrazioa/:cif`,
    sibling:`/es/administracion/:cif`,
  },
  {
    component: () => <Redirect to="/" />,
    path:`/es/administracion`,
    sibling:`/eu/administrazioa`,
  },
  {
    component: () => <Redirect to="/" />,
    path:`/eu/administrazioa`,
    sibling:`/es/administracion`,
  },


]
console.log('language_independent_routes: ', ...language_independent_routes);
console.log('language_dependant_routes: ', ...language_dependant_routes);
const routes = [
    ...language_dependant_routes,
    ...language_independent_routes,
]
console.log('routes: ', routes);
export default routes;
