import { TextArea, ToastFactory } from '@douyinfe/semi-ui';
import { Picker } from 'emoji-mart-virtualized';
import dayjs from 'dayjs';
import 'emoji-mart-virtualized/css/emoji-mart.css';
import { IconMenu, IconFilpVertical, IconEmoji, IconChevronLeft } from '@douyinfe/semi-icons';
import { useState, useRef, useMemo, useEffect, useContext } from 'react';
import i18 from './i18';
import styles from './index.scss';
import useCourier from '@/hooks/useCourier';
import { ProtocolState } from '@cloud-courier/cloud-courier-lib/lib/data-models';
import { useFrame } from '@/components/customIframe';
import { pageController } from '../home';

function Chat() {
  const setChatPage = useContext(pageController);
  const { document } = useFrame();
  const scroll = useRef<HTMLDivElement>();
  const [msg, setMsg] = useState('');
  const [showEmojiModal, setEmojiModal] = useState(false);
  const { courierName, avatar, connect, courierKey, message, readyState, sendMessage } = useCourier(
    '从来就没有什么救世主 也不要什么神仙皇帝 要创造人类的幸福 全靠我们自己 ',
    'v8oJ_YNkOWXDcQ90Z9PAi4JcCs1NstgT5unDFf7LKWc=',
  );
  const [reconnectNumber, setReconnectNumber] = useState(0);

  useEffect(() => {
    connect();
  }, [reconnectNumber]);

  useEffect(() => {
    setTimeout(() => {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }, 200);
  }, [message]);

  const InitList = useMemo(
    () =>
      message.map(item => (
        <div
          key={item.timestamp}
          className={`${styles.messageBubbleContainer} ${
            item.target === courierKey ? styles.owner : ''
          } `}
        >
          <div
            className={`${styles.bubbleContainer} ${
              item.target === courierKey ? '' : styles.other
            } `}
          >
            <div className={styles.bubble}>
              <div>{item.content}</div>
              <div className={styles.bubbleTime}>{dayjs(item.timestamp).format('HH:mm:ss')}</div>
            </div>
          </div>
        </div>
      )),
    [message],
  );
  function searchEmoji(emojis: any) {
    setEmojiModal(false);
    setMsg(msg !== '' ? msg + emojis.native : emojis.native);
  }
  const ToastInCustomContainer = ToastFactory.create({
    getPopupContainer: () => document.querySelector('.maxContainer'),
  });
  function sendMsg() {
    if (msg.trim() === '') {
      // iframe 中展示提示，目前无效，因为定位问题，在下面，考虑自己写，还有css样式问题
      ToastInCustomContainer.info('请输入内容');
      setMsg('');
      return;
    }
    if (!navigator.onLine) {
      ToastInCustomContainer.error('网络异常，请检查网络');
      return;
    }
    if (readyState !== ProtocolState.MESSAGING) {
      // 断开连接后会自动重新连接，若重连次数上限后，用户通过发送信息，会触发重连
      ToastInCustomContainer.error('连接已断开,请稍等,正在重新连接客服');
      setReconnectNumber(reconnectNumber + 1);
      return;
    }
    sendMessage(msg);
    setMsg('');
    console.log(msg);
  }

  return (
    <div className={styles.maxContainer}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarNav}>
          <div className={styles.toolbarBack}>
            <IconChevronLeft className={styles.iconBack} onClick={() => setChatPage(false)} />
            <div className={styles.avatar}>
              <img src={avatar} alt="logo" />
            </div>
            {courierName}
          </div>
          <div className={styles.toolbarMenu}>
            <IconMenu className={styles.iconMenu} />
          </div>
        </div>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.msgContainer}>
          <div className={styles.msgPanel} ref={scroll}>
            {InitList}
          </div>
        </div>
        <div className={styles.sendContainer}>
          <div className={styles.sendTextarea}>
            <TextArea
              placeholder="请留言"
              className={styles.Textarea}
              value={msg}
              onChange={v => setMsg(v)}
              rows={1}
              autosize
              showClear
              onEnterPress={() => sendMsg()}
            />
          </div>
          <div className={styles.funcContainer}>
            <IconFilpVertical className={styles.iconSend} onClick={() => sendMsg()} />
            <IconEmoji
              className={styles.iconEmoji}
              onClick={() => setEmojiModal(!showEmojiModal)}
            />
            <div className={styles.emojiContainer}>
              {showEmojiModal && (
                <Picker
                  set="twitter"
                  showPreview={false}
                  onClick={(emoji: any) => searchEmoji(emoji)}
                  i18n={i18}
                  perLine={8}
                  showSkinTones={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
