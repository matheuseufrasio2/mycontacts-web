import Proptypes from 'prop-types';
import ReactDOM from 'react-dom';

export function ReactPortal({ containerId, children }) {
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}

ReactPortal.propTypes = {
  containerId: Proptypes.string,
  children: Proptypes.node.isRequired,
};

ReactPortal.defaultProps = {
  containerId: 'portal-root',
};
