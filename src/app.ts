/*
 * @Author: your name
 * @Date: 2020-05-20 15:52:37
 * @LastEditTime: 2020-06-03 13:57:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \newMerchantMaster\src\app.ts
 */
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

  try {
    const defaultTitle = '小熊敬礼'
    const path = params.location.pathname
    const routerConfig = params.routes[0].routes
    const router = routerConfig.find((_: any) => _.path === path)
    window.title = router.title || defaultTitle
    // return params.routes
    if(document.getElementsByTagName('meta')[1].content !== 'initial-scale=1.0, user-scalable=no'){
      sessionStorage.setItem('meta',document.getElementsByTagName('meta')[1].content)
    }

    if(path === '/SubmitQualifications/map'){
      document.getElementsByTagName('meta')[1].content = 'initial-scale=1.0, user-scalable=no'
    }else {
      let meta = sessionStorage.getItem('meta')
      if(meta){
        document.getElementsByTagName('meta')[1].content = meta
      }
    }

  } catch (e) {
    throw new Error(e)
  }
}
