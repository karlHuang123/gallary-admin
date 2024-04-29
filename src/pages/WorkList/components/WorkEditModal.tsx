import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { ModalProps } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useRequest } from 'ahooks';
import { getDeptList } from '@/services/dept/getDeptList';
import { getCreatorListByName } from '@/services/creator/getCreatorList';
import FileUploader from '@/components/FileUploader';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export type WorkEditModelProps = Pick<ModalProps, 'title' | 'onOk' | 'onCancel' | 'visible'> & {
  form: FormInstance;
};

const WorkEditModal: React.FC<WorkEditModelProps> = (props) => {
  const { title, visible, onOk, onCancel, form } = props;

  const { data: deptList } = useRequest(getDeptList);
  const { data: creatorList } = useRequest(getCreatorListByName);

  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form {...layout} form={form} layout="horizontal">
        <Form.Item name="id" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="名称"
          required
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="studentId"
          label="作者"
          required
          rules={[{ required: true, message: '请填入作者' }]}
        >
          <Select<string | number> showSearch placeholder="请输入" optionFilterProp="children">
            {creatorList?.map((creator) => {
              const { id, name } = creator;
              return (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="catalogId"
          label="分类"
          required
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select<string | number>>
            {deptList?.map((dept) => {
              const { id, name } = dept;
              return (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="livePicUrl"
          label="展板图"
          required
          rules={[{ required: true, message: '请上传展板图' }]}
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

        <Form.Item name="description" label="描述">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WorkEditModal;
