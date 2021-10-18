import { IconsGallery } from './icons-gallery';
/**Icon component 
 * 
 * @param {string} name Available icons: github
 * @param {string} size Default size 32px
*/
function Icon({ name = '', size = '32px', color = '#161625' }) {
    return (<>{name && IconsGallery(name, size, color)}</>);
}

export default Icon;