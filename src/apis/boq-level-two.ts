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

export function updateBoqLevel2(id:any, data: any) {
  return request({
    url: `${APIs.boqLevel2.updateBoqLevel2.url}/${id}`,
    method: APIs.boqLevel2.updateBoqLevel2.method,
    params: data.params
  });
}

export function deletBoqLevel2(id: any) {
  return request({
    url: `${APIs.boqLevel2.deleteBoqLevel2.url}/${id}`,
    method: APIs.boqLevel2.deleteBoqLevel2.method,
  });
}

export function copyBoqLevel2(id: any) {
  return request({
    url: `${APIs.boqLevel2.copyBoqLevel2.url}/${id}`,
    method: APIs.boqLevel2.copyBoqLevel2.method,
  });
}

export function copyMultipleBoqLevel2(ids: number[]) {
  return request({
    url: `${APIs.boqLevel2.copyMultipleBoqLevel2.url}`,
    method: APIs.boqLevel2.copyMultipleBoqLevel2.method,
    data: {
      ids
    }
  });
}

