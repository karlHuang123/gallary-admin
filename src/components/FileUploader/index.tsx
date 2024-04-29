import React, { useState, useCallback, useMemo } from 'react';
import { Upload, message } from 'antd';
import oss from '@/utils/oss';
import styles from './index.less';

export interface FileUploaderProps {
  label?: string;
  accept: string;
  maxSize: number;
  onChange?: (e: React.ChangeEvent | string) => void;
  value?: string;
  width?: number;
  height?: number;
  footer?: React.ReactNode;
  uploadName?: string;
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { label, maxSize, onChange, value, width, height, uploadName, footer, ...restProps } =
    props;

  const onFormUpload = useCallback(
    async ({ file }) => {
      const fileName = file.name;
      const fileSize = file.size;

      if (fileSize > maxSize * 1024 * 1024) {
        message.error(`文件体积超出上传限制(${maxSize}M)`);
        return;
      }

      try {
        setLoading(true);
        const data = await oss.upload(file, uploadName);
        const fileUrl = data.url;
        if (onChange) {
          onChange(fileUrl);
        }
        message.success(`文件${fileName}上传成功`);
      } catch (error) {
        message.error('上传失败');
      } finally {
        setLoading(false);
      }
    },
    [maxSize, uploadName, onChange],
  );

  const style = useMemo(() => ({ width: `${width}px`, height: `${height}px` }), [width, height]);

  return (
    <Upload showUploadList={false} customRequest={onFormUpload} {...restProps}>
      <div className={styles.showpic} style={style}>
        {value && (
          <img
            alt="默认上传背景图"
            src={value}
            width={width || 200}
            height={height || 200}
            style={{ backgroundSize: '100%' }}
          />
        )}
        {(loading || !value) && (
          <div className={styles.showPicWrapper}>{!value && <div>{label ?? '单击上传'}</div>}</div>
        )}
      </div>
      {footer && (
        <div style={{ margin: '10px auto', textAlign: 'center', fontWeight: 'normal' }}>
          {footer}
        </div>
      )}
    </Upload>
  );
};

export default FileUploader;
