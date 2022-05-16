import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FrameContextProvider } from './context';

const CustomIframe = props => {
  const [contentRef, setContentRef] = useState(null);
  const { head, children, style } = props;
  const doc = contentRef?.contentWindow?.document;
  const mountNode = doc?.body;
  const mountHead = doc?.head;
  return (
    <iframe style={style} ref={setContentRef}>
      <FrameContextProvider value={{ document: doc }}>
        {mountNode &&
          mountHead && [createPortal(children, mountNode), createPortal(head, mountHead)]}
      </FrameContextProvider>
    </iframe>
  );
};

export default CustomIframe;
export { useFrame } from './context';
