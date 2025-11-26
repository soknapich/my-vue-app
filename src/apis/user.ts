import request from '@/services/request';
import APIs from '@/constants/apis';

export function getAll(data: any) {
  return request({
    url: APIs.user.getAllUser.url,
    method: APIs.user.getAllUser.method,
    params: data.params
  });
}

export function getOneUser(data: any) {
  return request({
    url: `${APIs.user.getOneUser.url}/${data.params.id}`,
    method: APIs.user.getOneUser.method
  });
};