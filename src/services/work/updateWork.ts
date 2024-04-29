import { request } from '@umijs/max';

export interface UpdateWorkReq {
  id: string | number;
  name: string;
  description: string;
  catalogId: string | number;
  studentId: string | number;
}

export async function updateWork(req: UpdateWorkReq) {
  await request('/product/update', {
    method: 'PUT',
    data: req,
  });
}
