const modules = import.meta.glob('../views/**/index.vue')
const components: any = {}
// 不需要懒加载的路由
const whiteList: string[] = ['login', 'error404']
Object.keys(modules).forEach(key => {
    const nameMatch = key.match(/^\.\.\/views\/(.+)\.vue/)
    if(!nameMatch) return
    // 如果页面以index命名，则使用父文件夹作为name
    const indexMatch = nameMatch[1].match(/(.*)\/index$/i)
    let name = indexMatch ? indexMatch[1] : nameMatch[1];
    [name] = name.split('/').splice(-1)
    if (!whiteList.includes(name)) {
        components[name] = modules[key]
    }
})

export default components
