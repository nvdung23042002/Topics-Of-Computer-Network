import { LayoutAntStyled } from '@/app/layout-sponsor/styled'
import { ButtonStyled, LoginContainerStyled } from './styled'
import Logo from '@/components/logo'
import Typography from '@/components/common/typography'
import { useTranslation } from 'next-i18next'
import { Form, Spin } from 'antd'
import Input, { InputPropsType } from '@/components/common/form/Input'
import { AppRoutes } from '@/constants/routes'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useRouter } from 'next/navigation'
import { getSponsorProfileThunk } from '@/redux/auth-sponsor/thunk'
import SponsorService from '@/services/Sponsor.service'
import useModal from '@/hooks/useModal'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'

const CustomInput = ({ attention, ...props }: { attention: string } & InputPropsType) => {
  const { status } = Form.Item.useStatus()
  return (
    <>
      <Input {...props} />
      {(status === 'success' || !status) && (
        <Typography.Text className='text-left input-attention'>{attention}</Typography.Text>
      )}
    </>
  )
}

const SubmitButton = () => {
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const form = Form.useFormInstance()
  const { t } = useTranslation('sponsor')
  // Watch all values
  const values = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setCanSubmit(true)
      },
      () => {
        setCanSubmit(false)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  return (
    <ButtonStyled className='w-100' htmlType='submit' type='primary' shape={'round'} disabled={!canSubmit}>
      {t('SET_NEW_PASSWORD')}
    </ButtonStyled>
  )
}

const ForgotPassword = () => {
  const zone = useAppSelector((state) => state.app.zone)
  const { t } = useTranslation('sponsor', { useSuspense: false })
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useRouter()
  const isAuthenticated = useAppSelector((state) => state.authSponsor.isAuthenticated)
  const sponsorProfile = useAppSelector((state) => state.authSponsor.sponsorProfile)
  const { openModal, closeModal } = useModal()
  useEffect(() => {
    /** Not support global version */
    if (zone === 'global') {
      navigate.replace(AppRoutes[404])
      return
    }
    if (!isAuthenticated) {
      navigate.replace(AppRoutes.sponsorLogin)
    } else if (!sponsorProfile) {
      dispatch(getSponsorProfileThunk())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, sponsorProfile, zone])
  const onChangePassword = async (value: any) => {
    setLoading(true)
    try {
      await SponsorService.changePasswordSponsorProfile({ password: value['password'] }, sponsorProfile.sponsorId)
      openModal({
        type: 'notification',
        title: '成功',
        subContent: (
          <div
            dangerouslySetInnerHTML={
              {
                __html: t('CHANGE_PASSWORD_SPONSOR_SUCCESS', {
                  ns: 'sponsor'
                })
              } as any
            }
          />
        ),
        onOk: () => {
          closeModal()
          navigate.replace(AppRoutes.editSponsorProfile)
        }
      })
    } catch (error) {
      showMessage({ error: getError(error)?.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <LayoutAntStyled>
      <LoginContainerStyled>
        <Spin spinning={loading}>
          <Logo />
          <Typography.Title>{t('SPONSOR_UPDATE_PASSWORD_TITLE')}</Typography.Title>

          <Form form={form} onFinish={onChangePassword}>
            <Form.Item
              rootClassName='text-left pb-5'
              name='password'
              rules={[
                { required: true, message: t('PASSWORD_MINIMUM') ?? '' },
                { min: 8, message: t('PASSWORD_MINIMUM') ?? '' }
              ]}
              dependencies={['passwordConfirmation']}
            >
              <CustomInput attention='最低8文字必要です。' label={t('PASSWORD')} inputType='password' isRequired />
            </Form.Item>
            <Form.Item
              rootClassName='text-left pb-5'
              name='passwordConfirmation'
              rules={[
                { required: true, message: t('PASSWORD_MINIMUM') ?? '' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error(t('PASSWORD_NOT_MATCH') ?? ''))
                  }
                })
              ]}
              dependencies={['password']}
            >
              <CustomInput
                attention='両方のパスワードは一致する必要があります。'
                label={t('PASSWORD_CONFIRMATION')}
                inputType='password'
                isRequired
              />
            </Form.Item>

            <Form.Item>
              <SubmitButton />
            </Form.Item>
          </Form>
        </Spin>
      </LoginContainerStyled>
    </LayoutAntStyled>
  )
}

export default ForgotPassword
