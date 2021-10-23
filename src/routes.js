import { LANGUAGES } from "./constants";
import HomePage from "./pages/HomePage";

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
  }
]
console.log('language_independent_routes: ', ...language_independent_routes);
console.log('language_dependant_routes: ', ...language_dependant_routes);
const routes = [
    ...language_dependant_routes,
    ...language_independent_routes,
]
console.log('routes: ', routes);
export default routes;