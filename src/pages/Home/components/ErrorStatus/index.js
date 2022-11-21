import Proptypes from 'prop-types';

import sad from '../../../../assets/images/sad.svg';
import { Button } from '../../../../components/Button';

import {
  ErrorStatusContainer,
} from './styles';

export function ErrorStatus({ onTryAgain }) {
  return (
    <ErrorStatusContainer>
      <img src={sad} alt="Sad" />

      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos</strong>
        <Button onClick={onTryAgain} type="button">
          Tentar novamente
        </Button>
      </div>
    </ErrorStatusContainer>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: Proptypes.func.isRequired,
};
