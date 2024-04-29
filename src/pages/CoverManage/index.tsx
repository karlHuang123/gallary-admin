import FileUploader from '@/components/FileUploader';
import { BASE_URL } from '@/utils/oss';
import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Form } from 'antd';
import React from 'react';
import styles from './index.less';

const BG_MOBILE = `${BASE_URL}/gallery/bg-mobile.png`;
const BG_DESKTOP = `${BASE_URL}/gallery/bg-desktop.png`;
const BANNER = `${BASE_URL}/gallery/banner.png`;
const POSTER = `${BASE_URL}/gallery/poster.png`;

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Alert
        message={
          <div>
            均为PNG图片，上传前推荐使用 <a href="https://tinypng.com/">https://tinypng.com</a> 压缩
          </div>
        }
        type="warning"
        showIcon
        closable
      />
      <Card>
        <Form layout="vertical" className={styles.form}>
          {/* <Form.Item
            name="name"
            label="姓名"
            required
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入" style={{ width: 500 }} />
          </Form.Item> */}

          <Form.Item
            name="bgMobile"
            className={styles.formItem}
            initialValue={BG_MOBILE}
            label="移动端背景(PNG)"
          >
            <FileUploader
              footer="点击更换"
              uploadName="gallery/bg-mobile.png"
              maxSize={5}
              accept=".png"
              width={300}
              height={560}
            />
          </Form.Item>

          <Form.Item
            name="bgDesktop"
            className={styles.formItem}
            initialValue={BG_DESKTOP}
            label="桌面端背景(PNG)"
          >
            <FileUploader
              footer="点击更换"
              uploadName="gallery/bg-desktop.png"
              maxSize={5}
              accept=".png"
              width={960}
              height={540}
            />
          </Form.Item>

          <Form.Item
            name="banner"
            className={styles.formItem}
            initialValue={BANNER}
            label="作品页横幅(PNG)"
          >
            <FileUploader
              footer="点击更换"
              uploadName="gallery/banner.png"
              maxSize={5}
              accept=".png"
              width={400}
              height={77}
            />
          </Form.Item>

          <Form.Item
            name="poster"
            className={styles.formItem}
            initialValue={POSTER}
            label="大海报(PNG) (宽/高=2/3)"
          >
            <FileUploader
              footer="点击更换"
              uploadName="gallery/poster.png"
              maxSize={5}
              accept=".png"
              width={360}
              height={540}
            />
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
