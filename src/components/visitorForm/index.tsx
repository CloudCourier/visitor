import { Button, Form, ToastFactory } from '@douyinfe/semi-ui';
import { useContext, useRef, useState } from 'react';
import { BaseFormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';
import { IconFilpVertical } from '@douyinfe/semi-icons';
import { pageController } from '../../page/home';

export default () => {
  const setChatPage = useContext(pageController);
  const [loading, setLoading] = useState(false);
  const formApi = useRef<BaseFormApi>();
  const ToastInCustomContainer = ToastFactory.create({
    getPopupContainer: () => document.querySelector('.consultingContainer'),
  });
  const handleSubmit = form => {
    const { name } = form;
    setChatPage(true);
  };
  return (
    <Form
      getFormApi={api => (formApi.current = api)}
      onSubmit={form => handleSubmit(form)}
      disabled={loading}
    >
      <>
        <Form.Input
          field="name"
          rules={[{ required: true, message: '请输入名称' }]}
          label="尊称"
          style={{ width: '100%' }}
          placeholder="尊称"
        ></Form.Input>
        <Form.Input
          field="contact"
          rules={[{ required: true, message: '请输入名称' }]}
          label="联系方式"
          style={{ width: '100%' }}
          placeholder="邮箱或手机"
        ></Form.Input>
        <Button
          htmlType="submit"
          icon={<IconFilpVertical />}
          type="tertiary"
          block
          style={{ marginRight: 10, height: '40px', color: 'black', marginTop: '20px' }}
          disabled={loading}
        >
          发送
        </Button>
      </>
    </Form>
  );
};
