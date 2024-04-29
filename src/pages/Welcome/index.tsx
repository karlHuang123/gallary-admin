import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Card, Typography } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Typography.Text strong>欢迎使用</Typography.Text>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
