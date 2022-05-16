import { createContext, useContext } from 'react';

let doc;
if (typeof document !== 'undefined') {
  doc = document;
}

export const FrameContext = createContext({ document: doc });

export const useFrame = () => useContext(FrameContext);

export const { Provider: FrameContextProvider, Consumer: FrameContextConsumer } = FrameContext;
