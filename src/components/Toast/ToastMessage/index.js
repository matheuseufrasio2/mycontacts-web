import Proptypes from 'prop-types';

import { memo, useEffect } from 'react';
import {
  Container,
} from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';

function ToastMessage({
  message, onRemoveMessage, isLeaving, animatedRef,
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message.duration, message.id, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircle} alt="Check" />}
      <strong>
        {message.text}
      </strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: Proptypes.shape({
    id: Proptypes.number.isRequired,
    duration: Proptypes.number,
    text: Proptypes.string.isRequired,
    type: Proptypes.oneOf(['default', 'success', 'danger']),
  }).isRequired,
  onRemoveMessage: Proptypes.func.isRequired,
  animatedRef: Proptypes.shape().isRequired,
  isLeaving: Proptypes.bool.isRequired,
};

export default memo(ToastMessage);
