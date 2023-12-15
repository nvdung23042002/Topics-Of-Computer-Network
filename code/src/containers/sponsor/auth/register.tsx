import { LayoutAntStyled } from '@/app/layout-sponsor/styled'
import { ButtonStyled, RegisterContainerStyled } from './styled'
import Logo from '@/components/logo'
import Typography from '@/components/common/typography'
import { useTranslation } from 'next-i18next'
import { Col, Form, Row, Spin } from 'antd'
import Input from '@/components/common/form/Input'
import MailIcon from '@/components/icons/MailIcon'
import { useEffect, useState } from 'react'
import { REGEX_EMAIL, REGEX_PHONENUMBER, REGEX_POSTCODE } from '@/constants/regex'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useRouter } from 'next/navigation'
import { registerSponsorThunk } from '@/redux/auth-sponsor/thunk'
import { AppRoutes } from '@/constants/routes'
import useModal from '@/hooks/useModal'
import Phone from '@/components/common/form/Phone'
import PostCode from '@/components/common/form/PostCode'
import SelectCountries from '@/components/common/form/SelectCountries'

const SubmitButton = () => {
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const form = Form.useFormInstance()
  const navigate = useRouter()
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
    <>
      <ButtonStyled htmlType='button' shape={'round'} onClick={() => navigate.replace(AppRoutes.sponsorLogin)}>
        {t('CANCEL')}
      </ButtonStyled>
      <ButtonStyled htmlType='submit' type='primary' shape={'round'} disabled={!canSubmit}>
        {t('SIGN_UP')}
      </ButtonStyled>
    </>
  )
}

