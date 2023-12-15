import { TableProps, PaginationProps, ConfigProvider } from 'antd'
import { PaginationBox, TableContainerStyled, TableStyled } from './styled'
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react'
import memoizeOne from 'memoize-one'
import Pagination from '../pagination'
import { Theme } from '@/theme'
import { ThemeProvider } from 'styled-components'
import classNames from 'classnames'
import SortIcon from './components/icons/SortIcon'
type SortType = {
  sortColumns: string[]
  sortColumn?: string
  sortType?: 'ASC' | 'DESC'
}
interface TablePropsType extends TableProps<any> {
  action?: (data: { page: number; limit: number } | any) => any
  payload?: any
  rowKey: string | (() => string)
  loading?: boolean
  items?: any[]
  columns: any[]
  total?: number
  page?: number
  sort?: SortType
  limit?: number
  autoFetchOnMount?: boolean
  defaultSort?: any
  typeSort?: string
  sortIcon?: any
}

export type TableHandle = {
  onRefreshData: (page?: number) => void
  onRefreshDataNotScroll: (page?: number) => void
  scrollTop: () => void
}

export interface CommonPaginationProps extends PaginationProps {
  boxClassName?: string
}

const Paginator = (({ boxClassName, total = 0, pageSize = 10, ...props }) => (
  <PaginationBox className={boxClassName ?? ''}>
    {total > pageSize && <Pagination total={total} pageSize={pageSize} {...props} />}
  </PaginationBox>
)) as React.FC<CommonPaginationProps>
const negativeSort: { default: 'ASC'; ASC: 'DESC'; DESC: undefined } = {
  default: 'ASC',
  ASC: 'DESC',
  DESC: undefined
}

export default forwardRef<TableHandle, TablePropsType>(
  ({ columns, items, page = 0, total = 0, pagination = true, limit, action, sort, ...props }, forwardRef) => {
    const scrollTop = () => document.querySelector('.ant-table-body')?.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const fetchData = useCallback(
      async (page: number, notScroll = false, sortColumn?: string, sortType?: string) => {
        if (action) {
          await action({
            page,
            limit: limit ?? 10,
            sortColumn,
            sortType
          })
          if (!notScroll) scrollTop()
        }
      },
      [limit, action]
    )

    const onPaginationChange = (page: number) => {
      fetchData(page)
    }

    const getColumns = useMemo(() => {
      return memoizeOne((columns: any[]) => {
        return columns.map((column: any) => {
          const isSort = sort?.sortColumns?.includes(column.dataIndex)
          const isMatchColumn = sort?.sortColumn === column.dataIndex && sort?.sortType
          return {
            ...column,
            title: isSort ? (
              <button
                className={classNames('sort', {
                  [`sort-${sort?.sortType}`.toLowerCase()]: isMatchColumn
                })}
                onClick={() => {
                  const sortType = negativeSort[isMatchColumn ? sort.sortType ?? 'default' : 'default']
                  fetchData(page, false, sortType && column.dataIndex, sortType)
                }}
              >
                <span>{column.title}</span> {isSort && <SortIcon />}
              </button>
            ) : (
              column.title
            )
          }
        })
      })
    }, [sort, fetchData, page])
    useImperativeHandle(
      forwardRef,
      () => ({
        onRefreshData(page = 0) {
          fetchData(page)
        },
        onRefreshDataNotScroll(page = 0) {
          fetchData(page, true)
        },
        scrollTop() {
          return scrollTop()
        }
      }),
      [fetchData]
    )

    return (
      <TableContainerStyled>
        <TableStyled {...props} columns={getColumns(columns)} dataSource={items} pagination={false} />
        {props.children}
        {pagination && total > (limit ?? 10) && (
          <ConfigProvider theme={Theme}>
            <ThemeProvider theme={Theme}>
              <Paginator
                boxClassName='table-pagination'
                total={total}
                pageSize={limit ?? 10}
                current={page}
                showSizeChanger={false}
                onChange={onPaginationChange}
              />
            </ThemeProvider>
          </ConfigProvider>
        )}
      </TableContainerStyled>
    )
  }
)
