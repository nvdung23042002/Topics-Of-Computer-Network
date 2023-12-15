import { Collapse } from 'antd'
import React, { useState } from 'react'
import { CollapseStyled, HeaderNameStyled, HeaderStyled } from './styled'
import DeliveryComponent from './components/delivery-completed'
import InDeliveryComponent from './components/in-delivery'
import CancelComponent from './components/cancel'

import DetailOrderComponent from './components/detail-order'
import CloseIcon from '@/components/icons/CloseIcon'
import HistoryService from '@/services/History.service'
import { useTranslation } from 'next-i18next'

interface IProductInOrder {
  color: string
  image: string
  originProductPrice: number
  originProductTicket: number
  productId: number
  productName: string
  productPrice: number
  quantity: number
  size: string
  ticketNumber: number
  tax: number | null
}

export interface IOrderDetail {
  historyOrderUserDto: {
    createdAt: string
    feeShip: number
    menuNumberByStatus: number
    orderId: number
    status: string
    totalMoney: number
    totalProductCost: number
    totalProductCostTicket: number
    totalTicket: number
    typePayment: string
  }
  listProductOrderDetailDtoList: IProductInOrder[]
}

const { Panel } = Collapse

const COLLAPSE_ICON = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={isActive ? 'svg-active' : 'svg-none'}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path d='M6 9L12 15L18 9' stroke='#183B56' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
)

const ShopOnlineContent: React.FC = () => {
  const { t } = useTranslation('history')

  const [isOpen, setIsOpen] = useState(false)
  const [success, setSuccess] = useState(0)
  const [progress, setProgress] = useState(0)
  const [fail, setFail] = useState(0)
  const initOrderDetail = {
    historyOrderUserDto: {
      createdAt: '',
      feeShip: 0,
      menuNumberByStatus: 0,
      orderId: 0,
      status: '',
      totalMoney: 0,
      totalProductCost: 0,
      totalProductCostTicket: 0,
      totalTicket: 0,
      typePayment: ''
    },
    listProductOrderDetailDtoList: []
  }
  const [orderDetail, setOrderDetail] = useState<IOrderDetail>(initOrderDetail)

  const getOrderDetail = async (id) => {
    const response = await HistoryService.getShopOnlineHistoryDetail(id)
    const { data }: any = response

    setOrderDetail(data)
    setIsOpen(true)
  }

  const renderLabel = (name, num) => (
    <HeaderStyled>
      <HeaderNameStyled>
        <div className='name'>{name}</div>
        <div className='note'>
          {num} {t('HISTORY.PRODUCT')}
        </div>
      </HeaderNameStyled>
    </HeaderStyled>
  )

  const items = [
    {
      key: '1',
      label: renderLabel(t('HISTORY.COMPLETED'), success || 0),
      children: <DeliveryComponent getOrderDetail={getOrderDetail} setCount={setSuccess} />
    },
    {
      key: '2',
      label: renderLabel(t('HISTORY.CANCELLED'), fail || 0),
      children: <CancelComponent getOrderDetail={getOrderDetail} setCount={setFail} />
    },
    {
      key: '3',
      label: renderLabel(t('HISTORY.INPROGRESS'), progress || 0),
      children: <InDeliveryComponent getOrderDetail={getOrderDetail} setCount={setProgress} />
    }
  ]

  const onChange = (key: string | string[]) => {
    console.log(key)
  }

  const onCloseModal = async () => {
    await setOrderDetail(initOrderDetail)
    await setIsOpen(false)
  }

  const modalProps = {
    width: 875,
    onCancel: () => onCloseModal(),
    open: isOpen,
    destroyOnClose: true,
    title: t('HISTORY.ORDER_DETAIL'),
    closeIcon: <CloseIcon />,
    footer: null
  }

  return (
    <div id='shop-online'>
      <CollapseStyled
        defaultActiveKey={['1', '2', '3']}
        onChange={onChange}
        bordered={false}
        expandIcon={({ isActive }) => <COLLAPSE_ICON isActive={!!isActive} />}
      >
        {items.map((item) => (
          <Panel header={item.label} key={item.key}>
            <p>{item.children}</p>
          </Panel>
        ))}

        <DetailOrderComponent orderDetail={orderDetail} modalProps={modalProps} />
      </CollapseStyled>
    </div>
  )
}

export default ShopOnlineContent
