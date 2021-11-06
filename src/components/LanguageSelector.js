import React, { useEffect, useContext } from "react";
import { Context } from "../Store";
import { NavDropdown } from "react-bootstrap";
import Icon from "./Icon";
import { LANGUAGES } from "../constants";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function LanguageSelector({ icon, route, lang }) {
  const [state, dispatch] = useContext(Context);
  const path = route[lang];
  const params = useParams();
  const path_params = new RegExp(`\/:(.*)$`);

  useEffect(() => {
    dispatch({
      type: "SET_LANGUAGE",
      data: path.match(/^\/([a-zA-Z]+).*$/)[1],
    });
  }, [path, dispatch]);

  let navigate = useNavigate();
  const redirect = (path) => {
    navigate(path);
  };
  return (
    <NavDropdown
      title={
        <>
          {icon && <Icon name={icon} />} {state.language}
        </>
      }
      id="basic-nav-dropdown"
    >
      {Object.entries(LANGUAGES).map(([key, value]) => {
        if (key === lang) {
          return null;
        }
        const route_param = route[key].match(path_params);
        return (
          <NavDropdown.Item
            key={key}
            onClick={() => {
              dispatch({ type: "SET_LANGUAGE", language: key });
              redirect(
                route[key]
                  ? route_param
                    ? route[key].replace(
                        path_params,
                        `/${params[route_param[1]]}`
                      )
                    : route[key]
                  : `/${key}`
              );
            }}
          >
            {value.toString()}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  );
}

LanguageSelector.propTypes = {
  icon: PropTypes.string,
  language: PropTypes.string,
  route: PropTypes.string,
};

export default LanguageSelector;
