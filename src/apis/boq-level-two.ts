import request from '@/services/request';
import APIs from '@/constants/apis';

export function getBoqLevel2All(data: any) {
  return request({
    url: APIs.boqLevel2.getAll.url,
    method: APIs.boqLevel2.getAll.method,
    params: data.params
  });
}

export function createBoqLevel2(data: any) {
  return request({
    url: APIs.boqLevel2.createBoqLevel2.url,
    method: APIs.boqLevel2.createBoqLevel2.method,
    params: data.params
  });
}
