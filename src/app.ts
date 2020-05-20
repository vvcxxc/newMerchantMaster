// ref: https://umijs.org/config/
declare const Environment: string
import Vconsole from 'vconsole'
if (Environment != 'master') {
  // if(process.env.NODE_ENV != '')
  const vConsole = new Vconsole()

}

declare global {
  interface Window {
    /**页面标题 */
    title: string
  }
}
export const dva = {
  config: {
    onError(err: ErrorEvent, dispatch: any) {
      err.preventDefault();
    }
  }
};



/**路由变化 */
export const onRouteChange = (params: { location: any, routes: any }) => {
  // console.log(params)
  try {
    const defaultTitle = '小熊敬礼'
    const path = params.location.pathname
    const routerConfig = params.routes[0].routes
    const router = routerConfig.find((_: any) => _.path === path)
    window.title = router.title || defaultTitle
    return params.routes

  } catch (e) {
    throw new Error(e)
  }
}
