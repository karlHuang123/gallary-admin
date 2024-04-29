import React, { useState } from 'react';
import { login } from '@/services/user/userLogin';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Alert, message } from 'antd';
import auth from '@/utils/auth';
import styles from './index.less';

const LoginMessage: React.FC<{ content: string }> = ({ content }) => {
  return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
};

const Login: React.FC = () => {
  const [errorState, setErrorState] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const { username, password, autoLogin } = values;
      if (!username || !password) {
        message.error('用户名或密码不能为空');
        return;
      }
      const msg = await login(username, password);
      const isSuccess = msg.statusCode === 200;

      if (isSuccess) {
        auth.save(msg.data.Authorization, autoLogin);
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }

      setErrorState(!isSuccess);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  const title = <div style={{ color: '#ff5e4d', height: 100 }}>SKD Gallery Admin</div>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          // @ts-ignore
          title={title}
          initialValues={{ autoLogin: true }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {errorState && <LoginMessage content={'错误的用户名和密码'} />}
          <ProFormText
            name="username"
            fieldProps={{ size: 'large', prefix: <UserOutlined className={styles.prefixIcon} /> }}
            placeholder={'请输入用户名'}
            rules={[{ required: true, message: '用户名是必填项！' }]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={'请输入密码'}
            rules={[{ required: true, message: '密码是必填项！' }]}
          />

          <div style={{ marginBottom: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
