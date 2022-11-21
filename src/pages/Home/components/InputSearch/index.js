import Proptypes from 'prop-types';

import {
  InputSearchContainer,
} from './styles';

export function InputSearch({ value, onChange }) {
  return (
    <InputSearchContainer>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Pesquisar contato..."
      />
    </InputSearchContainer>
  );
}

InputSearch.propTypes = {
  value: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
};
