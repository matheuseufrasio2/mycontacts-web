/* eslint-disable react/jsx-one-expression-per-line */
import {
  EmptyListContainer,
} from './styles';

import emptyBox from '../../../../assets/images/empty-box.svg';

export function EmptyList() {
  return (
    <EmptyListContainer>
      <img src={emptyBox} alt="Empty box" />
      <p>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão <strong>"Novo contato"</strong> à cima
        para cadastrar o seu primeiro!
      </p>
    </EmptyListContainer>
  );
}
