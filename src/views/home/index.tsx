/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-11-02 11:54:39
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-12-07 18:11:31
 * @FilePath: \gpn-sn-search\src\views\home\index.tsx
 */
import {
  Button,
  Input,
  Table,
  Descriptions,
  // Empty,
} from 'antd'
import './index.less'
import {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from 'react'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { deviceDataList } from '@/apis'
import { dataFormat } from '@/utils/index'
import { pagination, DataType } from '@/types/index'
import CountUp from 'react-countup'
// import { useDispatch } from "react-redux";
// import { changeLang } from '@/store/reducers/lang'; //引入定义的方法
// import Icon  from '@/components/icon';
const columns: ColumnsType<DataType> = [
  {
    title: '末尾游标',
    dataIndex: 'seq',
    key: 'seq',
    width: 200,
  },
  {
    title: '等级',
    dataIndex: 'grade',
    key: 'grade',
    width: 100,
  },
  {
    title: 'gpt',
    dataIndex: 'gpt',
    key: 'gpt',
    width: 100,
  },
  {
    title: 'gpn',
    dataIndex: 'gpn',
    key: 'gpn',
    width: 100,
  },
  {
    title: '充电电量',
    dataIndex: 'chargeEnergy',
    key: 'chargeEnergy',
    width: 80,
  },
  {
    title: '放电电量',
    dataIndex: 'dischargeEnergy',
    key: 'dischargeEnergy',
    width: 100,
  },
  {
    title: '同步时间',
    dataIndex: 'time',
    key: 'time',
    width: 180,
    render: (params) => <>{dataFormat(params)}</>,
  },
  {
    title: '固件累计总充电',
    dataIndex: 'totalCharge',
    key: 'totalCharge',
    width: 200,
  },
  {
    title: '固件累计总放电',
    dataIndex: 'totalDischarge',
    key: 'totalDischarge',
    width: 200,
  },
  {
    title: '固件累计充入绿电',
    dataIndex: 'totalGreen',
    key: 'totalGreen',
    width: 200,
  },
]

function Home() {
  // const dispath = useDispatch(); //触发redux
  // 1P1122AD30010 默认值
  const [text, setText] = useState<string>('')
  const textChangeHandler = (event: ChangeEvent) => {
    setText((event.target as HTMLInputElement).value)
  }
  const search = () => {
    changeData()
  }
  const [data, setData] = useState<any>([])
  const changeData = () => {
    if (loading) return
    getList()
  }
  const [loading, setLoading] = useState(false)
  const [pagination, setpagination] = useState<pagination>({
    current: 1,
    pageSize: 10, // 默认每页显示数量
    total: 0,
  })
  /**
   * 获取列表请求入参 {
   *  sn: SN码
   *  size: Number 当前页码 默认 10
   *  page: Number 当前页数 默认从0 开始
   * }
   */
  const getList = async () => {
    setLoading(true)
    const { code, result: { content = [], ...pagination } = {} } =
      await deviceDataList({
        sn: text,
        size: paginationOptions.current.pageSize,
        page: paginationOptions.current.current - 1,
      })
    //无论成功失败都需要设置数据并且隐藏loading
    setLoading(false)
    setData(content)
    if (content.length) {
      const [obj] = content
      changeeletObj({
        SN: text,
        ...obj,
      })
    } else {
      changeeletObj({
        SN: text,
        totalCharge: '',
        totalDischarge: '',
        totalGreen: '',
      })
    }
    if (code === 200) {
      setpagination({
        current: pagination.page + 1,
        pageSize: pagination.size, // 默认每页显示数量
        total: pagination.totalCount,
      })
      //默认展开内容
      let arr = content.map((item: any) => {
        return item.id
      })
      changedefaultExpandedRowKeys(arr)
      // changeKey(key + 1);
    } else {
      setpagination({
        current: 1,
        pageSize: 10, // 默认每页显示数量
        total: 0,
      })
    }
  }
  const pageOnChange = (paginations: TablePaginationConfig): void => {
    setpagination({
      current: paginations.current,
      pageSize: paginations.pageSize, // 默认每页显示数量
      total: paginations.total,
    })
    paginationOptions.current = paginations
    changeData()
  }
  const paginationOptions: any = useRef()
  useEffect(() => {
    paginationOptions.current = pagination
  }, [pagination])
  const [defaultExpandedRowKeys, changedefaultExpandedRowKeys] = useState([])
  // const [key, changeKey] = useState<number>(1);
  //计算表格高度
  const [tableHeight, changeTableHeight] = useState<number | undefined>(
    undefined
  )
  const dom_box = createRef<HTMLDivElement>()
  const handleWindowResize = useCallback(() => {
    if (!dom_box.current || !data.length) {
      return
    }
    const tableHight =
      window.innerHeight - dom_box.current.offsetHeight - 32 - 130
    changeTableHeight(tableHight < 200 ? 200 : tableHight)
  }, [dom_box, data])
  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize])
  //相关用电数据
  const [
    eletObj,
    changeeletObj = (data: any) => {
      return { ...eletObj, ...data }
    },
  ] = useState<any>({
    SN: '',
    totalCharge: '',
    totalDischarge: '',
    totalGreen: '',
  })
  return (
    <div className="Home">
      <div ref={dom_box}>
        <div className="home_top mt20">
          {/* <span onClick={ ()=> dispath(changeLang({locale: 'zh'}))}>中文</span>
          <span onClick={ ()=> dispath( changeLang({locale: 'en'}))} className='ml20'>英文</span>
          <Icon onClick={ ()=> console.log(222)} name='photo' iconClass="photo"/> */}
          <Input
            type="text"
            allowClear={true}
            value={text}
            onChange={textChangeHandler}
            onPressEnter={search}
            className="searchInput"
            placeholder="请输入SN码"
          />
          <Button
            type="primary"
            loading={loading}
            className="ml10"
            onClick={search}
          >
            查询
          </Button>
        </div>
        {/* 描述 */}
        <Descriptions title={'SN码:' + eletObj.SN} className="mt20">
          <Descriptions.Item label="固件累计总充电">
            {eletObj.totalCharge ? (
              <CountUp
                start={0} // 开始数据
                end={eletObj.totalCharge} // 结束数据
                duration={0.5} // 持续时间
                separator="," // 分隔符
                decimals={2} // 保留小数位
                delay={0} // 设置为0的时候立即执行
                decimal="." // 小数点符号
                // redraw={true}  //如果为true，则组件将始终在每次重新渲染时进行动画处理。
              >
                {eletObj.totalCharge}
              </CountUp>
            ) : (
              eletObj.totalCharge
            )}
          </Descriptions.Item>
          <Descriptions.Item label="固件累计总放电">
            {eletObj.totalDischarge ? (
              <CountUp
                start={0} // 开始数据
                end={eletObj.totalDischarge} // 结束数据
                duration={0.5} // 持续时间
                separator="," // 分隔符
                decimals={2} // 保留小数位
                delay={0} // 设置为0的时候立即执行
                decimal="." // 小数点符号
                // redraw={true}  //如果为true，则组件将始终在每次重新渲染时进行动画处理。
              >
                {eletObj.totalDischarge}
              </CountUp>
            ) : (
              eletObj.totalDischarge
            )}
          </Descriptions.Item>
          <Descriptions.Item label="固件累计充入绿电">
            {eletObj.totalGreen ? (
              <CountUp
                start={0} // 开始数据
                end={eletObj.totalGreen} // 结束数据
                duration={0.5} // 持续时间
                separator="," // 分隔符
                decimals={2} // 保留小数位
                delay={0} // 设置为0的时候立即执行
                decimal="." // 小数点符号
                // redraw={true}  //如果为true，则组件将始终在每次重新渲染时进行动画处理。
              >
                {eletObj.totalGreen}
              </CountUp>
            ) : (
              eletObj.totalGreen
            )}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Table
        key={data}
        // locale={{
        //   emptyText: <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />,
        // }}
        // scroll={{ x: 'max-content', y: tableHeight }}
        expandable={{
          //配置展开属性
          expandedRowRender: (props: any) => {
            const datas =
              props.datas?.split('\n').filter((item: any) => {
                return item !== ''
              }) ?? []
            const list = datas.map((item: any, key: number) => {
              let [keyValue, time] = item?.split('-')
              return {
                keyValue,
                start: time?.split(',')[1],
                end: time?.split(',')[2],
                type: item?.split('-')[1]?.split(',')[0],
                key,
                ele3: time?.split(',')[3],
                ele4: time?.split(',')[4],
                ele5: time?.split(',')[5],
                ele6: time?.split(',')[6],
              }
            })
            const columns: ColumnsType<DataType> = [
              {
                title: '元数据',
                dataIndex: 'keyValue',
                key: 'keyValue',
                width: 550,
              },
              {
                title: '开始时间',
                dataIndex: 'start',
                key: 'start',
                width: 150,
              },
              {
                title: '结束时间',
                dataIndex: 'end',
                key: 'end',
                width: 150,
              },
              {
                title: '预留/充放电类型',
                dataIndex: 'type',
                key: 'type',
                width: 140,
                render: (type) => {
                  return (
                    <>
                      {type !== '0' && type !== '1'
                        ? '预留'
                        : type === '0'
                        ? '放电'
                        : '充电'}
                    </>
                  )
                },
              },
              {
                title: '开始电量',
                dataIndex: 'ele3',
                key: 'ele3',
                width: 100,
              },
              {
                title: '结束电量',
                dataIndex: 'ele4',
                key: 'ele4',
                width: 100,
              },
              {
                title: '充电/放电电量',
                dataIndex: 'ele5',
                key: 'ele5',
                width: 150,
              },
              {
                title: '绿电',
                dataIndex: 'ele6',
                key: 'ele6',
                width: 150,
              },
            ]
            return (
              <Table
                rowKey="key"
                sticky={{ offsetHeader: 0 }}
                pagination={false}
                columns={columns}
                dataSource={list}
              />
            )
          },
          defaultExpandedRowKeys: defaultExpandedRowKeys,
        }}
        rowKey="id"
        bordered
        pagination={{ showSizeChanger: false, ...pagination }}
        onChange={pageOnChange}
        loading={loading}
        columns={columns}
        dataSource={data}
      ></Table>
    </div>
  )
}

export default Home
