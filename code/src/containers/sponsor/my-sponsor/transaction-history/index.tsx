import { useAppDispatch, useAppSelector } from '@/hooks/store'
import History from './history'
import Payment from './payment'
import { useEffect } from 'react'
import { getPriceRateThunk } from '@/redux/auth/thunk'
import { Collapse, Spin } from 'antd'
import { Text700Styled } from '@/components/styled'
import { useWindowSize } from '@/hooks/useWindowResize'
import { TransactionHistoryCollapseStyled, TransactionHistoryWrapperStyled } from './styled'
const { Panel } = Collapse

const TransactionHistory = () => {
  const loading = useAppSelector((state) => state.sponsor.loading)
  const dispatch = useAppDispatch()

  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  useEffect(() => {
    ;(async () => {
      await dispatch(getPriceRateThunk({}))
    })()
  }, [dispatch])
  return (
    <TransactionHistoryWrapperStyled className='sponsor-body'>
      {isMaxWidth1199 ? (
        <>
          <div className='bread-crumb-mobile'>
            <Text700Styled className='title-transaction'>スポンサーの支払い</Text700Styled>
          </div>
          <TransactionHistoryCollapseStyled>
            <Panel header='スポンサー管理' key={1}>
              <Spin spinning={loading}>
                <Payment />
              </Spin>
            </Panel>
            <Panel header='スポンサー履歴管理' key={2}>
              <History />
            </Panel>
          </TransactionHistoryCollapseStyled>
        </>
      ) : (
        <>
          <Spin spinning={loading}>
            <Payment />
          </Spin>
          <History />
        </>
      )}
    </TransactionHistoryWrapperStyled>
  )
}

export default TransactionHistory
