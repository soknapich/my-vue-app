import { verifyToken } from '@/apis/authentication';
import router from '@/router';
import { getToken, setToken, removeAllToken, setUserInfoCookie } from '@/services/authentication'; // get token from cookie

router.beforeEach(async (to, from, next) => {
  const token = (await getToken()) || '';
  /**before each step have to verify token */
  /**if token is not valid, remove it unless it's expired which has to refresh token automatically */
  if (!token && to.path != '/login') {
    next({ name: 'login' });
  } else {
     //console.log("22 no token found, redirecting to login");
    const result = await verifyToken({
      token
    });
    //console.log(result);

    const isValidToken = (result && result.status === 200 && result.data?.id) ? true : false;
    if (!isValidToken && to.meta.requiresAuth) {
      next({ name: 'login' });
    } else if (isValidToken && to.path === '/login') {
      next({ path: '/' })
    } else {
      //console.log(from);
      next();
    }
  }
});
