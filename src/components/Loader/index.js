import Proptypes from 'prop-types';

import {
  Overlay,
} from './styles';
import { Spinner } from '../Spinner';
import { ReactPortal } from '../ReactPortal';

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: Proptypes.bool.isRequired,
};
