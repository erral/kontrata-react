import { IconsGallery } from "./icons-gallery";
import PropTypes from 'prop-types';

function Icon({ name = "", size = "32px", color = "#161625" }) {
  return <>{name && IconsGallery(name, size, color)}</>;
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string
} 

export default Icon;
