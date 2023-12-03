import { createPortal } from 'react-dom';

const Overlay = ({ children }) => {
  const overlayRoot = document.getElementById('overlay-root');

  return createPortal(<div className='overlay'>{children}</div>, overlayRoot);
};

export default Overlay;
