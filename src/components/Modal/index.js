import Proptypes from 'prop-types';

import {
  Overlay,
  Container,
  Footer,
} from './styles';

import { Button } from '../Button';
import { ReactPortal } from '../ReactPortal';
import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount';

export function Modal({
  danger,
  title,
  children,
  isLoading,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>
          <div className="modal-body">
            {children}
          </div>
          <Footer>
            <button
              className="cancel-button"
              type="button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              onClick={onConfirm}
              danger={danger}
              type="button"
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: Proptypes.bool,
  isLoading: Proptypes.bool,
  visible: Proptypes.bool.isRequired,
  title: Proptypes.string.isRequired,
  children: Proptypes.node.isRequired,
  cancelLabel: Proptypes.string,
  confirmLabel: Proptypes.string,
  onCancel: Proptypes.func.isRequired,
  onConfirm: Proptypes.func.isRequired,
};

Modal.defaultProps = {
  isLoading: false,
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
