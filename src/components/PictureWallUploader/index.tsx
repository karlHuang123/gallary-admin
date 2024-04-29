import React, { useState } from 'react';
import { Upload, message, Modal } from 'antd';
import { useBoolean, useControllableValue } from 'ahooks';
import { UploadFile } from 'antd/lib/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import oss from '@/utils/oss';
import styles from './index.less';

const createFile = (uid: string | number, url: string, name?: string): UploadFile => {
  return {
    uid: String(uid),
    name: name ?? 'image',
    status: 'done',
    url,
    thumbUrl: url,
    size: 1,
    type: '1',
  };
};

export interface PictureWallUploaderProps {
  accept: string;
  maxSize: number;
  onChange?: (e: string[]) => void;
  value?: string[];
  text?: string;
  maxCount?: number;
  footer?: React.ReactNode;
  disabled?: boolean;
}

const PictureWallUploader: React.FC<PictureWallUploaderProps> = (props) => {
  const { accept, maxSize, text, maxCount, footer, disabled, value, onChange } = props;
  const [state, setState] = useControllableValue<string[]>(
    { value: value ?? [], onChange },
    { defaultValue: [] },
  );

  const [previewVisible, { setTrue: showPreview, setFalse: hidePreview }] = useBoolean(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const onFormUpload = async ({ file }: any) => {
    const fileName = file.name;
    const fileSize = file.size;

    if (fileSize > maxSize * 1024 * 1024) {
      message.error('文件体积超出上传限制');
      return;
    }

    try {
      const data = await oss.upload(file);
      const fileUrl = data.url;
      setState((list: string[]) => [...list, fileUrl]);
      message.success(`文件${fileName}上传成功`);
    } catch (error) {
      message.error('上传失败');
    }
  };

  const onRemove = (removedItem: UploadFile) => {
    const { url: removedUrl } = removedItem;
    setState((list: string[]) => list.filter((item) => item !== removedUrl));
  };

  const fileList: UploadFile[] = state.map((url, index) => createFile(index, url));

  const handlePreview = (file: UploadFile) => {
    if (file.url) {
      setPreviewImage(file.url);
      showPreview();
    }
  };

  const content = (
    <div>
      <PlusOutlined style={{ fontSize: '32px' }} />
      {text && <div>{text}</div>}
    </div>
  );

  return (
    <>
      <div className={styles.pictureWall}>
        <Upload
          accept={accept}
          listType="picture-card"
          fileList={fileList}
          customRequest={onFormUpload}
          onRemove={onRemove}
          onPreview={handlePreview}
          disabled={disabled}
        >
          {state.length < (maxCount ?? 3) && content}
        </Upload>
        {footer && <div className={styles.pictureWallFooter}>{footer}</div>}
      </div>
      <Modal visible={previewVisible} footer={null} onCancel={hidePreview}>
        <img alt="" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default PictureWallUploader;
