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
  getAllUserRole: ApiAction;
}

interface User {
  createUser: ApiAction;
  updateUser: ApiAction;
  getAllUser: ApiAction;
  getOneUser: ApiAction;
}

interface UserAd {
  getAllUserAd: ApiAction;
}

interface TransactionLog {
  getAll: ApiAction;
  getOne: ApiAction;
}
interface UploadVoucherDump {
  upload: ApiAction;
}
interface GeneralLedgerEntry {
  getAll: ApiAction;
  exportFile: ApiAction
}

interface ChartOfAccount {
  getAll: ApiAction;
  syncAll: ApiAction;
}

interface ApiConfig {
  authentication: Authentication;
  user: User;
  userAd: UserAd;
  transactionLog: TransactionLog;
  voucherDump: UploadVoucherDump;
  generalLedgerEntry: GeneralLedgerEntry;
  chartOfAccount: ChartOfAccount;
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
  },
  userAd: {
    getAllUserAd: {
      url: 'userAd',
      method: 'get',
    },
  },
  transactionLog: {
    getAll: {
      url: 'transaction-log',
      method: 'get',
    },
    getOne: {
      url: 'transaction-log',
      method: 'get',
    },
  },
  voucherDump: {
    upload: {
      url: 'mds/upload-voucher-dump-manually',
      method: 'post',
    },
  },
  generalLedgerEntry: {
    getAll: {
      url: '/users',
      method: 'get',
    },
    exportFile: {
      url: 'gl-entry/export-file',
      method: 'post',
    },

  },
  chartOfAccount: {
    getAll: {
      url: 'gl-entry/chart-of-account',
      method: 'get',
    },

    syncAll: {
      url: 'gl-entry/sync-chart-of-account',
      method: 'post',
    },
  },
};

export default APIs;