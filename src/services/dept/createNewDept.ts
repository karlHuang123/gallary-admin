import { request } from '@umijs/max';
import { DeptItem } from './getDeptList';

export type CreateNewDeptReq = Omit<DeptItem, 'id'>;

export async function createNewDept(req: CreateNewDeptReq) {
  return request('/catalog/add', {
    method: 'POST',
    data: req,
  });
}
