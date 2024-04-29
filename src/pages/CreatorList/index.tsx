import React, { useMemo, useCallback, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Avatar } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useAntdTable } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import { DEFAULT_PAGINATION, Result } from '@/utils/constants';
import CreatorEditModel from './components/CreatorEditModal';
import { getCreatorList, CreatorItem } from '@/services/creator/getCreatorList';
import { createNewCreator } from '@/services/creator/createNewCreator';
import { deleteCreator } from '@/services/creator/deleteCreator';
import { updateCreator } from '@/services/creator/updateCreator';

const CreatorList: React.FC = () => {
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);
  const [isCreateVisible, setIsCreateVisible] = useState<boolean>(false);

  const [searchForm] = Form.useForm();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const getTableData = useCallback(
    async ({ current, pageSize }, formData: object): Promise<Result<CreatorItem>> => {
      const { total, items: list } = await getCreatorList({
        pageNum: current,
        pageSize,
        ...formData,
      });
      return { total, list };
    },
    [],
  );

  const {
    tableProps,
    search,
    pagination: { current, changeCurrent },
  } = useAntdTable(getTableData, {
    form: searchForm,
  });
  Object.assign(tableProps.pagination, DEFAULT_PAGINATION);

  const refresh = () => {
    changeCurrent(current);
  };

  const handleCreate = useCallback(() => {
    setIsCreateVisible(true);
  }, []);

  const handleCreateCancel = () => {
    setIsCreateVisible(false);
  };

  const handleConfirmCreate = async () => {
    try {
      const fields = await createForm.validateFields();
      await createNewCreator(fields);
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
      await updateCreator(fields);
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

  const handleEdit = (record: CreatorItem) => {
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
          await deleteCreator(id);
          message.success('删除成功');
          refresh();
        } catch (e) {
          message.error('删除失败');
        }
      },
    });
  };

  const columns: ColumnsType<CreatorItem> = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 180,
        render: (_, record) => {
          return (
            <>
              <Avatar style={{ marginRight: 8 }} src={record.headImageUrl} />
              <span>{record.name}</span>
            </>
          );
        },
      },
      {
        title: '学校',
        dataIndex: 'collegeName',
      },
      {
        title: '学历',
        dataIndex: 'degree',
      },
      {
        title: '其他信息',
        dataIndex: 'awards',
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
      <Form form={searchForm} style={{ width: '100%', marginBottom: 32 }} layout="inline">
        <Form.Item label="姓名" name="name">
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="学校" name="collegeName">
          <Input placeholder="请输入" />
        </Form.Item>

        <div style={{ marginLeft: 'auto' }}>
          <Button type="primary" onClick={search.submit} style={{ marginRight: 10 }}>
            查询
          </Button>
          <Button onClick={search.reset}>重置</Button>
        </div>
      </Form>

      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleCreate}>
          添加作者
        </Button>
      </div>

      <Table {...tableProps} rowKey="id" columns={columns} />

      <CreatorEditModel
        title="新增"
        visible={isCreateVisible}
        onOk={handleConfirmCreate}
        onCancel={handleCreateCancel}
        form={createForm}
      />

      <CreatorEditModel
        title="编辑"
        visible={isEditVisible}
        onOk={handleConfirmEdit}
        onCancel={handleEditCancel}
        form={editForm}
      />
    </PageContainer>
  );
};

export default CreatorList;
