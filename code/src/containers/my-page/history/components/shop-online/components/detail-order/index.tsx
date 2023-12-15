import React, { useMemo } from 'react'
import {
  ContentModalStyled,
  InfoStyled,
  ModalDetailOrderStyled,
  TableInfoProductStyled,
  TableProduct,
  TableStyled,
  TotalPriceStyled
} from './styled'
import { ModalProps } from 'antd'
import Image from '@/components/common/image'
import { IOrderDetail } from '../..'
import dayjs from '@/utils/dayjs'
import { dateTimeFormat } from '@/constants/format'
import { useTranslation } from 'next-i18next'
import useDetectDevice from '@/hooks/useDetectDevice'

interface IDetailOrderComponent {
  modalProps: ModalProps
  orderDetail: IOrderDetail
}

export default function DetailOrderComponent({ modalProps, orderDetail }: IDetailOrderComponent) {
  const { t } = useTranslation('history')
  const deviceDetect = useDetectDevice()
  const { isMobile } = deviceDetect

  const columns: any = [
    {
      title: t('HISTORY.DETAIL_COL_PRODUCT'),
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, { productName, image, size }) => (
        <TableInfoProductStyled>
          <div className='image'>
            <Image fill src={image || ''} alt='product-image' />
          </div>
          <div className='detail'>
            <div className='detail-title'>{productName || ''}</div>
            <div className='detail-size'>{size || ''}</div>
          </div>
        </TableInfoProductStyled>
      ),
      width: '35%',
      align: 'center'
    },
    {
      title: t('HISTORY.DETAIL_COL_PRICE_YEN'),
      dataIndex: 'originProductPrice',
      key: 'originProductPrice',
      render: (_, { originProductPrice, tax }) => {
        const priceWithTax = originProductPrice + (originProductPrice * tax || 0) / 100

        let digits = 0
        if (!/\d/.test(priceWithTax)) {
          digits = 3
        }

        return (
          <div>
            {priceWithTax
              ? `${Number(priceWithTax)?.toLocaleString('en-US', {
                  minimumFractionDigits: digits
                })}円`
              : '-'}
          </div>
        )
      },
      width: '15%',
      align: 'center'
    },
    {
      title: t('HISTORY.DETAIL_COL_PRICE_TICKET'),
      dataIndex: 'originProductTicket',
      key: 'originProductTicket',
      render: (_, { originProductTicket }) => {
        let digits = 0
        if (!/\d/.test(originProductTicket)) {
          digits = 3
        }

        return (
          <div>
            {originProductTicket
              ? `${Number(originProductTicket)?.toLocaleString('en-US', {
                  minimumFractionDigits: digits
                })}枚`
              : '-'}
          </div>
        )
      },

      width: '15%',
      align: 'center'
    },
    {
      title: t('HISTORY.DETAIL_COL_NUMBER_TICKET'),
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, { quantity }) => <div>{quantity ?? ''}</div>,
      width: '5%',
      align: 'center'
    },
    {
      title: t('HISTORY.DETAIL_COL_TOTAL_YEN'),
      dataIndex: 'total_price',
      key: 'total_price',
      render: (_, { originProductPrice, quantity, tax }) => {
        const priceWithTax = originProductPrice * quantity + (originProductPrice * quantity * tax || 0) / 100

        let digits = 0
        if (!/\d/.test(priceWithTax.toString())) {
          digits = 3
        }

        return (
          <div>
            {priceWithTax
              ? `${priceWithTax?.toLocaleString('en-US', {
                  minimumFractionDigits: digits
                })}円`
              : '-'}
          </div>
        )
      },
      width: '15%',
      align: 'center'
    },
    {
      title: t('HISTORY.DETAIL_COL_TOTAL_TICKET'),
      dataIndex: 'total_ticket',
      key: 'total_ticket',
      render: (_, { originProductTicket, quantity }) => {
        let digits = 0
        if (!/\d/.test(originProductTicket)) {
          digits = 3
        }

        return (
          <div>
            {originProductTicket * quantity
              ? `${Number(originProductTicket * quantity)?.toLocaleString('en-US', {
                  minimumFractionDigits: digits
                })}枚`
              : '-'}
          </div>
        )
      },
      width: '15%',
      align: 'center'
    }
  ]

  const totalPriceOfOrder = useMemo(() => {
    let totalPrice = 0
    let digits = 0

    if (orderDetail.listProductOrderDetailDtoList?.[0]?.productPrice) {
      orderDetail.listProductOrderDetailDtoList.forEach((i) => {
        totalPrice += i.originProductPrice * i.quantity + (i.originProductPrice * i.quantity * (i.tax || 0)) / 100
      })

      if (!/\d/.test(totalPrice.toString())) {
        digits = 3
      }

      return (
        <div className='value'>
          {t('HISTORY.FORMAT_YEN_PRICE', {
            price: Number(totalPrice)?.toLocaleString('en-US', {
              minimumFractionDigits: digits
            })
          })}
        </div>
      )
    }

    orderDetail.listProductOrderDetailDtoList.forEach((i) => {
      totalPrice += i.originProductTicket * i.quantity
    })

    if (!/\d/.test(totalPrice.toString())) {
      digits = 3
    }

    return (
      <div className='value'>
        {t('HISTORY.FORMAT_TICKET_PRICE', {
          price: Number(totalPrice)?.toLocaleString('en-US', {
            minimumFractionDigits: digits
          })
        })}
      </div>
    )
  }, [orderDetail, t])

  const renderStatus = (status) => {
    let text = '-'
    let className = ''

    switch (status) {
      case 'SUCCESS':
        text = t('HISTORY.COMPLETED')
        className = 'success'
        break

      case 'CANCELLED_TRANSFERRED':
        text = t('HISTORY.STATUS_FAIL_PAID')
        className = 'error'
        break

      case 'PROGRESS':
        text = t('HISTORY.INPROGRESS')
        className = 'inprogess'
        break

      case 'DELIVERY':
        text = t('HISTORY.STATUS_SUCCESS')
        className = 'inprogess'
        break

      case 'CANCELLED_TRANSFERRING':
        text = t('HISTORY.STATUS_FAIL')
        className = 'inprogess'
        break

      default:
        break
    }

    return <div className={`right-info ${className}`}>{text}</div>
  }

  return (
    <ModalDetailOrderStyled getContainer={() => document.getElementById('shop-online') as any} {...modalProps}>
      <ContentModalStyled>
        <InfoStyled>
          <div className='row-info'>
            <div className='left-info'>{t('HISTORY.DETAIL_ORDER_CODE')}</div>
            <div className='right-info blue'>{orderDetail.historyOrderUserDto.orderId || ''}</div>
          </div>

          <div className='row-info'>
            <div className='left-info'>{t('HISTORY.DETAIL_ORDER_STATUS')}</div>
            {renderStatus(orderDetail.historyOrderUserDto.status)}
          </div>

          <div className='row-info'>
            <div className='left-info'>{t('HISTORY.DETAIL_ORDER_DATE')}</div>
            <div className='right-info gray'>
              {orderDetail.historyOrderUserDto.createdAt
                ? dayjs(orderDetail.historyOrderUserDto.createdAt).format(dateTimeFormat)
                : '-'}
            </div>
          </div>
        </InfoStyled>

        <TableProduct>
          <div className='title'>{t('HISTORY.DETAIL_ORDER_PRODUCT_LIST')}</div>

          <TableStyled
            bordered={false}
            dataSource={orderDetail.listProductOrderDetailDtoList || []}
            columns={columns}
            pagination={false}
            scroll={{
              x: isMobile() ? 991 : undefined,
              y: orderDetail.listProductOrderDetailDtoList?.length <= 3 ? undefined : 113 * 3
            }}
          />
        </TableProduct>

        <TotalPriceStyled>
          <div className='label'>{t('HISTORY.DETAIL_ORDER_TOTAL_AMOUNT')}</div>
          <div className='value'>{totalPriceOfOrder}</div>
        </TotalPriceStyled>
      </ContentModalStyled>
    </ModalDetailOrderStyled>
  )
}
