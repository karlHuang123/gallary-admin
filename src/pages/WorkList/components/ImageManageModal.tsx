import React from 'react';
import { Modal, Form, Input } from 'antd';
import type { ModalProps } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useRequest } from 'ahooks';
import { WorkItem } from '@/services/work/getWorkList';
import PictureWallUploader from '@/components/PictureWallUploader';

const maxPictureSize = 5;

export type ImageManageModalProps = Pick<ModalProps, 'title' | 'onOk' | 'onCancel' | 'visible'> & {
  form: FormInstance;
};

const ImageManageModal: React.FC<ImageManageModalProps> = (props) => {
  const { title, visible, onOk, onCancel, form } = props;

  return (
    <Modal
      bodyStyle={{ minHeight: 600 }}
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="作品">
          <Input disabled />
        </Form.Item>

        <Form.Item name="images" label="图片">
          <PictureWallUploader
            accept=".jpg,.jpeg,.png,.gif"
            maxSize={maxPictureSize}
            maxCount={20}
            text="上传照片"
            footer={`不超过${maxPictureSize}M`}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ImageManageModal;
