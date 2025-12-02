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
      url: 'oauth/token',
      method: 'post',
    },
    verifyToken: {
      url: 'api/verify_token',
      method: 'post',
    },
    refreshToken: {
      url: 'oauth/token',
      method: 'post',
    },
    verifyWebpage: {
      url: 'authentication/verify-webpage',
      method: 'post',
    }
  },
  user: {
    createUser: {
      url: 'api/user',
      method: 'post',
    },
    updateUser: {
      url: 'api/user',
      method: 'put',
    },
    getAllUser: {
      url: 'api/user',
      method: 'get',
    },
    getOneUser: {
      url: 'api/user',
      method: 'get',
    },
  }
};

export default APIs;