import { request } from '@umijs/max';

export async function deleteWork(id: string | number) {
  return request<void>('/product/delete', {
    method: 'DELETE',
    params: { id },
  });
}
