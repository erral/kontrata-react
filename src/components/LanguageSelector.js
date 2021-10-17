import React from "react"
import { NavDropdown } from 'react-bootstrap';
import Icon from './Icon';
import { DB_KEYS, LANGUAGES } from '../constants';
import useLocalStorage from "../utils/useLocalStorage";

function LanguageSelector({ icon }) {
    const [language, setLanguage] = useLocalStorage(DB_KEYS.SELECTED_LANGUAGE, Object.keys(LANGUAGES)[0]);

    return (
        <NavDropdown title={<>{icon && <Icon name={icon} />} {language}</>} id="basic-nav-dropdown">
            {Object.entries(LANGUAGES).map(([key, value]) => {
                return (
                    <NavDropdown.Item onClick={() => { setLanguage(key) }}>{value.toString()}</NavDropdown.Item>
                );
            })}
        </NavDropdown>
    );
}

export default LanguageSelector;