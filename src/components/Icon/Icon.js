import { IconsGallery } from './icons-gallery';
/**Icon component 
 * 
 * @param {string} name Available icons: github
 * @param {string} size Default size 32px
*/
function Icon({ name = '', size = '32px' }) {
    return (<>{name && IconsGallery(name, size)}</>);
}

export default Icon;