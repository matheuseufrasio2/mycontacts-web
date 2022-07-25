import ReactDOM from 'react-dom';
import Proptypes from 'prop-types';

import {
  Overlay,
} from './styles';
import { Spinner } from '../Spinner';

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    document.getElementById('loader-root'),
  );
}

Loader.propTypes = {
  isLoading: Proptypes.bool.isRequired,
};
