import request from '@/services/request';
import APIs from '@/constants/apis';

export function getAllUsers(data: any) {
  return request({
    url: APIs.user.getAllUser.url,
    method: APIs.user.getAllUser.method,
    params: data.params
  });
}

export function getOneUser(data: any) {
  return request({
    url: `${APIs.user.getOne.url}/${data.params.id}`,
    method: APIs.user.getOne.method
  });
}

export function createUserConcept(data: any) {
  return request({
    url: APIs.user.createConcept.url,
    method: APIs.user.createConcept.method,
    params: data.params
  });
}

export function deleteUserConcept(id: any) {
  return request({
    url: `${APIs.user.deleteConcept.url}/${id}`,
    method: APIs.user.deleteConcept.method
  });
}