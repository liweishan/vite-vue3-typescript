
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IAppState {
  loading: boolean
}

@Module({
  name: 'app', dynamic: true, namespaced: true, store
})
export default class App extends VuexModule implements IAppState {
  public loading = false

  @Mutation
  private SET_LOADING(loading: boolean) {
    this.loading = loading
  }

  @Action
  public SetLoading(loading: boolean) {
    this.SET_LOADING(loading)
  }
}

export const AppModule = getModule(App)