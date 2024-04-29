import { request } from '@umijs/max';
import { WorkItem } from './getWorkList';

export type CreateNewWorkReq = Partial<WorkItem> & {
  name: string;
};

export async function createNewWork(req: CreateNewWorkReq) {
  return request('/product/add', {
    method: 'POST',
    data: req,
  });
}
