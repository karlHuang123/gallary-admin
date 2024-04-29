import React, { useMemo, useCallback, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useAntdTable } from 'ahooks';
import { PageContainer } from '@ant-design/pro-components';
import { DEFAULT_PAGINATION, Result } from '@/utils/constants';
import WorkEditModal from './components/WorkEditModal';
import { getWorkList, WorkItem } from '@/services/work/getWorkList';
import { createNewWork } from '@/services/work/createNewWork';
import { deleteWork } from '@/services/work/deleteWork';
import { updateWork } from '@/services/work/updateWork';
import ImageManageModal from './components/ImageManageModal';
import { updateWorkImages } from '@/services/work/updateWorkImages';

const WorkList: React.FC = () => {
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);
  const [isCreateVisible, setIsCreateVisible] = useState<boolean>(false);
  const [isImageManagerVisible, setIsImageManagerVisible] = useState<boolean>(false);

  const [searchForm] = Form.useForm();
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [imageForm] = Form.useForm();

  const getTableData = useCallback(
    async ({ current, pageSize }, formData: object): Promise<Result<WorkItem>> => {
      const { total, items: list } = await getWorkList({
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
      await createNewWork(fields);
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
      await updateWork(fields);
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

  const handleEdit = (record: WorkItem) => {
    editForm.setFieldsValue(record);
    setIsEditVisible(true);
  };

  const handleImageManage = (record: WorkItem) => {
    const { id, name, picsList } = record;
    imageForm.setFieldsValue({ id, name, images: picsList?.map((p) => p.resImageUrl) });
    setIsImageManagerVisible(true);
  };

  const handleConfirmImage = async () => {
    try {
      const { id, images } = await imageForm.validateFields();
      await updateWorkImages({
        productId: id,
        picsList: images.map((imgUrl: string) => ({ resImageUrl: imgUrl })),
      });
      message.success('编辑成功');
      setIsImageManagerVisible(false);
      refresh();
    } catch (e) {
      message.error('编辑失败');
    }
  };

  const handleCancelImage = () => {
    setIsImageManagerVisible(false);
  };

  const handleDelete = (id: number | string) => {
    Modal.confirm({
      title: '删除确认',
      content: '确定要删除吗?',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteWork(id);
          message.success('删除成功');
          refresh();
        } catch (e) {
          message.error('删除失败');
        }
      },
    });
  };

  const columns: ColumnsType<WorkItem> = useMemo(() => {
    return [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '作者',
        dataIndex: 'studentName',
      },
      {
        title: '分类',
        dataIndex: 'catalogName',
      },
      {
        title: '展板图',
        dataIndex: 'livePicUrl',
        render: (value, record) => (
          <img style={{ height: 80 }} src={value} alt={`${record.name}的展板图`} />
        ),
        width: 180,
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '查看',
        dataIndex: 'readNum',
      },
      {
        title: '点赞',
        dataIndex: 'goodNum',
      },
      {
        title: '分享',
        dataIndex: 'shareNum',
      },
      {
        title: '图片',
        dataIndex: 'picsNum',
      },
      {
        title: '操作',
        fixed: 'right',
        render: (_, record) => {
          return (
            <div>
              <a onClick={() => handleImageManage(record)} style={{ marginRight: 16 }}>
                图片管理
              </a>
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
        <Form.Item label="作者" name="studentName">
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="分类" name="catalogName">
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
          新增作品
        </Button>
      </div>

      <Table {...tableProps} rowKey="id" columns={columns} />

      <WorkEditModal
        title="新增"
        visible={isCreateVisible}
        onOk={handleConfirmCreate}
        onCancel={handleCreateCancel}
        form={createForm}
      />

      <WorkEditModal
        title="编辑"
        visible={isEditVisible}
        onOk={handleConfirmEdit}
        onCancel={handleEditCancel}
        form={editForm}
      />

      <ImageManageModal
        title="图片管理"
        visible={isImageManagerVisible}
        onOk={handleConfirmImage}
        onCancel={handleCancelImage}
        form={imageForm}
      />
    </PageContainer>
  );
};

export default WorkList;
