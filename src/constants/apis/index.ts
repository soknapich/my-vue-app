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
      url: 'auth/login',
      method: 'post',
    },
    verifyToken: {
      url: 'auth/verifyToken',
      method: 'post',
    },
    refreshToken: {
      url: 'auth/refreshToken',
      method: 'post',
    },
    verifyWebpage: {
      url: 'authentication/verify-webpage',
      method: 'post',
    }
  },
  user: {
    createUser: {
      url: 'users',
      method: 'post',
    },
    updateUser: {
      url: 'users',
      method: 'put',
    },
    getAllUser: {
      url: 'users',
      method: 'get',
    },
    getOneUser: {
      url: 'users',
      method: 'get',
    },
  }
};

export default APIs;