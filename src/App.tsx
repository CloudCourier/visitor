import './reset.scss';
import CustomIframe from '@/components/customIframe';
import { useState, useEffect, useRef } from 'react';
import message from '@images/message.svg';
import arrowdown from '@images/arrowdown.svg';
import Home from '@/page/home';
// iframe 样式只能写内联
function App() {
  const iconRef = useRef<HTMLDivElement>();
  useEffect(() => {
    setTimeout(() => {
      iconRef.current.style.opacity = '1';
      // TODO 暂时用延时来解决CustomIframe样式文件未加载问题
    }, 1000);
  }, []);
  const [chatWindow, setChatWindow] = useState(false);
  return (
    <div id="maxContain">
      <CustomIframe
        head={
          <>
            <link href={`${process.env.resourceLocation}/css/index.css`} rel="stylesheet"></link>
            <link href={`${process.env.resourceLocation}/css/vendors.css`} rel="stylesheet"></link>
          </>
        }
        style={
          chatWindow
            ? {
                display: 'block',
                height: '520px',
                width: '350px',
                flex: '1',
                border: 'none',
                outline: 'none',
                marginBottom: '120px',
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 5px 40px',
                opacity: 1,
                borderRadius: '8px',
                overflow: 'hidden',
              }
            : { display: 'none' }
        }
      >
        <Home />
      </CustomIframe>
      <CustomIframe
        style={{
          position: 'fixed ',
          inset: 'auto 20px 20px auto',
          border: '0 ',
          minHeight: '60px ',
          minWidth: '64px',
          maxHeight: '60px ',
          maxWidth: '64px ',
          padding: ' 0 ',
          margin: '0 ',
        }}
        head={
          <>
            <link href={`${process.env.resourceLocation}/css/index.css`} rel="stylesheet"></link>
            <link href={`${process.env.resourceLocation}/css/vendors.css`} rel="stylesheet"></link>
          </>
        }
      >
        <div
          ref={iconRef}
          style={{
            backgroundColor: 'rgb(0,30,43)',
            height: '100%',
            width: '100%',
            borderRadius: '50%',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: '0',
            transition: 'opacity 0.3s ease-in-out',
          }}
          onClick={() => setChatWindow(!chatWindow)}
        >
          {chatWindow ? (
            <img src={arrowdown} style={{ height: '70%' }} alt="arrowdown" />
          ) : (
            <img src={message} style={{ height: '70%' }} alt="message" />
          )}
        </div>
      </CustomIframe>
    </div>
  );
}

export default App;
