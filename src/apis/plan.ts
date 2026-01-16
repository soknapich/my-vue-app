import request from "@/services/request";
import APIs from "@/constants/apis";

export function getAll(data: any) {
  return request({
    url: APIs.plan.getAll.url,
    method: APIs.plan.getAll.method,
    params: data.params,
  });
}

export function getNext(url: string, data: any) {
  return request({
    url: url,
    method: "get",
    params: data.params,
  });
}

export function createItem(data: any) {
  return request({
    url: APIs.boqItem.createBoqItem.url,
    method: APIs.boqItem.createBoqItem.method,
    params: data.params,
  });
}

export function updateItem(id: any, data: any) {
  return request({
    url: `${APIs.boqItem.updateBoqItem.url}/${id}`,
    method: APIs.boqItem.updateBoqItem.method,
    params: data.params,
  });
}

export function deletItem(id: any) {
  return request({
    url: `${APIs.boqItem.deleteBoqItem.url}/${id}`,
    method: APIs.boqItem.deleteBoqItem.method,
  });
}
