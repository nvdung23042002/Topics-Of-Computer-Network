import React, { useEffect, useState } from 'react'
import { ConfigProvider, PaginationProps } from 'antd'
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { ButtonStyled, PaginationContainerStyled, PaginationStyled } from './styled'
import classNames from 'classnames'
const Pagination = (props: PaginationProps) => {
  const [current, setCurrent] = useState(1)
  const { total = 0, pageSize = 10 } = props
  const totalPage = Math.ceil(((total as number) / pageSize) as number)
  useEffect(() => {
    if (props.current) {
      setCurrent(props.current)
    }
  }, [props.current])
  return (
    <ConfigProvider
      theme={{
        components: { Button: { borderRadius: 6 } }
      }}
    >
      <PaginationContainerStyled
        className={classNames({
          hidden: !(total > pageSize)
        })}
      >
        <ButtonStyled
          type='text'
          icon={<DoubleLeftOutlined />}
          disabled={current === 1}
          onClick={() => {
            setCurrent(1)
            if (props.onChange) props.onChange(1, pageSize)
          }}
        />
        <PaginationStyled
          onChange={(page: number, pageSize: number) => {
            setCurrent(page)
            if (props.onChange) props.onChange(page, pageSize)
          }}
          current={current}
          {...props}
          showQuickJumper={false}
          showSizeChanger={false}
          hideOnSinglePage={true}
          showLessItems={true}
        />
        <ButtonStyled
          type='text'
          icon={<DoubleRightOutlined />}
          disabled={current === totalPage}
          onClick={() => {
            setCurrent(totalPage)
            if (props.onChange) props.onChange(totalPage, pageSize)
          }}
        />
      </PaginationContainerStyled>
    </ConfigProvider>
  )
}

export default Pagination
