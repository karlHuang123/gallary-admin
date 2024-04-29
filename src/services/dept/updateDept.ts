import { request } from '@umijs/max';
import { DeptItem } from './getDeptList';

export async function updateDept(req: DeptItem) {
  return request('/catalog/update', {
    method: 'PUT',
    data: req,
  });
}
