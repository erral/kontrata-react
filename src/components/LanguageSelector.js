import React, { useEffect, useContext } from "react";
import { Context } from "../Store";
import { NavDropdown } from "react-bootstrap";
import Icon from "./Icon";
import { LANGUAGES } from "../constants";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function LanguageSelector({ icon, route, lang }) {
  const [state, dispatch] = useContext(Context);
  const path = route[lang];
  const location = useLocation();
  useEffect(() => {
    dispatch({
      type: "SET_LANGUAGE",
      data: path.match(/^\/([a-zA-Z]+).*$/)[1],
    });
  }, []);

  let history = useHistory();
  const redirect = (path) => {
    history.push(path);
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
        return (
          <NavDropdown.Item
            key={key}
            onClick={() => {
              dispatch({ type: "SET_LANGUAGE", language: key });
              redirect(
                route[key]
                  ? route[key].includes(":param")
                    ? route[key].replace(
                        ":param",
                        location.pathname.split("/").pop()
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
