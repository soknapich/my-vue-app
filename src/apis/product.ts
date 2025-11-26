import request from '@/services/request';
import APIs from '@/constants/apis';

export function getAll(data: any) {
  return request({
    url: APIs.product.getAll.url,
    method: APIs.product.getAll.method,
    params: data.params
  });
}
