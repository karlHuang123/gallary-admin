import { request } from '@umijs/max';
import { Response } from '@/type';

export interface UserInfo {
  username: string;
}

export async function getUserInfo(): Promise<Response<UserInfo>> {
  const res = await request('/user/verifyToken', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
  // return {
  //   statusCode: 200,
  //   msg: 'test',
  //   data: {
  //     username: 'test',
  //   },
  // };
}
