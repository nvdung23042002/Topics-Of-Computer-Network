import { ButtonStyled, SearchContainer, SearchGroupMobileStyled } from './styled'
import { forwardRef, useImperativeHandle, useState } from 'react'
import Select from '@/components/common/form/Select'
import RangeDatePicker from '@/components/common/form/RangeDatePicker'
import { useWindowSize } from '@/hooks/useWindowResize'

export type Search = {
  statusPayment?: string
  typePayment?: string
  fromDate?: string
  toDate?: string
  typeSponsor?: string
}

type SearchToolType = {
  type: 'HISTORY' | 'PAYMENT'
  onSearch?: (val: Search | undefined) => void
}

export type SearchToolHandle = {
  search: () => void
  getParams: () => Search
}

export default forwardRef<SearchToolHandle, SearchToolType>(({ onSearch, type }, forwardedRef) => {
  const [value, setValue] = useState<Search | undefined>({})
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  useImperativeHandle(
    forwardedRef,
    () => ({
      search() {
        onSearch && onSearch(value)
      },
      getParams() {
        return { ...value }
      }
    }),
    [value, onSearch]
  )
  return (
    <SearchContainer>
      {type === 'PAYMENT' && (
        <>
          <div className='group payment-search'>
            <Select
              label='状態'
              placeholder='状態	'
              value={value?.statusPayment ?? ''}
              options={[
                { label: '全て', value: '' },
                { label: '申請中', value: 'REQUESTING' },
                { label: '承認済み', value: 'APPROVED' }
              ]}
              onChange={(value) => {
                setValue((prev) => ({ ...prev, statusPayment: value || undefined }))
              }}
            />
          </div>
          <div className='button'>
            <ButtonStyled
              style={{ width: '100px', minWidth: 'unset', margin: 0 }}
              shape='round'
              type='primary'
              onClick={() => onSearch && onSearch(value)}
            >
              検索
            </ButtonStyled>
          </div>
        </>
      )}
      {type === 'HISTORY' &&
        (isMaxWidth1199 ? (
          <SearchGroupMobileStyled>
            <div className='first-condition-group'>
              <div className='group'>
                <Select
                  label='タイプ'
                  placeholder='タイプ	'
                  value={value?.typeSponsor ?? ''}
                  options={[
                    { label: '全て', value: '' },
                    { label: '大会', value: 'TOURNAMENT' },
                    { label: '試合', value: 'MATCH' }
                  ]}
                  onChange={(value) => {
                    setValue((prev) => ({ ...prev, typeSponsor: value || undefined }))
                  }}
                />
              </div>
              <div className='group'>
                <Select
                  label='支払い方法'
                  placeholder='支払い方法	'
                  value={value?.typePayment ?? ''}
                  options={[
                    { label: '全て', value: '' },
                    { label: 'クレジットカード', value: 'CREDIT_CARD' },
                    { label: '請求書', value: 'INVOICE' }
                  ]}
                  onChange={(value) => {
                    setValue((prev) => ({ ...prev, typePayment: value || undefined }))
                  }}
                />
              </div>
            </div>
            <div className='group second-condition-group'>
              <RangeDatePicker
                popupClassName='popup-range-picker-history-mobile'
                label='作成日'
                placeholder={['yyyy-mm-dd', 'yyyy-mm-dd']}
                value={[value?.fromDate ?? '', value?.toDate ?? '']}
                onValueChange={(fromDate, toDate) => {
                  setValue((prev) => ({ ...prev, fromDate, toDate }))
                }}
                changeOnBlur={true}
              />
            </div>
            <div className='third-condition-group'>
              <div className='group'>
                <Select
                  label='状態'
                  placeholder='状態	'
                  value={value?.statusPayment ?? ''}
                  options={[
                    { label: '全て', value: '' },
                    // { label: '申請中', value: 'REQUESTING' },
                    // { label: '承認済み', value: 'APPROVED' },
                    { label: '確認待ち', value: 'PROCESSING' },
                    { label: '完了', value: 'COMPLETED' },
                    { label: '拒否', value: 'REJECTED' },
                    { label: '中止・支払い中', value: 'CANCELLED_TRANSFERRING' },
                    { label: '中止・支払い済み', value: 'CANCELLED_TRANSFERRED' }
                  ]}
                  onChange={(value) => {
                    setValue((prev) => ({ ...prev, statusPayment: value || undefined }))
                  }}
                />
              </div>
              <div className='button'>
                <ButtonStyled
                  style={{ width: '100px', minWidth: 'unset', margin: 0 }}
                  shape='round'
                  type='primary'
                  onClick={() => onSearch && onSearch(value)}
                >
                  検索
                </ButtonStyled>
              </div>
            </div>
          </SearchGroupMobileStyled>
        ) : (
          <>
            <div className='group'>
              <Select
                label='タイプ'
                placeholder='タイプ	'
                value={value?.typeSponsor ?? ''}
                options={[
                  { label: '全て', value: '' },
                  { label: '大会', value: 'TOURNAMENT' },
                  { label: '試合', value: 'MATCH' }
                ]}
                onChange={(value) => {
                  setValue((prev) => ({ ...prev, typeSponsor: value || undefined }))
                }}
              />
            </div>
            <div className='group'>
              <RangeDatePicker
                label='作成日'
                placeholder={['yyyy-mm-dd', 'yyyy-mm-dd']}
                value={[value?.fromDate ?? '', value?.toDate ?? '']}
                onValueChange={(fromDate, toDate) => {
                  setValue((prev) => ({ ...prev, fromDate, toDate }))
                }}
                changeOnBlur={true}
              />
            </div>
            <div className='group'>
              <Select
                label='支払い方法'
                placeholder='支払い方法	'
                value={value?.typePayment ?? ''}
                options={[
                  { label: '全て', value: '' },
                  { label: 'クレジットカード', value: 'CREDIT_CARD' },
                  { label: '請求書', value: 'INVOICE' }
                ]}
                onChange={(value) => {
                  setValue((prev) => ({ ...prev, typePayment: value || undefined }))
                }}
              />
            </div>
            <div className='group'>
              <Select
                label='状態'
                placeholder='状態	'
                value={value?.statusPayment ?? ''}
                options={[
                  { label: '全て', value: '' },
                  // { label: '申請中', value: 'REQUESTING' },
                  // { label: '承認済み', value: 'APPROVED' },
                  { label: '確認待ち', value: 'PROCESSING' },
                  { label: '完了', value: 'COMPLETED' },
                  { label: '拒否', value: 'REJECTED' },
                  { label: '中止・支払い中', value: 'CANCELLED_TRANSFERRING' },
                  { label: '中止・支払い済み', value: 'CANCELLED_TRANSFERRED' }
                ]}
                onChange={(value) => {
                  setValue((prev) => ({ ...prev, statusPayment: value || undefined }))
                }}
              />
            </div>
            <div className='button'>
              <ButtonStyled
                style={{ width: '100px', minWidth: 'unset', margin: 0 }}
                shape='round'
                type='primary'
                onClick={() => onSearch && onSearch(value)}
              >
                検索
              </ButtonStyled>
            </div>
          </>
        ))}
    </SearchContainer>
  )
})
