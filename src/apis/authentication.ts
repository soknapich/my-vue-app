import request from '@/services/request';
import APIs from '@/constants/apis';

export function signin(data: any) {
  return request({
    url: APIs.authentication.signin.url,
    method: APIs.authentication.signin.method,
    data
  });
}

export function verifyToken(data: any) {  
  return request({
    url: APIs.authentication.verifyToken.url,
    method: APIs.authentication.verifyToken.method,
    data
  });
}

export function doRefreshToken(data: any) {
  return request({
    url: APIs.authentication.refreshToken.url,
    method: APIs.authentication.refreshToken.method,
    data
  });
}

export function verifyWebpage(data: any) {
  return request({
    url: APIs.authentication.verifyWebpage.url,
    method: APIs.authentication.verifyWebpage.method,
    data: {
      name: data
    }
  });
}
