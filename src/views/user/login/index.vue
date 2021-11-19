<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div class="container">
      <div class="user-layout-content">
        <div class="top">
          <div class="header">
            <a href="/">
              <img src="~@/assets/logo.svg" class="logo" alt="logo">
              <span class="title">潮南档案管理系统</span>
            </a>
          </div>
          <div class="desc">欢迎使用潮南档案管理系统</div>
        </div>

        <div class="form">
          <a-form
            :model="form.modelRef"
            @submit="form.onSubmit"
          >
            <a-form-item v-bind="form.validateInfos.username">
              <a-input
                size="large"
                placeholder="请输入用户名"
                autocomplete="username"
                v-model:value="form.modelRef.username"
                @keyup.enter="form.onSubmit"
              >
                <template #prefix>
                  <user-outlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item v-bind="form.validateInfos.password">
              <a-input
                size="large"
                :type="form.isEye ? 'text' : 'password'"
                placeholder="请输入密码"
                v-model:value="form.modelRef.password"
                @keyup.enter="form.onSubmit"
                autocomplete="password"
              >
                <template #prefix>
                  <lock-outlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                </template>
                <template #suffix>
                  <span @click="form.showPwd" class="c-pointer">
                    <eye-outlined v-show="form.isEye" />
                    <eye-invisible-outlined v-show="!form.isEye" />
                  </span>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-checkbox
                v-model:checked="form.modelRef.check"
              >
                记住密码
              </a-checkbox>
            </a-form-item>

            <a-form-item>
              <a-button
                size="large"
                type="primary"
                html-type="submit"
                block
                :loading="form.loading"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>

        <div class="footer">
          <div class="links">
            <a href="_self">帮助</a>
            <a href="_self">隐私</a>
            <a href="_self">条款</a>
          </div>
          <div class="copyright">
            Copyright &copy; 2018 vueComponent
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRaw, UnwrapRef, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Vue, Options, setup } from 'vue-class-component'
import { UserModule, ILoginInfo } from '@/store/modules/user'
import { Form, Button, Input, Checkbox, notification } from 'ant-design-vue'
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import { timeFix } from 'utils/util'

const { Item } = Form

const useForm = Form.useForm

/**
 * form表单登录的逻辑
 */
function useLogin () {
  const $route = useRoute()
  const $router = useRouter()
  const user: ILoginInfo = {
    username: '',
    password: '',
    check: false
  }
  const modelRef: UnwrapRef<ILoginInfo> = reactive(UserModule.loginInfo || user)

  const rulesRef = reactive({
    username: [
      {
        required: true,
        message: '请输入用户名！'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码！'
      }
    ]
  })
  const { validate, validateInfos } = useForm(modelRef, rulesRef)

  const loading = ref(false)
  const onSubmit = async () => {
    if (loading.value) {
      return
    }
    loading.value = true
    try {
      await validate()
      const values = toRaw(modelRef)
      await UserModule.Login(values)
      
      const query = $route.query || {}
      const path: string = query.redirect ? `${query.redirect}` : '/'
      delete query.redirect
      await $router.push({
        path,
        query
      })
      notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`
      })
    } catch(err: any) {
      // 
    }
    setTimeout(() => {
      loading.value = false
    }, 500)
  }

  const isEye = ref(false)
  const showPwd = () => {
    isEye.value = !isEye.value
  }
  return {
    modelRef,
    validateInfos,
    loading,
    isEye,
    onSubmit,
    showPwd
  }
}

@Options({
  components: {
    [Form.name]: Form,
    [Item.name]: Item,
    [Button.name]: Button,
    [Input.name]: Input,
    [Checkbox.name]: Checkbox,
    UserOutlined,
    LockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined
  }
})
export default class Login extends Vue {
  form = setup(() => useLogin())
}
</script>

<style scoped lang="less">
#userLayout.user-layout-wrapper {
  height: 100%;

  .container {
    width: 100%;
    min-height: 100%;
    background: url(@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    //padding: 50px 0 84px;
    position: relative;

    .user-layout-lang {
      width: 100%;
      height: 40px;
      line-height: 44px;
      text-align: right;

      .select-lang-trigger {
        cursor: pointer;
        padding: 12px;
        margin-right: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        vertical-align: middle;
      }
    }

    .user-layout-content {
      padding: 14vh 0 24px;
      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        // position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }

    a {
      text-decoration: none;
    }

  }
  .form {
    padding: 0 10px;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>