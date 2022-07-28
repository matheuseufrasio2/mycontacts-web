import Proptypes from 'prop-types';

import {
  Container,
} from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';

export function ToastMessage({ text, type }) {
  console.log(type);
  return (
    <Container type={type}>
      {type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {type === 'success' && <img src={checkCircle} alt="Check" />}
      <strong>
        {text}
      </strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: Proptypes.string.isRequired,
  type: Proptypes.oneOf(['default', 'success', 'danger']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
