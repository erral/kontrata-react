# Available components

## 🧭 Navbar

**Example:**
```
import { Navbar } from './components';

<Navbar>
    // Items that will be displayed on the right
    <LanguageSelector />
    <Nav.Link href={EXTERNAL_LINKS.GITHUB} target="_blank"><Icon name="github" size="28px" /></Nav.Link>
</Navbar>
```

**To change the Github repo link:**

1. Go to constants.js
2. Change EXTERNAL_LINKS.GITHUB value: 
```
export const EXTERNAL_LINKS = {
    GITHUB: 'https://github.com/erral'
}
```


## 🌐 LanguageSelector 
By clicking on the language, it will be automatically saved in the local storage

**Example:**
````
import LanguageSelector from "./LanguageSelector";

// Basic (eu/es)
<LanguageSelector />

// With icon. The same icons available as the icon component
<LanguageSelector icon="language"/>
````

**How to add new language:**

1. Go to constants.js
2. Add new language to (The default language is the first): 
```
export const LANGUAGES = {
    "eu": "Euskara", // The default language is the first one listed
    "es": "Español"
}
```


## ⚛️ Icon
Example:
```
import { Icon } from './components';

<Icon name="github" size="64px"/>
```

Params:
* name: "github" | "language"
* size: default: "32px"

Available icons:
- github <img src="../src/components/Icon/svgs/logo-github.svg" alt="github" width="28px"/>
- language <img src="../src/components/Icon/svgs/language-outline.svg" alt="github" width="28px"/>


## ⬇️ Footer

**Example:**
```
import { Footer } from './components';

<Footer>
    // HTML elements
</Footer>
```
