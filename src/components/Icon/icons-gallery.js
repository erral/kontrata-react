import { ReactComponent as GithubSVG } from './svgs/logo-github.svg';
import { ReactComponent as LanguageSVG } from './svgs/language-outline.svg';
import { ReactComponent as MoonSVG } from './svgs/moon-outline.svg';
import { ReactComponent as SunSVG } from './svgs/sunny-outline.svg';

export const IconsGallery = (name, size, color) => {
    const icon_design = { width: size, color: color }
    const icons = {
        github: <GithubSVG style={icon_design} />,
        language: <LanguageSVG style={icon_design} />,
        moon: <MoonSVG style={icon_design} />,
        sun: <SunSVG style={icon_design} />
    }
    return icons[name];
}