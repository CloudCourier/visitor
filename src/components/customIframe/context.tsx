import React from 'react';

let doc;
if (typeof document !== 'undefined') {
  doc = document;
}

export const FrameContext = React.createContext({ document: doc });

export const useFrame = () => React.useContext(FrameContext);

export const { Provider: FrameContextProvider, Consumer: FrameContextConsumer } = FrameContext;
