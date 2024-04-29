import { request } from '@umijs/max';

export interface DeptItem {
  id: string | number;
  name: string;
  sortNum: number;
}

export async function getDeptList() {
  const res = await request<{ items: DeptItem[] }>('/catalog/listAll', {
    method: 'GET',
  });
  const resList = res?.items ?? [];
  return resList.sort((a, b) => a.sortNum - b.sortNum);
}
