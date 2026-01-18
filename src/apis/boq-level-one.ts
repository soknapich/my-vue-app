import request from '@/services/request';
import APIs from '@/constants/apis';

export function getBoqLevel1All(data: any) {
  return request({
    url: APIs.boqLevel1.getAll.url,
    method: APIs.boqLevel1.getAll.method,
    params: data.params
  });
}

export function updateBoqLevel1(id:any, data: any) {
  return request({
    url: `${APIs.boqLevel1.updateBoqLevel1.url}/${id}`,
    method: APIs.boqLevel1.updateBoqLevel1.method,
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

export function deletBoqLevel1(id: any) {
  return request({
    url: `${APIs.boqLevel1.deleteBoqLevel1.url}/${id}`,
    method: APIs.boqLevel1.deleteBoqLevel1.method,
  });
}

export function copyBoqLevel1(id: any) {
  return request({
    url: `${APIs.boqLevel1.copyBoqLevel1.url}/${id}`,
    method: APIs.boqLevel1.copyBoqLevel1.method,
  });
}
