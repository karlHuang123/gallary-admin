import { request } from '@umijs/max';
import { WorkImageItem } from './getWorkList';

export interface UpdateWorkImagesReq {
  productId: string | number;
  picsList: WorkImageItem[];
}

export async function updateWorkImages(req: UpdateWorkImagesReq) {
  await request('/product/updatePicsList', {
    method: 'POST',
    data: req,
  });
}
