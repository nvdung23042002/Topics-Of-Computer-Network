import { LayoutAntStyled } from '@/app/layout-sponsor/styled'
import { ButtonStyled, LoginContainerStyled } from './styled'
import Logo from '@/components/logo'
import Typography from '@/components/common/typography'
import { useTranslation } from 'next-i18next'
import { Form, Spin } from 'antd'
import Input from '@/components/common/form/Input'
import MailIcon from '@/components/icons/MailIcon'
import NavLink from '@/components/common/nav-link'
import { AppRoutes } from '@/constants/routes'
import { useEffect, useState } from 'react'
import { LoginType } from '@/services/dto/sponsor'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useRouter } from 'next/navigation'
import { loginSponsorThunk, getSponsorProfileThunk } from '@/redux/auth-sponsor/thunk'
import { isNil } from 'lodash'

const CustomInput = ({ ...props }) => {
  const { t } = useTranslation('sponsor', { useSuspense: false })
  const { status } = Form.Item.useStatus()
  return (
    <>
      <Input {...props} />
      {(status === 'success' || !status) && (
        <Typography.Text className='text-left login-attention text-nowrap'>{t('EMAIL_ATTENTION')}</Typography.Text>
      )}
    </>
  )
}

const SubmitButton = () => {
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const form = Form.useFormInstance()
  const { t } = useTranslation('sponsor', { useSuspense: false })

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
      {t('LOGIN')}
    </ButtonStyled>
  )
}

const Login = () => {
  const { t } = useTranslation('sponsor', { useSuspense: false })
  const loading = useAppSelector((state) => state.authSponsor?.loading)
  const zone = useAppSelector((state) => state.app?.zone)
  const isAuthenticated = useAppSelector((state) => state.authSponsor?.isAuthenticated)
  const isExistsHomepage = useAppSelector((state) => state.authSponsor?.sponsorProfile?.isExistsHomepage)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const navigate = useRouter()

  const onLogin = async (value: LoginType) => {
    const { meta } = await dispatch(loginSponsorThunk(value))
    if (meta.requestStatus === 'fulfilled') {
      const { meta: profileMeta, payload: profilePayload }: any = await dispatch(getSponsorProfileThunk())

      if (profileMeta.requestStatus === 'fulfilled') {
        navigate.replace(`${AppRoutes.sponsorTemplate}${profilePayload?.isExistsHomepage ? '' : '?step=2'}`)
      }
    }
  }

  useEffect(() => {
    /** Not support global version */
    if (zone === 'global') {
      navigate.replace(AppRoutes[404])
      return
    }
    if (isAuthenticated) {
      navigate.replace(`${AppRoutes.sponsorTemplate}${isExistsHomepage ? '' : '?step=2'}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isExistsHomepage, zone])
  return (
    <LayoutAntStyled>
      {isNil(isAuthenticated) && (
        <LoginContainerStyled>
          <Spin spinning={loading}>
            <Logo />
            <Typography.Title>{t('SPONSOR_LOGIN_TITLE')}</Typography.Title>

            <Form form={form} onFinish={onLogin}>
              <Form.Item
                rootClassName='text-left p-relative'
                style={{ marginBottom: 40 }}
                name='email'
                rules={[
                  { required: true, message: t('REQUIRED_EMAIL') ?? '' },
                  { type: 'email', message: t('INCORRECT_EMAIL') ?? '' }
                ]}
                normalize={(value) => value.trim()}
              >
                <CustomInput label={t('EMAIL')} suffix={<MailIcon />} isRequired />
              </Form.Item>
              <Form.Item
                rootClassName='text-left mb-4'
                name='password'
                rules={[
                  { required: true, message: t('PASSWORD_MINIMUM') ?? '' },
                  { min: 8, message: t('PASSWORD_MINIMUM') ?? '' }
                ]}
              >
                <Input label={t('PASSWORD')} placeholder={t('PASSWORD') ?? ''} inputType='password' isRequired />
              </Form.Item>
              <div className='remember-me-container'>
                <NavLink className='link-to-forgot' href={AppRoutes.sponsorForgotPassword}>
                  {t('FORGOT_PASSWORD')}
                </NavLink>
              </div>

              <Form.Item>
                <SubmitButton />
              </Form.Item>
            </Form>

            <NavLink className='link-to-register' href={AppRoutes.sponsorRegister}>
              {t('GO_TO_REGISTER')}
            </NavLink>
          </Spin>
        </LoginContainerStyled>
      )}
    </LayoutAntStyled>
  )
}

export default Login
