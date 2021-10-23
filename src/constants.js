const LANGUAGES = {
  eu: "Euskara",
  es: "Español",
};

const DB_KEYS = {
  SELECTED_LANGUAGE: "selected_language",
  THEME: "theme",
};

const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/erral",
};

const REACT_APP_ELASTIC_SCHEME = process.env.REACT_APP_ELASTIC_SCHEME || "http";
const REACT_APP_ELASTIC_HOST =
  process.env.REACT_APP_ELASTIC_HOST || "localhost";
const REACT_APP_ELASTIC_PORT = process.env.REACT_APP_ELASTIC_PORT || "9200";

export {
  LANGUAGES,
  DB_KEYS,
  EXTERNAL_LINKS,
  REACT_APP_ELASTIC_SCHEME,
  REACT_APP_ELASTIC_HOST,
  REACT_APP_ELASTIC_PORT,
};
