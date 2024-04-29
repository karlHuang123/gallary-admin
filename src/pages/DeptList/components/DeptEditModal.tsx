import React from 'react';
import { Modal, Form, Input, ModalProps, InputNumber } from 'antd';
import { FormInstance } from 'antd/es/form/Form';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export type DeptEditModelProps = Pick<ModalProps, 'title' | 'onOk' | 'onCancel' | 'visible'> & {
  form: FormInstance;
};

const DeptEditModal: React.FC<DeptEditModelProps> = (props) => {
  const { title, visible, onOk, onCancel, form } = props;
  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form {...layout} form={form} layout="horizontal">
        <Form.Item name="id" noStyle hidden>
          <Input />
        </Form.Item>

        <Form.Item
          name="sortNum"
          label="序号"
          required
          rules={[{ required: true, message: '请输入序号' }]}
        >
          <InputNumber placeholder="请输入序号" />
        </Form.Item>

        <Form.Item
          name="name"
          label="名称"
          required
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DeptEditModal;
