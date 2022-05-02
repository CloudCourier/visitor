import { useState } from 'react';
import { AutoComplete, Avatar, Empty } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { IllustrationNoContent } from '@douyinfe/semi-illustrations';
import { useFrame } from '@/components/customIframe';
import customer1 from '@images/customer1.svg';
import customer2 from '@images/customer2.svg';
import customer3 from '@images/customer3.svg';
import styles from './index.scss';

export default ({ setFormVisible }) => {
  const { document } = useFrame();

  const [data, setData] = useState([]);
  const [list, setList] = useState([
    { name: '夏可漫', email: 'xiakeman@example.com', abbr: 'XK', color: 'amber' },
    { name: '申悦', email: 'shenyue@example.com', abbr: 'SY', color: 'indigo' },
    { name: '曲晨一', email: 'quchenyi@example.com', abbr: 'CY', color: 'blue' },
    { name: '文嘉茂', email: 'wenjiamao@example.com', abbr: 'JM', color: 'cyan' },
  ]);

  const search = value => {
    let result;
    if (value) {
      result = list.map(item => {
        return { ...item, value: item.name, label: item.email };
      });
    } else {
      result = [];
    }
    setData(result);
  };

  const renderOption = item => {
    const optionStyle = {
      display: 'flex',
    };
    return (
      <>
        <Avatar color={item.color} size="small">
          {item.abbr}
        </Avatar>
        <div style={{ marginLeft: 4 }}>
          <div style={{ fontSize: 14, marginLeft: 4 }}>{item.name}</div>
          <div style={{ marginLeft: 4 }}>{item.email}</div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.searchFormContainer}>
      <AutoComplete
        data={data}
        prefix={<IconSearch />}
        style={{ width: '300px', backgroundColor: 'white', flex: '0 1 40px' }}
        renderSelectedItem={option => option.email}
        renderItem={renderOption}
        onSearch={search}
        dropdownStyle={{ width: '300px' }}
        emptyContent={
          <Empty
            style={{ padding: 12, width: 300 }}
            image={<IllustrationNoContent style={{ width: 200, height: 200 }} />}
            description={'暂无内容'}
          />
        }
        onSelect={v => console.log(v)}
        getPopupContainer={() => document.querySelector('.consultingContainer')}
      ></AutoComplete>
      <div className={styles.searchResult}>我是搜索内容</div>
      <div className={`${styles.ConversationContainer} ${styles.card}`}>
        <div className={styles.conversation}>
          <div className={styles.conversationLogo}>
            <img src={customer1} alt="logo" />
            <img src={customer2} alt="logo" />
            <img src={customer3} alt="logo" />
          </div>
          <div className={styles.conversationdetail}>如果您需要帮助，请咨询客服</div>
        </div>
        <div className={styles.sendBtn} onClick={() => setFormVisible(true)}>
          发送消息
        </div>
      </div>
    </div>
  );
};
