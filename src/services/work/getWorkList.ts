import { request } from '@umijs/max';
import { PagedResponse } from '@/type';

export interface WorkImageItem {
  id: string | number;
  resImageUrl: string;
}

export interface WorkItem {
  id: string | number;
  name: string;
  description: string;
  catalogId: string | number;
  catalogName: string;
  studentId: number | string;
  studentName: string;
  goodNum: number;
  readNum: number;
  shareNum: number;
  livePicUrl: string;
  picsNum: number;
  picsList: WorkImageItem[];
}

export interface GetWorkListReq {
  pageNum?: number;
  pageSize?: number;
  catalogName?: number;
  studentName?: string;
}

export async function getWorkList(req: GetWorkListReq): Promise<PagedResponse<WorkItem>> {
  const res = await request('/product/list', {
    method: 'GET',
    params: req,
  });
  return res;
}
