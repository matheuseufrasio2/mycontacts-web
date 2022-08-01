import Proptypes from 'prop-types';

import { Spinner } from '../Spinner';

import {
  StyledButton,
} from './styles';

export function Button({
  type, isLoading, disabled, children, danger, onClick,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      danger={danger}
      onClick={onClick}
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
  danger: Proptypes.bool,
  onClick: Proptypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  danger: false,
  onClick: undefined,
};
