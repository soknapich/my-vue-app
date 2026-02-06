type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

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
  createConcept: ApiAction;
  deleteConcept: ApiAction;
}

interface Plan {
  getAll: ApiAction;
}

interface BoqLevel1 {
  getAll: ApiAction;
  createBoqLevel1: ApiAction;
  updateBoqLevel1: ApiAction;
  getOneBoqLevel1: ApiAction;
  deleteBoqLevel1: ApiAction;
  copyBoqLevel1: ApiAction;
  copyAllBoqLevel1: ApiAction;
}

interface BoqLevel2 {
  getAll: ApiAction;
  createBoqLevel2: ApiAction;
  updateBoqLevel2: ApiAction;
  getOneBoqLevel2: ApiAction;
  deleteBoqLevel2: ApiAction;
  copyBoqLevel2: ApiAction
}

interface BoqItem {
  createBoqItem: ApiAction;
  updateBoqItem: ApiAction;
  updateActualBoqItem: ApiAction;
  deleteBoqItem: ApiAction;
  copyBoqItem: ApiAction;
}


interface ApiConfig {
  authentication: Authentication;
  user: User;
  plan: Plan,
  boqLevel1: BoqLevel1,
  boqLevel2: BoqLevel2,
  boqItem: BoqItem
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
      url: 'verify-webpage',
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
    createConcept: {
      url: 'user/concept',
      method: 'post',
    },
    deleteConcept: {
      url: 'user/concept',
      method: 'delete',
    },
  },

  plan: {
    getAll: {
      url: 'plan',
      method: 'get',
    }
  },

  boqLevel1: {
    getAll: {
      url: 'boq-level-one',
      method: 'get',
    },
    createBoqLevel1: {
      url: 'boq-level-one',
      method: 'post',
    },
    updateBoqLevel1: {
      url: 'boq-level-one',
      method: 'put',
    },
    getOneBoqLevel1: {
      url: 'boq-level-one',
      method: 'get',
    },
    deleteBoqLevel1: {
      url: 'boq-level-one',
      method: 'delete'
    },
    copyBoqLevel1: {
      url: 'boq-level-one',
      method: 'patch'
    },
    copyAllBoqLevel1: {
      url: 'boq-level-one/copy-all',
      method: 'post',
    },
  },
  
  boqLevel2: {
    getAll: {
      url: 'boq-level-two',
      method: 'get',
    },
    createBoqLevel2: {
      url: 'boq-level-two',
      method: 'post',
    },
    updateBoqLevel2: {
      url: 'boq-level-two',
      method: 'put',
    },
    deleteBoqLevel2: {
      url: 'boq-level-two',
      method: 'delete'
    },
    copyBoqLevel2: {
      url: 'boq-level-two',
      method: 'patch'
    },
    getOneBoqLevel2: {
      url: 'boq-level-two',
      method: 'get',
    }
  },

  boqItem:{
    createBoqItem: {
      url: 'boq-item',
      method: 'post'
    },
    updateBoqItem: {
      url: 'boq-item',
      method: 'put'
    },
    updateActualBoqItem: {
      url: 'boq-item/update-actual',
      method: 'put'
    },
    deleteBoqItem: {
      url: 'boq-item',
      method: 'delete'
    },
    copyBoqItem: {
      url: 'boq-item',
      method: 'patch'
    }
  }

};

export default APIs;