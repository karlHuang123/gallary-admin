import { request } from '@umijs/max';
import { CreatorItem } from './getCreatorList';

export async function updateCreator(req: CreatorItem) {
  await request('/student/update', {
    method: 'PUT',
    data: req,
  });
}
