import Proptypes from 'prop-types';

import {
  Overlay,
} from './styles';
import { Spinner } from '../Spinner';
import { ReactPortal } from '../ReactPortal';
import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount';

export function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: Proptypes.bool.isRequired,
};
