import React, { useMemo, useCallback, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRequest } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import { DeptItem, getDeptList } from '@/services/dept/getDeptList';
import { deleteDept } from '@/services/dept/deleteDept';
import DeptEditModal from './components/DeptEditModal';
import { createNewDept } from '@/services/dept/createNewDept';
import { updateDept } from '@/services/dept/updateDept';

const DeptList: React.FC = () => {
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);
  const [isCreateVisible, setIsCreateVisible] = useState<boolean>(false);

  const { data: list = [], loading, run: refresh } = useRequest(getDeptList);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const handleCreate = () => {
    const defaultSortNum =
      list.reduce((pre, curr) => {
        return Math.max(pre, curr.sortNum);
      }, 1) + 1;
    createForm.setFieldsValue({ sortNum: defaultSortNum });
    setIsCreateVisible(true);
  };

  const handleCreateCancel = () => {
    setIsCreateVisible(false);
  };

  const handleConfirmCreate = async () => {
    try {
      const fields = await createForm.validateFields();
      await createNewDept(fields);
      message.success('添加成功');
      setIsCreateVisible(false);
      refresh();
    } catch (e) {
      message.error('添加失败');
    }
  };
  const handleConfirmEdit = async () => {
    try {
      const fields = await editForm.validateFields();
      await updateDept(fields);
      message.success('编辑成功');
      setIsEditVisible(false);
      refresh();
    } catch (e) {
      message.error('编辑失败');
    }
  };

  const handleEditCancel = useCallback(() => {
    setIsEditVisible(false);
  }, []);

  const handleEdit = (record: DeptItem) => {
    editForm.setFieldsValue(record);
    setIsEditVisible(true);
  };

  const handleDelete = (id: number | string) => {
    Modal.confirm({
      title: '删除确认',
      content: '确定要删除吗?',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteDept(id);
          message.success('删除成功');
          refresh();
        } catch (e) {
          message.error('删除失败');
        }
      },
    });
  };

  const columns: ColumnsType<DeptItem> = useMemo(() => {
    return [
      {
        title: '序号',
        dataIndex: 'sortNum',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '操作',
        fixed: 'right',
        render: (_, record) => {
          return (
            <div>
              <a onClick={() => handleEdit(record)} style={{ marginRight: 16 }}>
                编辑
              </a>
              <a onClick={() => handleDelete(record.id)}>删除</a>
            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <PageContainer>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleCreate}>
          新建分类
        </Button>
      </div>

      <Table
        size="small"
        loading={loading}
        pagination={false}
        dataSource={list}
        rowKey="id"
        columns={columns}
      />

      <DeptEditModal
        title="新建"
        visible={isCreateVisible}
        onOk={handleConfirmCreate}
        onCancel={handleCreateCancel}
        form={createForm}
      />

      <DeptEditModal
        title="编辑"
        visible={isEditVisible}
        onOk={handleConfirmEdit}
        onCancel={handleEditCancel}
        form={editForm}
      />
    </PageContainer>
  );
};

export default DeptList;
