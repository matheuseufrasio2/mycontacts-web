/* eslint-disable no-nested-ternary */
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  HeaderContainer,
} from './styles';

export function Header({
  hasError,
  qtyOfContacts,
  qtyOfFilteredContacts,
}) {
  const alignment = hasError
    ? 'flex-end'
    : (
      qtyOfContacts > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <HeaderContainer justifyContent={alignment}>
      {(qtyOfContacts > 0 && !hasError) && (
        <strong>
          {qtyOfFilteredContacts}
          {' '}
          {qtyOfFilteredContacts === 1 ? 'contato' : 'contatos'}
        </strong>
      )}
      <Link to="/new">
        Novo contato
      </Link>
    </HeaderContainer>
  );
}

Header.propTypes = {
  hasError: Proptypes.bool.isRequired,
  qtyOfContacts: Proptypes.number.isRequired,
  qtyOfFilteredContacts: Proptypes.number.isRequired,
};
