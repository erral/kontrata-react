import { ReactComponent as GithubSVG } from './svgs/logo-github.svg';
import { ReactComponent as LanguageSVG } from './svgs/language-outline.svg';


export const IconsGallery = (name, size) => {
    const icons = {
        github: <GithubSVG style={{ width: size }} />,
        language: <LanguageSVG style={{ width: size }} />
    }
    return icons[name];
}