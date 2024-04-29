import { Response } from '@/type';
import { request } from '@umijs/max';

export interface LoginResult {
  Authorization: string;
  username: string;
}

// loginName: 'skdadmin',
// passWord: 'gallery123!',
export async function login(username: string, password: string) {
  const result = await request<Response<LoginResult>>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      loginName: username,
      passWord: password,
    },
  });
  return result;
  // return {
  //   statusCode: 200,
  //   msg: 'test',
  //   data: {
  //     Authorization: 'test',
  //     username: 'test',
  //   },
  // };
}
