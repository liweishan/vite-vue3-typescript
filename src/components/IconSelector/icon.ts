/**
 * 增加新的图标时，请遵循以下数据结构
 * Adding new icon please follow the data structure below
 */
const icons = [
  {
    key: 'directional',
    title: '方向性图标',
    icons: ['StepBackward' , 'StepForward' , 'FastBackward' , 'FastForward' , 'Shrink' , 'ArrowsAlt' , 'Down' , 'Up' , 'Left' , 'Right' , 'CaretUp' , 'CaretDown' , 'CaretLeft' , 'CaretRight' , 'UpCircle' , 'DownCircle' , 'LeftCircle' , 'RightCircle' , 'DoubleRight' , 'DoubleLeft' , 'VerticalLeft' , 'VerticalRight' , 'VerticalAlignTop' , 'VerticalAlignMiddle' , 'VerticalAlignBottom' , 'Forward' , 'Backward' , 'Rollback' , 'Enter' , 'Retweet' , 'Swap' , 'SwapLeft' , 'SwapRight' , 'ArrowUp' , 'ArrowDown' , 'ArrowLeft' , 'ArrowRight' , 'PlayCircle' , 'UpSquare' , 'DownSquare' , 'LeftSquare' , 'RightSquare' , 'Login' , 'Logout' , 'MenuFold' , 'MenuUnfold' , 'BorderBottom' , 'BorderHorizontal' , 'BorderInner' , 'BorderOuter' , 'BorderLeft' , 'BorderRight' , 'BorderTop' , 'BorderVerticle' , 'PicCenter' , 'PicLeft' , 'PicRight' , 'RadiusBottomleft' , 'RadiusBottomright' , 'RadiusUpleft' , 'RadiusUprightOutlined' , 'Fullscreen' , 'FullscreenExit']   
  },
  {
    key: 'suggested',
    title: '提示建议性图标',
    icons: ['Question' ,'QuestionCircle' ,'Plus' ,'PlusCircle' ,'Pause' ,'PauseCircle' ,'Minus' ,'MinusCircle' ,'PlusSquare' ,'MinusSquare' ,'Info' ,'InfoCircle' ,'Exclamation' ,'ExclamationCircle' ,'Close' ,'CloseCircle' ,'CloseSquare' ,'Check' ,'CheckCircle' ,'CheckSquare' ,'ClockCircle' ,'Warning' ,'IssuesClose' ,'Stop']
  },
  {
    key: 'editor',
    title: '编辑类图标',
    icons: ['Edit' ,'Form' ,'Copy' ,'Scissor' ,'Delete' ,'Snippets' ,'Diff' ,'Highlight' ,'AlignCenter' ,'AlignLeft' ,'AlignRight' ,'BgColors' ,'Bold' ,'Italic' ,'Underline' ,'Strikethrough' ,'Redo' ,'Undo' ,'ZoomIn' ,'ZoomOut' ,'FontColors' ,'FontSize' ,'LineHeight' ,'ColumHeight' ,'Dash' ,'SmallDash' ,'SortAscending' ,'SortDescending' ,'Drag' ,'OrderedList' ,'RadiusSetting']
  },
  {
    key: 'data',
    title: '数据类图标',
    icons: ['AreaChart' ,'PieChart' ,'BarChart' ,'DotChart' ,'LineChart' ,'RadarChart' ,'HeatMap' ,'Fall' ,'Rise' ,'Stock' ,'BoxPlot' ,'Fund' ,'Sliders']
  },
  {
    key: 'brand_logo',
    title: '网站通用图标',
    icons: ['Lock' ,'Unlock' ,'Bars' ,'Book' ,'Calendar' ,'Cloud' ,'CloudDownload' ,'Code' ,'Copy' ,'CreditCard' ,'Delete' ,'Desktop' ,'Download' ,'Ellipsis' ,'File' ,'FileText' ,'FileUnknown' ,'FilePdf' ,'FileWord' ,'FileExcel' ,'FileJpg' ,'FilePpt' ,'FileMarkdown' ,'FileAdd' ,'Folder' ,'FolderOpen' ,'FolderAdd' ,'Hdd' ,'Frown' ,'Meh' ,'Smile' ,'Inbox' ,'Laptop' ,'Appstore' ,'Link' ,'Mail' ,'Mobile' ,'Notification' ,'PaperClip' ,'Picture' ,'Poweroff' ,'Reload' ,'Search' ,'Setting' ,'ShareAlt' ,'ShoppingCart' ,'Tablet' ,'Tag' ,'Tags' ,'ToTop' ,'Upload' ,'User' ,'VideoCamera' ,'Home' ,'Loading' ,'Loading3Quarters' ,'CloudUpload' ,'Star' ,'Heart' ,'Environment' ,'Eye' ,'Camera' ,'Save' ,'Team' ,'Solution' ,'Phone' ,'Filter' ,'Exception' ,'Export' ,'CustomerService' ,'Qrcode' ,'Scan' ,'Like' ,'Dislike' ,'Message' ,'PayCircle' ,'Calculator' ,'Pushpin' ,'Bulb' ,'Select' ,'Switcher' ,'Rocket' ,'Bell' ,'Disconnect' ,'Database' ,'Compass' ,'Barcode' ,'Hourglass' ,'Key' ,'Flag' ,'Layout' ,'Printer' ,'Sound' ,'Usb' ,'Skin' ,'Tool' ,'Sync' ,'Wifi' ,'Car' ,'Schedule' ,'UserAdd' ,'UserDelete' ,'UsergroupAdd' ,'UsergroupDelete' ,'Man' ,'Woman' ,'Shop' ,'Gift' ,'Idcard' ,'MedicineBox' ,'RedEnvelope' ,'Coffee' ,'Copyright' ,'Trademark' ,'Safety' ,'Wallet' ,'Bank' ,'Trophy' ,'Contacts' ,'Global' ,'Shake' ,'Api' ,'Fork' ,'Dashboard' ,'Table' ,'Profile' ,'Alert' ,'Audit' ,'Branches' ,'Build' ,'Border' ,'Crown' ,'Experiment' ,'Fire' ,'MoneyCollect' ,'PropertySafety' ,'Read' ,'Reconciliation' ,'Rest' ,'SecurityScan' ,'Insurance' ,'Interation' ,'SafetyCertificate' ,'Project' ,'Thunderbolt' ,'Block' ,'Cluster' ,'DeploymentUnit' ,'Dollar' ,'Euro' ,'Pound' ,'FileDone' ,'FileExclamation' ,'FileProtect' ,'FileSearch' ,'FileSync' ,'Gateway' ,'Gold' ,'Robot' ,'Shopping']
  },
  {
    key: 'application',
    title: '品牌和标识',
    icons: ['Android' ,'Apple' ,'Windows' ,'Ie' ,'Chrome' ,'Github' ,'Aliwangwang' ,'Dingding' ,'WeiboSquare' ,'WeiboCircle' ,'TaobaoCircle' ,'Html5' ,'Weibo' ,'Twitter' ,'Wechat' ,'Youtube' ,'AlipayCircle' ,'Taobao' ,'Skype' ,'Qq' ,'MediumWorkmark' ,'Gitlab' ,'Medium' ,'Linkedin' ,'GooglePlus' ,'Dropbox' ,'Facebook' ,'Codepen' ,'CodeSandbox' ,'Amazon' ,'Google' ,'CodepenCircle' ,'Alipay' ,'AntDesign' ,'Aliyun' ,'Zhihu' ,'Slack' ,'SlackSquare' ,'Behance' ,'BehanceSquare' ,'Dribbble' ,'DribbbleSquare' ,'Instagram' ,'Yuque' ,'Alibaba' ,'Yahoo']
  }
]

export function getIcons() {
  const words = []
  for (const v of icons.values()) {
    for (const e of v.icons.values()) {
      words.push(e)
    }
  }
  return words
}
/**
 * 处理iocns字符串，将step-backward变成StepBackward
 */
// function getComponents() {
//   for (const v of icons.values()) {
//     for (const [i, e] of v.icons.entries()) {
//       const words: string[] = e.split('-')
//       v.icons[i] = words.reduce((icon: string, word: string) => {
//         const newWord = word.charAt(0).toLocaleUpperCase() + word.substring(1)
//         icon += newWord
//         return icon
//       }, '')
//     }
//     console.log(JSON.stringify(v.icons))
//   }
// }
// getComponents()
export default icons