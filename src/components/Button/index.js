import Proptypes from 'prop-types';

import { Spinner } from '../Spinner';

import {
  StyledButton,
} from './styles';

export function Button({
  type, isLoading, disabled, children,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: Proptypes.string,
  isLoading: Proptypes.bool,
  disabled: Proptypes.bool,
  children: Proptypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
};
