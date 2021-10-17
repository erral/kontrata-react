import { ReactComponent as GithubSVG } from './svgs/logo-github.svg';

export const IconsGallery = (name, size) => {
    const icons = {
        github: <GithubSVG style={{ width: size }} />
    }
    return icons[name];
}