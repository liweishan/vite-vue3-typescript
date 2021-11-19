<template>
  <div class="main">
    <div class="aside d-flex fd-column" :class="{ collapsed }">
      <div class="logo">
				<router-link to="/" class="router-link-active">
					<span>
						<img src="@/assets/logo.png" alt="">
						<h1>档案管理系统</h1>
					</span>
				</router-link>
			</div>
      <c-scrollbar
        trigger="hover"
        class="f-1"
        direction="y"
        :vThumbStyle="{
          background: '#444258'
        }"
      >
        <a-menu
          mode="inline"
          theme="dark"
          :inline-collapsed="collapsed"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectKeys"
          @click="handleItem"
        >
          <template v-for="(v, i) in menuList" :key="i">
            <a-menu-item v-if="(v.meta.hiddenChildren || !v?.children.length) && +v.meta.visible !== 2" :key="v.redirect || v.path">
              <icon :icon="v.meta.icon" />
              <span>{{ v.meta.menuName }}</span>
            </a-menu-item>
            <a-sub-menu :key="v.path" v-else-if="+v.meta.visible !== 2">
              <template #icon>
                <icon :icon="v.meta.icon" />
              </template>
              <template #title>{{ v.meta.menuName }}</template>
              <template v-for="(e, j) of v.children" :key="j">
                <a-menu-item :key="e.path" v-if=" e.meta && e.meta.visible !== '2'">
                  {{ e.meta.menuName }}
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </a-menu>
      </c-scrollbar>
    </div>
    <div class="section f-1 d-flex fd-column">
      <div class="global-header">
        <span class="global-header-trigger" @click="toggleCollapsed">
          <icon :icon="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
				</span>
        <div class="global-header-right">
          <!-- <a-tooltip>
            <template #title>官网</template>
            <a href="http://www.szahkc.com/" target="_blank">
              <icon icon="QuestionCircleOutlined" />
            </a>
          </a-tooltip> -->
          <span>欢迎来到潮南档案管理系统</span>
          <a-dropdown>
            <span class="avatar">
              <a-avatar size="small" :src="userImg" />
              <span class="name">admin</span>
            </span>
            <template #overlay>
              <a-menu class="setting-menu" @click="handleDropdownItem">
                <a-menu-item key="settings">
                  <template #icon>
                    <icon icon="SettingOutlined" />
                  </template>
                  <span>个人设置</span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout">
                  <template #icon>
                    <icon icon="LogoutOutlined" />
                  </template>
                  <span>退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
      <!-- 面包屑 -->
      <div v-if="!curMenu.hiddenHeader" class="ant-pro-page-header-wrap-page-header-warp">
				<div class="ant-pro-grid-content">
					<div class="ant-page-header-ghost">
						<div class="ant-breadcrumb">
							<span v-for="(v, i) of crumbs" :key="i">
								<template v-if="i < crumbs.length - 1">
									<span class="ant-breadcrumb-link">
										<router-link :to="v.path" repalce class="router-link-active">{{ v.meta.menuName }}</router-link>
									</span>
									<span class="ant-breadcrumb-separator">/</span>
								</template>
								<span class="ant-breadcrumb-link" v-else>
									<span>{{ v.meta.menuName }}</span>
								</span>
							</span>
						</div>
            <!-- 当前页 -->
						<div class="ant-page-header-heading">
							<span class="ant-page-header-heading-title" v-if="crumbs.length">{{ crumbs[crumbs.length -1].meta.menuName }}</span>
						</div>
					</div>
				</div>
			</div>
      <router-view class="contains" />
    </div>
  </div>
</template>