const Register = () => {
  const { t } = useTranslation('sponsor', { useSuspense: false })
  const zone = useAppSelector((state) => state.app?.zone)
  const loading = useAppSelector((state) => state.authSponsor?.loading)
  const { openModal, closeModal } = useModal()
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const navigate = useRouter()

  const onRegister = async (value: any) => {
    const { meta } = await dispatch(registerSponsorThunk(value))

    if (meta.requestStatus === 'fulfilled') {
      openModal({
        type: 'notification',
        subContent: t('REGISTER_SUCCESSFULLY'),
        onOk: () => {
          closeModal()
          navigate.replace(AppRoutes.sponsorLogin)
        }
      })
    }
  }
  const initData = () => {
    form.setFieldsValue({
      phonePrefix: 'JP(+81)',
      contactPhonePrefix: 'JP(+81)'
    })
  }
  useEffect(() => {
    /** Not support global version */
    if (zone === 'global') {
      navigate.replace(AppRoutes[404])
      return
    }
    initData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zone])
  return (
    <LayoutAntStyled>
      <RegisterContainerStyled>
        <Spin spinning={loading}>
          <Logo />
          <Typography.Title>{t('SPONSOR_REGISTER_TITLE')}</Typography.Title>

          <Form form={form} onFinish={onRegister}>
            <Form.Item
              rootClassName='text-left p-relative mb-5'
              name='email'
              rules={[
                { required: true, message: t('REQUIRED_EMAIL') ?? '' },
                { pattern: REGEX_EMAIL, message: t('INCORRECT_EMAIL') ?? '' },
                {
                  max: 200,
                  message: t('FIELD_MAX_X_CHARACTOR', { x: 200 }) ?? ''
                }
              ]}
              normalize={(value: string) => value.trim()}
            >
              <Input label={t('EMAIL')} suffix={<MailIcon />} isRequired />
            </Form.Item>
            <Row gutter={[8, 0]}>
              <Col span={24} md={12}>
                <Form.Item
                  rootClassName='text-left mb-5'
                  name='password'
                  rules={[
                    { required: true, message: t('PASSWORD_MINIMUM') ?? '' },
                    { min: 8, message: t('PASSWORD_MINIMUM') ?? '' }
                  ]}
                >
                  <Input label={t('PASSWORD')} inputType='password' isRequired />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  rootClassName='text-left mb-5'
                  dependencies={['password']}
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
                >
                  <Input label={t('PASSWORD_CONFIRMATION')} inputType='password' isRequired />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  rootClassName='text-left mb-5'
                  name='companyName'
                  rules={[
                    { required: true, message: t('FIELD_REQUIRED') ?? '' },
                    {
                      max: 200,
                      message: t('FIELD_MAX_X_CHARACTOR', { x: 200 }) ?? ''
                    }
                  ]}
                >
                  <Input label={t('COMPANY_NAME')} isRequired />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <div className='d-flex'>
                  <Form.Item name='phonePrefix' className='me-1 select-country'>
                    <SelectCountries label={t('TELEPHONE')} showSearch isRequired />
                  </Form.Item>
                  <Form.Item
                    name='phoneSuffix'
                    className='flex-grow-1'
                    rules={[
                      { required: true, message: t('FIELD_REQUIRED') ?? '' },
                      { pattern: REGEX_PHONENUMBER, message: t('INCORRECT_PHONE') ?? '' }
                    ]}
                  >
                    <Phone label={<></>} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  rootClassName='text-left mb-5'
                  name='postCode'
                  rules={[
                    { required: true, message: t('FIELD_REQUIRED') ?? '' },
                    {
                      pattern: REGEX_POSTCODE,
                      message: t('FIELD_WRONG_FORMAT') ?? ''
                    }
                  ]}
                  normalize={(value: string) => value.trim()}
                >
                  <PostCode label={t('POST_CODE')} isRequired />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  rootClassName='text-left mb-5'
                  name='addressCompany'
                  rules={[
                    { required: true, message: t('FIELD_REQUIRED') ?? '' },
                    {
                      max: 200,
                      message: t('FIELD_MAX_X_CHARACTOR', { x: 200 }) ?? ''
                    }
                  ]}
                >
                  <Input label={t('ADDRESS_DETAIL')} isRequired />
                </Form.Item>
              </Col>
              {/* <Col span={24} md={12}>
                <Form.Item rootClassName='text-left mb-5' name='company-logo'>
                  <File label={t('COMPANY_LOGO')} isRequired />
                </Form.Item>
              </Col> */}
              <Col span={24} md={12}>
                <Form.Item
                  rootClassName='text-left mb-5'
                  name='contactName'
                  rules={[
                    { required: true, message: t('FIELD_REQUIRED') ?? '' },
                    {
                      max: 200,
                      message: t('FIELD_MAX_X_CHARACTOR', { x: 200 }) ?? ''
                    }
                  ]}
                >
                  <Input label={t('REPRESENTATIVE_NAME')} isRequired />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  rootClassName='text-left mb-5'
                  name='contactEmail'
                  rules={[
                    { required: true, message: t('FIELD_REQUIRED') ?? '' },
                    { pattern: REGEX_EMAIL, message: t('REPRESENTATIVE_INCORRECT_EMAIL') ?? '' },
                    {
                      max: 200,
                      message: t('FIELD_MAX_X_CHARACTOR', { x: 200 }) ?? ''
                    }
                  ]}
                  normalize={(value: string) => value.trim()}
                >
                  <Input label={t('REPRESENTATIVE_EMAIL')} isRequired />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <div className='d-flex'>
                  <Form.Item name='contactPhonePrefix' className='me-1 select-country'>
                    <SelectCountries label={t('REPRESENTATIVE_PHONE_NUMBER')} showSearch isRequired />
                  </Form.Item>
                  <Form.Item
                    name='contactPhoneSuffix'
                    className='flex-grow-1'
                    rules={[
                      { required: true, message: t('FIELD_REQUIRED') ?? '' },
                      { pattern: REGEX_PHONENUMBER, message: t('INCORRECT_PHONE') ?? '' }
                    ]}
                  >
                    <Phone label={<></>} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  rootClassName='text-left mb-5'
                  name='homepageUrl'
                  rules={[
                    {
                      max: 200,
                      message: t('FIELD_MAX_X_CHARACTOR', { x: 200 }) ?? ''
                    }
                  ]}
                >
                  <Input label={t('HOMEPAGE_URL')} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item rootClassName='mb-0 mt-5 text-right'>
              <SubmitButton />
            </Form.Item>
          </Form>
        </Spin>
      </RegisterContainerStyled>
    </LayoutAntStyled>
  )
}

export default Register
