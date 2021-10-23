import { addLocaleData } from "react-intl";
import locale_eu from 'react-intl/locale-data/eu';
import locale_es from 'react-intl/locale-data/es';

addLocaleData([...locale_eu, ...locale_es]);