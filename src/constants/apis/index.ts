type HttpMethod = 'get' | 'post' | 'patch' | 'put';

interface ApiAction {
  url: string;
  method: HttpMethod;
}

interface Authentication {
  signin: ApiAction;
  verifyToken: ApiAction;
  refreshToken: ApiAction;
  verifyWebpage: ApiAction;
}

interface User {
  createUser: ApiAction;
  updateUser: ApiAction;
  getAllUser: ApiAction;
  getOneUser: ApiAction;
}


interface ChartOfAccount {
  getAll: ApiAction;
  syncAll: ApiAction;
}

interface ApiConfig {
  authentication: Authentication;
  user: User;
}

const APIs: ApiConfig = {
  authentication: {
    signin: {
      url: 'login',
      method: 'post',
    },
    verifyToken: {
      url: 'verify-token',
      method: 'post',
    },
    refreshToken: {
      url: 'refresh-token',
      method: 'post',
    },
    verifyWebpage: {
      url: 'authentication/verify-webpage',
      method: 'post',
    }
  },
  user: {
    createUser: {
      url: 'user',
      method: 'post',
    },
    updateUser: {
      url: 'user',
      method: 'put',
    },
    getAllUser: {
      url: 'user',
      method: 'get',
    },
    getOneUser: {
      url: 'user',
      method: 'get',
    },
  }
};

export default APIs;