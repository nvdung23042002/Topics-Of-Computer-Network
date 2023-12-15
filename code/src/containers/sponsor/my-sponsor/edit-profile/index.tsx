import { Col, Form, Row, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  ButtonChangePassword,
  ButtonStyled,
  CardAvatar,
  ContainerEditProfile,
  GlobalSetting,
  Header,
  Title
} from './styled'
import Input from '@/components/common/form/Input'
import { REGEX_EMAIL, REGEX_PHONENUMBER, REGEX_POSTCODE, REGEX_URL } from '@/constants/regex'
import { ThemeProvider } from 'styled-components'
import Layout from '@/app/layout-sponsor'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import SponsorService from '@/services/Sponsor.service'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import useModal from '@/hooks/useModal'
import { getSponsorProfileThunk } from '@/redux/auth-sponsor/thunk'
import UploadImage from '@/containers/sponsor/my-sponsor/edit-profile/components/upload-image'
import Phone from '@/components/common/form/Phone'
import PostCode from '@/components/common/form/PostCode'
import { AppRoutes } from '@/constants/routes'
import SelectCountries from '@/components/common/form/SelectCountries'
import { useWindowSize } from '@/hooks/useWindowResize'
// type EditProps = {}
const SubmitButton = ({ cancelShowEdit, loading }: { cancelShowEdit: () => void; loading: boolean }) => {
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
    <>
      <ButtonStyled htmlType='button' shape={'round'} onClick={cancelShowEdit} loading={loading}>
        {t('CANCEL')}
      </ButtonStyled>
      <ButtonStyled htmlType='submit' type='primary' shape={'round'} disabled={!canSubmit} loading={loading}>
        {''}
        {t('SAVE')}
      </ButtonStyled>
    </>
  )
}

const EditProfile = () => {
  const { t } = useTranslation('sponsor', { useSuspense: false })
  const sponsorProfile = useAppSelector((state) => state.authSponsor.sponsorProfile)
  const [form] = Form.useForm()
  const navigate = useRouter()
  const { closeModal, openModal } = useModal()
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  const handelSubmitData = async (data: any) => {
    setLoading(true)
    try {
      const dataSubmit = { ...sponsorProfile, ...data }
      if (data.logoSponsor instanceof File) {
        const urls = await SponsorService.upload([data.logoSponsor], 'SPONSOR')
        dataSubmit.logoSponsor = urls[0]
      }
      await SponsorService.updateProfile({ ...dataSubmit })
      openModal({
        type: 'notification',
        title: '成功！',
        subContent: (
          <div
            dangerouslySetInnerHTML={
              {
                __html: t('UPDATE_SPONSOR_PROFILE_SUCCESS', {
                  ns: 'sponsor'
                })
              } as any
            }
          />
        ),
        onOk: () => {
          closeModal()
          dispatch(getSponsorProfileThunk())
          navigate.push(AppRoutes.sponsorProfile)
        }
      })
    } catch (error) {
      showMessage({ error: t(getError(error)) })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    form.setFieldsValue({
      ...sponsorProfile,
      phonePrefix: sponsorProfile?.phonePrefix ?? 'JP(+81)',
      contactPhonePrefix: sponsorProfile?.contactPhonePrefix ?? 'JP(+81)'
    })
    const haveValueFields = Object.keys(form.getFieldsValue()).filter((field) => !!form.getFieldValue(field))
    form.validateFields(haveValueFields)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sponsorProfile])
  return (
    <Layout mustAuth>
      <GlobalSetting />
      <ContainerEditProfile maxWidth={1000}>
        <Spin spinning={loading}>
          <Form form={form} onFinish={handelSubmitData} className='form-container'>
            <div className='left'>
              {isMaxWidth1199 && (
                <Header>
                  <Title>{t('SPONSOR_EDIT_PROFILE_TITLE')}</Title>
                </Header>
              )}
              <Form.Item className='upload-logo-sponsor' name={'logoSponsor'}>
                <CardAvatar>
                  <div className='container'>
                    <UploadImage
                      image={sponsorProfile?.logoSponsor}
                      setValue={(value) => {
                        form.setFieldValue('logoSponsor', value)
                      }}
                    />
                  </div>
                </CardAvatar>
              </Form.Item>
            </div>
            <div className='right'>
              {!isMaxWidth1199 && (
                <Header>
                  <Title>{t('SPONSOR_EDIT_PROFILE_TITLE')}</Title>
                </Header>
              )}

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
                <Input label={t('EMAIL')} disabled />
              </Form.Item>
              <Row gutter={[8, 0]}>
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
                  {/* <Form.Item
                    rootClassName='text-left mb-5'
                    name='phoneSuffix'
                    rules={[{ required: true, message: t('FIELD_REQUIRED') ?? '' }]}
                  >
                    <Phone label={t('TELEPHONE')} isRequired prefixName='phonePrefix' />
                  </Form.Item> */}
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
                    <Input label={t('ADDRESS')} isRequired />
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
                      },
                      {
                        pattern: REGEX_URL,
                        message: t('INCORRECT_URL') ?? ''
                      }
                    ]}
                  >
                    <Input label={t('HOMEPAGE_URL')} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item rootClassName='mb-0 mt-5 text-right'>
                <div className='group-btn j-content-between d-flex'>
                  <ThemeProvider theme={{ token: { colorPrimary: '#DE1D43', colorBorder: '#DE1D43' } }}>
                    <ButtonChangePassword
                      shape={'round'}
                      onClick={() => {
                        navigate.push('/sponsor/change-password')
                      }}
                      className='btn-set-new-password'
                    >
                      {t('SET_NEW_PASSWORD')}
                    </ButtonChangePassword>
                  </ThemeProvider>
                  <div className='submit-btn'>
                    <SubmitButton
                      cancelShowEdit={() => {
                        navigate.back()
                      }}
                      loading={loading}
                    />
                  </div>
                </div>
              </Form.Item>
            </div>
          </Form>
        </Spin>
      </ContainerEditProfile>
    </Layout>
  )
}

export default EditProfile
