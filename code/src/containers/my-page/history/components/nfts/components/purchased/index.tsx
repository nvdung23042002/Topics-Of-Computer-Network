import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  ButtonGroupStyled,
  CollapseStyled,
  ContainerPanel,
  ListProduct,
  PanelStyled,
  PurchasedContainer,
  TitleCollapse
} from './styled'
import Typography from '@/components/common/typography'
import Product from '@/components/product'
import Button from '../../common/button'
import ResaleInformationModal from '../../common/modal/resale-information'
import { ModalRef } from '../../common/modal'
import CreateAuctionModal from '../../common/modal/create-auction'
import HistoryService from '@/services/History.service'
import { ProductHistory } from '@/services/dto/history'
import { useRouter } from 'next/router'
import { approveNftFromIndex } from '@/utils/approveNftFromIndex'
import Config from '@/config'
import { useAppSelector } from '@/hooks/store'
import useModal from '@/hooks/useModal'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import { isAxiosError } from 'axios'

const Purchased = () => {
  const { t } = useTranslation('history')
  const resaleInformationModalRef = useRef<ModalRef | null>(null)
  const createAuctionModalRef = useRef<ModalRef | null>(null)
  const collapseList: string[] = ['OWNED_ITEMS', 'SELLING_ITEMS', 'RESALE_OFFER_ITEMS', 'RESOLD_ITEMS']
  const { locale } = useRouter()
  const [ownedItems, setOwnedItems] = useState<ProductHistory[]>([])
  const [sellingItems, setSellingItems] = useState<ProductHistory[]>([])
  const [resellItems, setResellItems] = useState<ProductHistory[]>([])
  const [resoldItems, setResoldItems] = useState<ProductHistory[]>([])
  const user = useAppSelector((state) => state?.auth?.user)
  const { closeModal, openModal } = useModal()
  const [pages, setPages] = useState({
    OWNED_ITEMS: 0,
    SELLING_ITEMS: 0,
    RESALE_OFFER_ITEMS: 0,
    RESOLD_ITEMS: 0
  })
  const [loading, setLoading] = useState(false)
  const queryParam = useMemo(() => {
    return { langKey: locale?.toUpperCase() ?? 'JA', limit: 200, page: 1 }
  }, [locale])
  const enumGetData = {
    OWNED_ITEMS: useMemo(() => {
      return ownedItems
    }, [ownedItems]),
    SELLING_ITEMS: useMemo(() => {
      return sellingItems
    }, [sellingItems]),
    RESALE_OFFER_ITEMS: useMemo(() => {
      return resellItems
    }, [resellItems]),
    RESOLD_ITEMS: useMemo(() => {
      return resoldItems
    }, [resoldItems])
  }
  const fetchData = async () => {
    setLoading(true)
    try {
      const ownedItemsResponse = HistoryService.getOwnedItems(queryParam)
      const sellingItemsResponse = HistoryService.getSellingItems(queryParam)
      const resellItemsResponse = HistoryService.getResaleOfferItems(queryParam)
      const resoldItemsResponse = HistoryService.getResoldItems(queryParam)
      const [
        { result: ownedItemsResult, total: ownedPages },
        { result: sellingItemsResult, total: sellingPages },
        { result: resellItemsResult, total: resellPages },
        { result: resoldItemsResult, total: resoldPages }
      ] = await Promise.all([ownedItemsResponse, sellingItemsResponse, resellItemsResponse, resoldItemsResponse])
      setOwnedItems(ownedItemsResult)
      setSellingItems(sellingItemsResult)
      setResellItems(resellItemsResult)
      setResoldItems(resoldItemsResult)
      setPages({
        OWNED_ITEMS: ownedPages,
        SELLING_ITEMS: sellingPages,
        RESALE_OFFER_ITEMS: resellPages,
        RESOLD_ITEMS: resoldPages
      })
    } catch (error) {
      console.log(error)
      setOwnedItems([])
      setSellingItems([])
      setResellItems([])
      setResoldItems([])
      setPages({
        OWNED_ITEMS: 0,
        SELLING_ITEMS: 0,
        RESALE_OFFER_ITEMS: 0,
        RESOLD_ITEMS: 0
      })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
    return () => {
      setOwnedItems([])
      setSellingItems([])
      setResellItems([])
      setResoldItems([])
      setPages({
        OWNED_ITEMS: 0,
        SELLING_ITEMS: 0,
        RESALE_OFFER_ITEMS: 0,
        RESOLD_ITEMS: 0
      })
    }
  }, [locale])
  const handelResale = async (values: any) => {
    setLoading(true)
    resaleInformationModalRef.current?.setLoadingForm(true)
    try {
      await approveNftFromIndex(
        Config.RPC_END_POINT,
        Config.NSB_ERC721A_CONTRACT_ADDRESS,
        user?.privateKey,
        values?.tokenId,
        Config.EXCHANGE_CONTRACT_ADDRESS
      )
      await HistoryService.registerResale(values, values?.productResellId)
      resaleInformationModalRef.current?.setLoadingForm(false)
      setLoading(false)
      openModal({
        type: 'notification',
        title: t('REGISTER_RESALE_SUCCESS_TITLE'),
        subContent: <>{t('REGISTER_RESALE_SUCCESS_MESSAGE')}</>,
        okText: 'OK',
        onOk: () => {
          resaleInformationModalRef.current?.hidden()
          resaleInformationModalRef.current?.clearForm()
          closeModal()
          fetchData()
        }
      })
    } catch (error) {
      if (isAxiosError(error)) {
        showMessage({ error: t(t(getError(error) ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
      } else {
        showMessage({ error: t(t(error.message ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
      }
      resaleInformationModalRef.current?.setLoadingForm(false)
    } finally {
      setLoading(false)
      resaleInformationModalRef.current?.setLoadingForm(false)
    }
  }
  const handleCancelResale = async (id: any) => {
    try {
      await HistoryService.cancelResale(id)
      openModal({
        type: 'notification',
        title: t('CANCEL_RESALE_SUCCESS_TITLE'),
        subContent: <>{t('CANCEL_RESALE_SUCCESS_MESSAGE')}</>,
        okText: 'OK',
        onOk: () => {
          closeModal()
          fetchData()
        }
      })
    } catch (error) {
      showMessage({ error: t(t(getError(error)?.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
    }
  }
  const handelConfirmCancelResale = async (id: any) => {
    openModal({
      type: 'confirmation',
      title: t('CONFIRM', { ns: 'common' }),
      content: t('MESSAGE_CONFIRM_CANCEL_RESALE'),
      onOk: () => {
        closeModal()
        handleCancelResale(id)
      },
      okText: t('CONFIRM', { ns: 'common' }) as string,
      onCancel: () => {
        closeModal()
      }
    })
  }
  const handleStatusOffer = async (id: string, isActive: boolean) => {
    try {
      await HistoryService.updateStatusOffer(id, { canOfferFlag: isActive })
      fetchData()
    } catch (error) {
      showMessage({ error: t(t(getError(error)?.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
    }
  }
  return (
    <>
      <PurchasedContainer>
        <CollapseStyled defaultActiveKey={[...collapseList]} bordered={false}>
          {collapseList?.map((collapse, index) => (
            <PanelStyled
              key={collapse}
              header={
                <TitleCollapse>
                  <Typography.Title level={5} className='title'>
                    {t(collapse)}
                  </Typography.Title>
                  <Typography.Text className='count-product'>{`${pages[collapse]} ${t('ITEMS')}`}</Typography.Text>
                </TitleCollapse>
              }
            >
              <ContainerPanel>
                <ListProduct
                  grid={{ gutter: 0, xs: 2, sm: 2, lg: 3, md: 3, xl: 3, xxl: 3 }}
                  dataSource={enumGetData[collapse]}
                  loading={loading}
                  renderItem={(item: ProductHistory, index) => {
                    return (
                      <ListProduct.Item key={index}>
                        <Product
                          id={item.id.toString()}
                          status={item.status.toUpperCase()}
                          src={item?.imageUrl}
                          collectionName={item?.categoryName}
                          name={item?.name}
                          priceETH={item?.price}
                          wishCount={item?.wishCount}
                          price={item?.yenPrice}
                          locale={locale}
                        />
                        {
                          {
                            ['OWNED_ITEMS']: (
                              <ButtonGroupStyled>
                                <Button
                                  theme='RESALE'
                                  className='button-action'
                                  type='primary'
                                  onClick={() => {
                                    resaleInformationModalRef.current?.visible()
                                    if (resaleInformationModalRef.current?.setData) {
                                      resaleInformationModalRef.current?.setData({
                                        resellType: 'NORMAL',
                                        productResellId: item.id,
                                        currency: 'ETH',
                                        commissionFree: 0,
                                        adminPercent: 0,
                                        maxQuantity: 0,
                                        approvePublicAddress: user?.publicAddress,
                                        tokenId: item.tokenId
                                      })
                                    }

                                    // handelResale(JSON.stringify(item.tokenId))
                                  }}
                                  loading={loading}
                                >
                                  {''}
                                  {t('RESALE')}
                                </Button>
                                <div className='btn-group-child'>
                                  <Button
                                    theme={item.canOfferFlag ? 'RESALE_OFFER_INACTIVE' : 'RESALE_OFFER_ACTIVE'}
                                    className='button-action'
                                    type='primary'
                                    loading={loading}
                                    disabled={!item.canOfferFlag}
                                    onClick={() => {
                                      handleStatusOffer(item.id as unknown as string, false)
                                    }}
                                  >
                                    {''}
                                    {t('INACTIVE_OFFER')}
                                  </Button>
                                  <Button
                                    theme={!item.canOfferFlag ? 'RESALE_OFFER_INACTIVE' : 'RESALE_OFFER_ACTIVE'}
                                    className='button-action'
                                    type='primary'
                                    loading={loading}
                                    disabled={item.canOfferFlag}
                                    onClick={() => {
                                      handleStatusOffer(item.id as unknown as string, true)
                                    }}
                                  >
                                    {''}
                                    {t('ACTIVE_OFFER')}
                                  </Button>
                                </div>
                              </ButtonGroupStyled>
                            ),
                            ['SELLING_ITEMS']: (
                              <ButtonGroupStyled>
                                <Button
                                  theme='CANCEL'
                                  className='button-action'
                                  type='primary'
                                  onClick={() => {
                                    handelConfirmCancelResale(item?.id)
                                  }}
                                >
                                  {t('CANCEL_RESALE')}
                                </Button>
                                <div className='btn-group-child'>
                                  <Button
                                    theme={item.canOfferFlag ? 'RESALE_OFFER_INACTIVE' : 'RESALE_OFFER_ACTIVE'}
                                    className='button-action'
                                    type='primary'
                                    loading={loading}
                                    disabled={!item.canOfferFlag}
                                    onClick={() => {
                                      handleStatusOffer(item.id as unknown as string, false)
                                    }}
                                  >
                                    {''}
                                    {t('INACTIVE_OFFER')}
                                  </Button>
                                  <Button
                                    theme={!item.canOfferFlag ? 'RESALE_OFFER_INACTIVE' : 'RESALE_OFFER_ACTIVE'}
                                    className='button-action'
                                    type='primary'
                                    loading={loading}
                                    disabled={item.canOfferFlag}
                                    onClick={() => {
                                      handleStatusOffer(item.id as unknown as string, true)
                                    }}
                                  >
                                    {''}
                                    {t('ACTIVE_OFFER')}
                                  </Button>
                                </div>
                              </ButtonGroupStyled>
                            )
                            // ['RESALE_OFFER_ITEMS']: (
                            //   <ButtonGroupStyled>
                            //     <Button theme='RESALE' className='button-action' type='primary'>
                            //       再販
                            //     </Button>
                            //   </ButtonGroupStyled>
                            // ),
                            // ['RESOLD_ITEMS']: (
                            //   <ButtonGroupStyled>
                            //     <Button theme='RESALE' className='button-action' type='primary'>
                            //       再販
                            //     </Button>
                            //   </ButtonGroupStyled>
                            // )
                          }[collapse]
                        }
                      </ListProduct.Item>
                    )
                  }}
                />
              </ContainerPanel>
            </PanelStyled>
          ))}
        </CollapseStyled>
      </PurchasedContainer>
      <ResaleInformationModal
        handleSubmit={(data) => {
          handelResale(data)
        }}
        ref={resaleInformationModalRef}
      />
      <CreateAuctionModal
        handleSubmit={() => {
          return null
        }}
        ref={createAuctionModalRef}
      />
    </>
  )
}

export default Purchased
