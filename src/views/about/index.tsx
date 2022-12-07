/*
 * @Description:
 * @Version: 1.0.0
 * @Autor: haowenbin
 * @Date: 2022-12-07 17:43:39
 * @LastEditors: haowenbin
 * @LastEditTime: 2022-12-07 18:32:50
 * @FilePath: \gpn-sn-search\src\views\about\index.tsx
 */
import React from 'react'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import './index.less'
interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 200,
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    width: 200,
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',

    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

const data: DataType[] = []

const App: React.FC = () => (
  <Table
    scroll={{ x: 'max-content' }}
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
    }}
    rowKey="id"
    bordered
    columns={columns}
    dataSource={data}
  />
)

export default App
