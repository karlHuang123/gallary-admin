import { request } from '@umijs/max';

export async function deleteCreator(id: string | number) {
  return request<void>('/student/delete', {
    method: 'DELETE',
    params: { id },
  });
}
