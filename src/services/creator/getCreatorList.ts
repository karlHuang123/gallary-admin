import { request } from '@umijs/max';
import { PagedResponse, Response } from '@/type';

export interface CreatorItem {
  id: string | number;
  name: string;
  collegeName: string;
  degree: string;
  headImageUrl: string;
  awards: string;
}

export interface GetCreatorListReq {
  pageNum?: number;
  pageSize?: number;
  name?: number;
  collegeName?: string;
}

export async function getCreatorList(req: GetCreatorListReq): Promise<PagedResponse<CreatorItem>> {
  const res = await request('/student/list', {
    method: 'GET',
    params: req,
  });
  return res;
}

export async function getCreatorListByName(name: string) {
  const res = await request<Response<CreatorItem[]>>('/student/listByName', {
    method: 'GET',
    params: name ? { name } : null,
  });
  return res?.data ?? [];
}
