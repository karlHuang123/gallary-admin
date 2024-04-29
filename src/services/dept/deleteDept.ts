import { request } from '@umijs/max';

export async function deleteDept(id: number | string) {
  return request<void>('/catalog/delete', {
    method: 'DELETE',
    params: { id },
  });
}
