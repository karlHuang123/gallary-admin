import React from 'react';
import { Modal, Form, Input, ModalProps } from 'antd';
import FileUploader from '@/components/FileUploader/index';
import { FormInstance } from 'antd/es/form/Form';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export type CreatorEditModelProps = Pick<ModalProps, 'title' | 'onOk' | 'onCancel' | 'visible'> & {
  form: FormInstance;
};

const CreatorEditModel: React.FC<CreatorEditModelProps> = (props) => {
  const { title, visible, onOk, onCancel, form } = props;
  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form {...layout} form={form} layout="horizontal">
        <Form.Item name="id" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="姓名"
          required
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="collegeName"
          label="学校"
          required
          rules={[{ required: true, message: '请输入学校' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="degree"
          label="学历"
          required
          rules={[{ required: true, message: '请输入学历' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item name="awards" label="其他信息">
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="headImageUrl"
          label="头像"
          required
          rules={[{ required: true, message: '请上传头像' }]}
        >
          <FileUploader
            label="上传图片"
            showPic
            maxSize={5}
            accept=".jpg,.png,.jpeg"
            width={100}
            height={100}
            disabled={false}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatorEditModel;
