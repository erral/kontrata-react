# Available components

## 🧭 Navbar
Todo

## 🌐 LanguageSelector 
By clicking on the language, it will be automatically saved in the local storage

Example:
````
import LanguageSelector from "./LanguageSelector";

// Basic (eu/es)
<LanguageSelector />

// With icon. The same icons available as the icon component
<LanguageSelector icon="language"/>
````



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
- github <img src="./Icon/svgs/logo-github.svg" alt="github" width="28px"/>
- language <img src="./Icon/svgs/language-outline.svg" alt="github" width="28px"/>