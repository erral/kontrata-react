import React, { useEffect } from "react"
import { NavDropdown } from 'react-bootstrap';
import Icon from './Icon';
import { LANGUAGES } from '../constants';
import { useHistory } from "react-router";

function LanguageSelector({ icon, language, setLanguage, route }) {
    const {path} = route;
    useEffect(() => {
        setLanguage(path.match(/^\/([a-zA-Z]+).*$/)[1])
    }, [path, setLanguage]);
    let history = useHistory();
    const redirect = (path) => {
      history.push(path)
    }
    return (
        <NavDropdown title={<>{icon && <Icon name={icon} />} {language}</>} id="basic-nav-dropdown">
            {Object.entries(LANGUAGES).map(([key, value]) => {
                return (
                  <NavDropdown.Item key={key} onClick={() => redirect(route.sibling?route.sibling:`/${key}`)}>{value.toString()}</NavDropdown.Item>
                );
            })}
        </NavDropdown>
    );
}

export default LanguageSelector;
