import Proptypes from 'prop-types';
import ReactDOM from 'react-dom';

import {
  Overlay,
  Container,
  Footer,
} from './styles';

import Button from '../Button';

export function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Título do modal</h1>
        <p>Corpo do modal</p>
        <Footer>
          <button className="cancel-button" type="button">Cancelar</button>
          <Button danger={danger} type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: Proptypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