<script lang="ts">
import { createVNode } from 'vue'
import { Vue, Options } from 'vue-class-component'
import { onBeforeRouteUpdate, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router'

import { Menu, Tooltip, Dropdown, Avatar, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { CScrollbar } from 'c-scrollbar'
import { Icon } from 'coms/Icon'

import { UserModule } from '@/store/modules/user'

import { getAddRouters } from 'utils/permission'

import { uniqueArray, getDeepCopy } from 'utils/util'

import userImg from '@/assets/user.png'

const { Item, SubMenu, Divider } = Menu

@Options({
  components: {
    [Menu.name]: Menu,
    [Item.name]: Item,
    [SubMenu.name]: SubMenu,
    [Tooltip.name]: Tooltip,
    [Dropdown.name]: Dropdown,
    [Avatar.name]: Avatar,
    [Divider.name]: Divider,
    CScrollbar,
    Icon
  }
})
export default class Layout extends Vue {
  private selectKeys: string[] = []
  private openKeys: string[] = []
  private crumbs: any[] = []
  private collapsed: boolean = false
  private userImg = userImg

  created() {
    onBeforeRouteUpdate(this.init)
    onBeforeRouteLeave(this.init)
    this.init()
  }
  beforeUnmount() {
    Modal.destroyAll()
  }

  private get menuList() {
    const routes = getAddRouters(getDeepCopy(UserModule.routerInfo))
    return routes.filter((e: any) => !e.meta.hidden)
  }

  private get curMenu() {
    const { $route } = this
    const menuId = $route.meta.menuId
    const menu = UserModule.routerInfo.find(e => e.menuId === menuId)
    return menu || {}
  }

  private init(to?: RouteLocationNormalized): void {
    const { $route } = this
    // 如果to有值证明是执行的路由更新前的回调，就取更新之后的路由参数
    const matched = to ? to.matched : $route.matched
    const lastItem = matched[matched.length - 1]
    this.selectKeys = [lastItem.path]
    this.openKeys = [matched[0].path]
    this.crumbs = uniqueArray(matched, 'meta.menuName')
  }

  private handleItem({ key }: { key: string }): void {
    this.$router.replace({ path: key })
  }
  
  private toggleCollapsed(): void {
    this.collapsed = !this.collapsed
  }

  private handleDropdownItem({ key }: any): void {
    switch(key) {
      case 'logout':
        this.logout()
        break
      default:
    }
  }

  private logout(): void {
    const modeal = Modal.confirm({
      title: '提示',
      icon: createVNode(ExclamationCircleOutlined),
      content: '你确定要退出系统了吗？',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk: async () => {
        await UserModule.Logout()
        this.$router.replace({ path: '/login' })
        modeal.destroy()
      },
      onCancel() {
        modeal.destroy()
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "ant-design-vue/dist/antd.less";
.main {
  height: 100%;
  display: flex;
  .aside {
    background: @menu-dark-bg;
    flex: 0 0 256px;
    width: 256px;
    max-width: 256px;
    min-width: 256px;
    height: 100%;
    transition: all 0.2s;
    .logo {
			position: relative;
			height: 64px;
			padding-left: 24px;
			overflow: hidden;
			transition: all 0.3s;
			line-height: 64px;
			.router-link-active {
				img {
					width: 32px;
					height: 32px;
				}
				h1 {
					color: #fff;
					font-size: 20px;
					margin: 0 0 0 12px;
					font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
					font-weight: 600;
					vertical-align: middle;
					display: inline-block;
				}
			}
		}
  }
  .collapsed {
    flex: 0 0 80px;
    max-width: 80px;
    min-width: 80px;
    width: 80px;
  }
  .section {
    background: @layout-body-background;
    overflow-x: hidden;
    .global-header {
      height: 64px;
      line-height: 64px;
      background: #fff;
      box-shadow: 0 1px 4px rgb(238, 238, 238);
      .global-header-trigger {
        display: inline-block;
        height: 64px;
        padding: 0 24px;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s, padding 0s;
      }
      .global-header-right {
        float: right;
        a {
          padding: 0 8px 0 0;
        }
        .avatar {
          padding: 0 20px 0 12px;
          .name {
            margin-left: 8px;
          }
        }
      }
    }
    .ant-pro-page-header-wrap-page-header-warp {
      padding: 6px 24px 4px;
      background: #fff;
      margin: 1px 0 0;
    }
    .contains {
      margin: 24px 24px 0;
    }
  }
}
.setting-menu :deep(.ant-dropdown-menu-item:hover) {
  background: @menu-item-active-bg;
}
</style>
