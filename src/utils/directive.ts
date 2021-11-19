import { PermissionModule } from 'store/modules/permission'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 */
export function action() {
  return {
    mounted (el: HTMLElement, binding: any) {
      const actionName = binding.arg
      const roles = PermissionModule.roles
      const item = roles.find((e: any) => e.perms === actionName)
      // 如果是指令绑定在template模板上面，需要把display属性设置为block
      if (item && el.nodeName === 'TEMPLATE') {
        el.style.display = 'block'
      } else if(!item) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}
