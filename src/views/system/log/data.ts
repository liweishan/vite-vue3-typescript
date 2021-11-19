interface IBaseResult {
  msg?: string
	total?: number
	code?: number
	pageNum?: number
}

export interface ILoginInfor {
	searchValue?: string
	createBy?: string
	createTime?: string
	updateBy?: string
	updateTime?: string
	remark?: string
	beginTime?: string
	endTime?: string
	infoId?: number
	loginName?: string
	status?: string
	statusText?: string
	ipaddr?: string
	loginLocation: string
	browser: string
	os: string
	msg: string
	loginTime: string
}

export interface ILoginInforResult extends IBaseResult {
	rows?: ILoginInfor[]
}

export interface IOperLogList {
	searchValue?: any
	createBy?: any
	createTime?: any
	updateBy?: any
	updateTime?: any
	remark?: any
	beginTime?: any
	endTime?: any
	operId: number
	title: string
	businessType: number
	method: string
	requestMethod: string
	operatorType: number
	operName: string
	deptName?: any
	operUrl: string
	operIp: string
	operLocation: string
	operParam: string
	status?: number
  statusText?: strin
	errorMsg?: any
	operTime: string
}
export interface IOperLogListResult extends IBaseResult {
	rows?: IOperLogList[]
}

export const columns: any[] = Object.freeze([
  {
    title: '登录名称',
    dataIndex: 'loginName',
    align: 'center',
    width: 160
  },
  {
    title: '登录位置',
    dataIndex: 'loginLocation',
    align: 'center',
    width: 120
  },
  {
    title: 'ip地址',
    dataIndex: 'ipaddr',
    align: 'center',
    width: 160
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    align: 'center',
    width: 120
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    align: 'center',
    width: 160
  },
  {
    title: '设备系统',
    dataIndex: 'os',
    align: 'center',
    width: 120
  },
  {
    title: '状态',
    dataIndex: 'statusText',
    align: 'center',
    width: 100
  },
  {
    title: '提示',
    dataIndex: 'msg',
    align: 'center',
    width: 120
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 120,
    slots: {
      customRender: 'action' 
    }
  }
])

export const columnsOption: any[] = Object.freeze([
  {
    title: '操作人名称',
    dataIndex: 'operName',
    align: 'center',
    width: 160
  },
  {
    title: '请求路径',
    dataIndex: 'operUrl',
    align: 'center',
    width: 200
  },
  {
    title: '请求类型',
    dataIndex: 'requestMethod',
    align: 'center',
    width: 100
  },
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
    width: 160
  },
  {
    title: '登录位置',
    dataIndex: 'loginLocation',
    align: 'center',
    width: 120
  },
  {
    title: 'ip地址',
    dataIndex: 'ipaddr',
    align: 'center',
    width: 160
  },
  {
    title: '操作时间',
    dataIndex: 'operTime',
    align: 'center',
    width: 160
  },
  {
    title: '状态',
    dataIndex: 'statusText',
    align: 'center',
    width: 160
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 120,
    slots: {
      customRender: 'action' 
    }
  }
])
export const statusKey = Object.freeze({
  0: '成功',
  1: '失败'
})