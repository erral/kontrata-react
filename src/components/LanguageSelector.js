import React from "react"
import { NavDropdown } from 'react-bootstrap';
import Icon from './Icon';
import { DB_KEYS, LANGUAGES } from '../constants';
import useLocalStorage from "../utils/useLocalStorage";

function LanguageSelector({ icon = "language" }) {
    const [language, setLanguage] = useLocalStorage(DB_KEYS.SELECTED_LANGUAGE, Object.keys(LANGUAGES)[0]);

    const selectLanguage = (lang) => {
        console.log("lang: ", lang);
        setLanguage(lang)
    };
    return (
        <NavDropdown title={<><Icon name={icon} /> {language}</>} id="basic-nav-dropdown">
            {Object.entries(LANGUAGES).map(([key, value]) => {
                return (
                    <NavDropdown.Item onClick={() => { selectLanguage(key) }}>{value.toString()}</NavDropdown.Item>
                );
            })}
        </NavDropdown>
    );
}

export default LanguageSelector;