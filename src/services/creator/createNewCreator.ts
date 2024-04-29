import { request } from '@umijs/max';
import { CreatorItem } from './getCreatorList';

export type CreateNewCreatorReq = Omit<CreatorItem, 'id'>;

export async function createNewCreator(req: CreateNewCreatorReq) {
  return request('/student/add', {
    method: 'POST',
    data: req,
  });
}
