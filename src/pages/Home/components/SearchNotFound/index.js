/* eslint-disable react/jsx-one-expression-per-line */
import Proptypes from 'prop-types';
import {
  SearchNotFoundContainer,
} from './styles';

import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

export function SearchNotFound({ searchTerm }) {
  return (
    <SearchNotFoundContainer>
      <img src={magnifierQuestion} alt="Magnifier Question" />
      <span>
        Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.
      </span>
    </SearchNotFoundContainer>
  );
}

SearchNotFound.propTypes = {
  searchTerm: Proptypes.string.isRequired,
};
