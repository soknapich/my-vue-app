import request from '@/services/request';
import APIs from '@/constants/apis';

export function getBoqLevel1All(data: any) {
  return request({
    url: APIs.boqLevel1.getAll.url,
    method: APIs.boqLevel1.getAll.method,
    params: data.params
  });
}

export function createBoqLevel1(data: any) {
  return request({
    url: APIs.boqLevel1.createBoqLevel1.url,
    method: APIs.boqLevel1.createBoqLevel1.method,
    params: data.params
  });
}
