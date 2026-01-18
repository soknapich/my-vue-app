import request from '@/services/request';
import APIs from '@/constants/apis';

export function getAllUsers(data: any) {
  return request({
    url: APIs.user.getAll.url,
    method: APIs.user.getAll.method,
    params: data.params
  });
}

export function getOneUser(data: any) {
  return request({
    url: `${APIs.user.getOne.url}/${data.params.id}`,
    method: APIs.user.getOne.method
  });
};