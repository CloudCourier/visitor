import styles from './index.scss';
import customer1 from '@images/customer1.svg';
import customer2 from '@images/customer2.svg';
import customer3 from '@images/customer3.svg';

import { SideSheet } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { useFrame } from '@/components/customIframe';
import VisitorForm from '@/components/visitorForm';
import SearchForm from '@/components/searchForm';
import { IconChevronRight } from '@douyinfe/semi-icons';
export default () => {
  const [formVisible, setFormVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const { document } = useFrame();
  return (
    <div className={styles.consultingContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.siteLogo}>
          <img
            src="https://oss.sunxinao.cn/cloud-courier/upload/6bd280fc4ec00f9c37c665159df7ad3c"
            style={{ height: '100%' }}
            alt="customer"
          />
        </div>
        <div className={styles.siteNote}>你好</div>
      </div>
      <div className={styles.messageContainer}>
        <div className={`${styles.ConversationContainer} ${styles.card}`}>
          <div className={styles.headerText}>咨询客服</div>
          <div className={styles.conversation}>
            <div className={styles.conversationLogo}>
              <img src={customer1} alt="logo" />
              <img src={customer2} alt="logo" />
              <img src={customer3} alt="logo" />
            </div>
            <div className={styles.conversationdetail}>我们会尽快回复您</div>
          </div>
          <div className={styles.sendBtn} onClick={() => setFormVisible(!formVisible)}>
            发送消息
          </div>
        </div>
        <div className={`${styles.searchContainer} ${styles.card}`}>
          <div className={styles.headerText}>搜索帮助</div>
          <input
            type="text"
            placeholder="search"
            className={styles.searchInput}
            onFocus={() => setSearchVisible(!searchVisible)}
          />
          <div className={styles.questionContainer}>
            <div className={styles.question}>
              <div className={`${styles.questionTitle} oneTxtCut`}>我们是做什么的？</div>
              <IconChevronRight />
            </div>
            <div className={styles.question}>
              <div className={`${styles.questionTitle} oneTxtCut`}>
                我们是做什么的？我们是做什么的？我们是做什么的？我们是做什么的？
              </div>
              <IconChevronRight />
            </div>
          </div>
        </div>
      </div>
      <SideSheet
        title="访客信息"
        visible={formVisible}
        onCancel={() => setFormVisible(false)}
        placement="left"
        width="100%"
        getPopupContainer={() => document.querySelector('.consultingContainer')}
        zIndex={99999}
      >
        <VisitorForm />
      </SideSheet>
      <SideSheet
        title="搜索帮助"
        visible={searchVisible}
        onCancel={() => setSearchVisible(false)}
        placement="top"
        height="100%"
        getPopupContainer={() => document.querySelector('.consultingContainer')}
      >
        <SearchForm setFormVisible={setFormVisible} />
      </SideSheet>
    </div>
  );
};
