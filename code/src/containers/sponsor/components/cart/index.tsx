import { CartButtonStyled, CartContainerStyled, CartList, CloseButton, InputStyled, SubmitButton } from './styled'
import Typography from '@/components/common/typography'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import CloseIcon from '@/components/icons/CloseIcon'
import classNames from 'classnames'
import { BNToFormat } from '@/utils/bigNumber'
import { useCallback, useMemo, useRef } from 'react'
import { removeCart, updateCart } from '@/redux/sponsor/slice'
import { useRouter as useNavigation } from 'next/navigation'
import { AppRoutes } from '@/constants/routes'
import { omit } from 'lodash'
import { createSponsorTransactionThunk } from '@/redux/sponsor/thunk'
import { Spin } from 'antd'
import { CartItem } from '@/services/dto/sponsor'
import ChevronDownIcon from '@/components/icons/ChevronDownIcon'

const Cart = () => {
  const cart = useAppSelector((state) => state.sponsor.cart)
  const loading = useAppSelector((state) => state.sponsor.loading)
  const cartRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigation()

  const onShowOrHidden = () => {
    const classList = cartRef.current?.classList
    if (classList?.contains('show')) {
      classList.remove('show')
      buttonRef.current?.classList.remove('show')
    } else {
      classList?.add('show')
      buttonRef.current?.classList.add('show')
    }
  }

  const onChangeMoney = useCallback(
    (value: number | null, { id, typeSponsor }: Partial<CartItem>) => {
      dispatch(updateCart({ sponsorAmount: value || undefined, dirty: true, id, typeSponsor }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onRemove = useCallback(
    (query: Partial<CartItem>) => {
      dispatch(removeCart(query))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onSubmit = useCallback(async () => {
    const data = cart.list?.map((item) => {
      const cartItem: any = omit({ ...item }, ['id', 'date'])
      if (item.typeSponsor === 'TOURNAMENT') cartItem.tournamentId = item.id
      else cartItem.matchId = item.id
      return cartItem
    })

    const { meta } = await dispatch(createSponsorTransactionThunk(data))

    if (meta.requestStatus === 'fulfilled') {
      if ((window?.visualViewport?.width ?? 0) < 776) {
        onShowOrHidden()
      }
      navigate.push(AppRoutes.sponsorHistory)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.list])

  const isInvalid: string | boolean = useMemo(() => {
    if (cart.list.some((item) => (item.sponsorAmount ?? 0) < 1000)) {
      return 'No sponsor'
    }

    return false
  }, [cart.list])

  return (
    <>
      <CartContainerStyled ref={cartRef}>
        <Typography.Title className='title' level={5}>
          スポンサー対象エベント一覧
        </Typography.Title>
        <Spin spinning={loading} wrapperClassName='pb-5'>
          <CartList>
            {cart.list?.length ? (
              <>
                {cart.list?.map((item) => (
                  <div className='cart-item' key={`${item.typeSponsor}-${item.id}`}>
                    <CloseButton
                      icon={<CloseIcon />}
                      type='text'
                      onClick={() => onRemove({ id: item.id, typeSponsor: item.typeSponsor })}
                      disabled={loading}
                    />
                    <Typography.Text className='date'>{item.date}</Typography.Text>

                    <div
                      className={classNames('label', { match: item.typeSponsor === 'MATCH' }, 'text-nowrap')}
                      title={item.sponsorshipName}
                    >
                      {item.sponsorshipName}
                    </div>
                    <InputStyled
                      inputMode='decimal'
                      min={0}
                      defaultValue={item.sponsorAmount}
                      value={item.sponsorAmount ?? undefined}
                      formatter={(value) => (value ? BNToFormat(value) : '')}
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, '') ?? ''}
                      onChange={(value: number) =>
                        !loading && onChangeMoney(value, { id: item.id, typeSponsor: item.typeSponsor })
                      }
                      disabled={loading}
                    />
                    {(item.sponsorAmount < 1000 || !item.sponsorAmount) && item.dirty && (
                      <Typography.Text className='err-message'>*1000円以上の金額を入力してください。</Typography.Text>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <Typography.Text className='center-box empty-text'>
                イベントを選択し、スポンサーシップの目標額に達成してください。
              </Typography.Text>
            )}
          </CartList>
          {cart.list?.length !== 0 && (
            <div className='toolbar'>
              <div className='total'>
                <Typography.Title level={5}>スポンサー合計金額</Typography.Title>
                <Typography.Title level={5}>{BNToFormat(cart.total)}円</Typography.Title>
              </div>

              <SubmitButton loading={loading} type='primary' disabled={!!isInvalid} onClick={onSubmit}>
                確認
              </SubmitButton>
            </div>
          )}
        </Spin>
      </CartContainerStyled>
      <CartButtonStyled ref={buttonRef} htmlType='button' onClick={onShowOrHidden}>
        スポンサー付きイベント
        <span className='nav-icon'>
          <ChevronDownIcon />
        </span>
      </CartButtonStyled>
    </>
  )
}

export default Cart
