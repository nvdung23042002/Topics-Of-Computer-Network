import {
  ButtonCancel,
  ButtonSubmit,
  DescriptionsStyled,
  FormStyled,
  ModalBodyStyled,
  ModalStyled,
  TitleStyled
} from './create-auction-styled'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ModalRef } from '.'
import { Checkbox, Descriptions, Divider, Form } from 'antd'
import InputPrice from '@/components/input-price'
import ThreeArrowRightIcon from '@/components/icons/ThreeArrowRightIcon'
import Select from '../select'

type ResaleInformationProps = {
  handleSubmit: () => void
  open?: boolean
}

const CreateAuctionModal = forwardRef<ModalRef, ResaleInformationProps>(({ handleSubmit, ...props }, fwRef) => {
  const [open, setOpen] = useState<boolean>(props.open ?? false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  useImperativeHandle(
    fwRef,
    () => ({
      visible(id) {
        setOpen(true)
      },
      hidden() {
        setOpen(false)
      },
      setLoadingForm(isLoading: boolean) {
        setLoading(isLoading)
      },
      clearForm() {
        form.resetFields()
      }
    }),
    []
  )
  const optionStartDate = [
    {
      label: 'Now',
      value: 'now'
    }
  ]
  const optionDay = [
    {
      label: '7 日後',
      value: 7
    },
    {
      label: '14 日後',
      value: 14
    },
    {
      label: '30 日後',
      value: 30
    },
    {
      label: '60 日後',
      value: 60
    },
    {
      label: '90 日後',
      value: 90
    },
    {
      label: '期間を指定',
      value: ''
    }
  ]
  useEffect(() => {
    form.setFieldValue('start_date', optionStartDate[0].value)
    form.setFieldValue('day', '')
  }, [])
  return (
    <ModalStyled
      centered
      open={open}
      destroyOnClose
      width={900}
      closable={false}
      footer={null}
      title={null}
      className='custom-modal-antd'
    >
      <ModalBodyStyled className='modal-body'>
        <div className='header'>
          <TitleStyled>再販売情報</TitleStyled>
        </div>
        <FormStyled form={form} layout='vertical' className='form-content'>
          <div>
            <Form.Item label={<span className='label'>開始日</span>} name='start_date'>
              <Select options={optionStartDate} />
            </Form.Item>
            <Form.Item label={<span className='label'>終了日</span>} name='day'>
              <Select options={optionDay} />
            </Form.Item>
            <Form.Item label={<span className='label'>開始値段</span>} name='offerPrice_1'>
              <InputPrice color={'blue'} />
            </Form.Item>
            <Form.Item label={<span className='label'>最低値段</span>} name='offerPrice_2'>
              <InputPrice color={'blue'} />
            </Form.Item>
          </div>
          <div>
            <DescriptionsStyled title={<span>確認</span>} column={1} colon={false}>
              <Descriptions.Item label={'販売方法'}>
                <span className='color-blue'>普通</span>
              </Descriptions.Item>
              <Descriptions.Item label={'販売通貨'} className='last-child-top'>
                <span className='color-blue'>ETH</span>
              </Descriptions.Item>
              <Descriptions.Item>
                <Divider className='divider-description' />
              </Descriptions.Item>
              <Descriptions.Item label={'合計販売値段'}>
                <span className='color-blue'>0 ETH</span>
              </Descriptions.Item>
            </DescriptionsStyled>
            <Form.Item name='allow' valuePropName='checked'>
              <Checkbox className='checkbox'>{'利用規約に同意します'}</Checkbox>
            </Form.Item>
            <div className='action'>
              <ButtonCancel disabled={loading} onClick={() => setOpen(false)} className='btn-action'>
                キャンセル
              </ButtonCancel>
              <ButtonSubmit htmlType='submit' type='primary' className='btn-action'>
                再販
              </ButtonSubmit>
            </div>
            <ThreeArrowRightIcon className='three-arrow-right-icon' />
          </div>
        </FormStyled>
      </ModalBodyStyled>
    </ModalStyled>
  )
})

export default CreateAuctionModal
