import request from '@/services/request';
import APIs from '@/constants/apis';

export function getAll(data: any) {
  return request({
    url: APIs.plan.getAll.url,
    method: APIs.plan.getAll.method,
    params: data.params
  });
}
