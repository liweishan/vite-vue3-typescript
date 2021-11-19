import XLSX from 'xlsx'
// dom操作相关的方法
declare const window: any

/**
 * 根据选择器来获取节点（类似jquery的$('#box .list div')）
 */
export function getElement(rule: string): Element[] | false | Element {
  const rules = rule.replace(/\s+/g, ' ').split(' ')
  let e: any = null
  for (const [i, v] of rules.entries()) {
    const one = v.substring(0, 1)
    const name = v.substring(1)
    if (!i) {
      if (one === '#') {
        const oDom = document.getElementById(name)
        e = oDom ? [oDom] : []
      } else if (one === '.') {
        e = document.querySelectorAll(v)
      } else {
        e = document.getElementsByTagName(v)
      }
      
    } else if (!e || !e.length) {
      return false
    } else {
      e = traversDom(Array.from(e), v)
    }
  }
  if (e?.length === 1) {
    return e[0]
  } else {
    return e
  }
}

/**
 * 查找一个dom节点下是否有rule这个标签，有就放在数组里面返回，没有就返回空数组（ps: rule为id、class、标签名，比如#box,.box,div）
 */
export function traversDom(boxNodes: Element[], rule: string): (Element | undefined)[] {
  // const rules = rule.replace(/\s+/g, ' ').split(' ')
  const one = rule.substring(0, 1)
  const arr = ['#', '.']
  const name = arr.includes(one) ? rule.substring(1) : rule
  const nodes: (Element | undefined)[] = []
  //创建一个队列，并把最外层放入队列
  const queue = boxNodes
  // 遍历队列
  while (queue.length) {
    // 获取队列第一个dom
    const node = queue.shift()
    const isId = one === '#' && node?.id === name
    const isClass = one === '.' && node && Array.from(node.classList).includes(name)
    const isDiv = !arr.includes(one) && node?.localName === name
    if (isId || isClass || isDiv) {
      // 防止重复
      !nodes.includes(node) && nodes.push(node)
    }
    // 打印dom信息
    // 判断当前都没是否有子级，如果没有跳过 可能会有兄弟节点
    if(node?.nodeType !== 1 || !node?.children.length){
      continue
    }
    // 如果有遍历 子级节点 并插入到队列，继续循环
    Array.from(node.children).forEach( item =>{
      queue.push(item)
    })
  }

  return nodes
}

export function getObjectURL<T>(file: T): string {
  let url = null
  if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file)
  } else if (window.webkitURL != undefined) { // webkit or chrome
      try {
        url = window.webkitURL.createObjectURL(file)     
      } catch (error) {
        // 
      }
  } else if (window.URL != undefined) { // mozilla(firefox)
    try {
      url = window.URL.createObjectURL(file)
    } catch (error) {
      // 
    }
  }
  return url
}

/**
 * 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
 */
export function sheet2blob<T>(sheet: T, sheetName: string = 'sheet1') {
	const workbook = {
		SheetNames: [sheetName],
		Sheets: {}
	}
	workbook.Sheets[sheetName] = sheet
	// 生成excel的配置项
	const wopts = {
		bookType: 'xlsx', // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: 'binary'
	}
	const wbout = XLSX.write(workbook, wopts)
	const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
	// 字符串转ArrayBuffer
	function s2ab(s) {
		const buf = new ArrayBuffer(s.length)
		const view = new Uint8Array(buf)
		for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
		return buf
	}
	return blob
}

/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
export function openDownloadDialog<T>(url: T, saveName: string) {
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url) // 创建blob地址
  }
  const aLink = document.createElement('a')
  aLink.href = url
  aLink.download = saveName || ''
  let event
  if(window.MouseEvent) {
  event = new MouseEvent('click')
  } else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}