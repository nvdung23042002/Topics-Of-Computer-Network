import { Col, Form, Row, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { ButtonStyled, CardAvatar, ContainerEditProfile, Header, Title } from './styled'
import Input from '@/components/common/form/Input'
import { REGEX_PHONENUMBER, REGEX_POSTCODE } from '@/constants/regex'
import Layout from '@/app/layout'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import useModal from '@/hooks/useModal'
import DatePicker from '@/components/common/form/DatePicker'
import UploadImage from './components/upload-image'
import Select from '@/components/common/form/Select'
import NSBService from '@/services/NSB.service'
import { AppRoutes } from '@/constants/routes'
import dayjs from '@/utils/dayjs'
import { getUserProfileThunk } from '@/redux/auth/thunk'
import { RangePickerProps } from 'antd/es/date-picker'
import { dateFormat } from '@/constants/format'
import MobileView from '../../components/view/mobile'
import Phone from '@/components/common/form/Phone'
import PostCode from '@/components/common/form/PostCode'
import SelectCountries from '@/components/common/form/SelectCountries'

// type EditProps = {}
const SubmitButton = ({ cancelShowEdit, loading }: { cancelShowEdit: () => void; loading: boolean }) => {
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const form = Form.useFormInstance()
  const { t } = useTranslation('user-profile-edit', { useSuspense: false })

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
        {''}
      </ButtonStyled>
      <ButtonStyled htmlType='submit' type='primary' shape={'round'} disabled={!canSubmit} loading={loading}>
        {t('SAVE')}
        {''}
      </ButtonStyled>
    </>
  )
}

const EditProfile = () => {
  const { t } = useTranslation('user-profile-edit', { useSuspense: false })
  const [form] = Form.useForm()
  const navigate = useRouter()
  const { closeModal, openModal } = useModal()
  const [loading, setLoading] = useState<boolean>(false)
  const [listPrefectures, setListPrefectures] = useState([])
  const [profile, setProfile] = useState<any>(null)
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate.replace(AppRoutes.home)
    }
  }, [isAuthenticated])
  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const profile = await NSBService.getUserProfile()
      setProfile({ ...profile })
    } catch (error) {
      setProfile(null)
      // console.log('🚀 ~ file: index.tsx:47 ~ ; ~ error:', error)
    }
  }
  useLayoutEffect(() => {
    ;(async () => {
      try {
        const prefectures = await NSBService.getPrefectures()
        if (prefectures) {
          setListPrefectures(
            prefectures.map((item) => {
              return {
                value: item,
                label: item
              }
            })
          )
        }
      } catch (error) {
        console.log('🚀 ~ file: index.tsx:47 ~ ; ~ error:', error)
      }
    })()
  }, [])
  useEffect(() => {
    if (profile) {
      form.setFieldsValue({ ...profile })
    }
  }, [profile])
  useEffect(() => {
    const touchedFields = Object.keys(form.getFieldsValue()).filter((field) => form.isFieldTouched(field))
    form.validateFields(touchedFields)
  }, [navigate.locale])
  const handelSubmitData = async (data: any) => {
    setLoading(true)
    try {
      const dataSubmit = { ...data }
      if (data.image instanceof File) {
        const urls = await NSBService.upload([data.image], 'USER_PROFILE')
        dataSubmit.image = urls[0]
      } else {
        dataSubmit.image = form.getFieldValue('image')
      }
      await NSBService.editUserProfile(dataSubmit)
      openModal({
        type: 'notification',
        title: t('SUCCESS'),
        okText: t('OK', { ns: 'common' }) as string,
        subContent: (
          <div
            dangerouslySetInnerHTML={
              {
                __html: t('UPDATE_USER_PROFILE_SUCCESS', {
                  ns: 'user-profile-edit'
                })
              } as any
            }
          />
        ),
        onOk: () => {
          closeModal()
          // fetchUserProfile()
          dispatch(getUserProfileThunk({}))
          navigate.push(AppRoutes.myPage)
        }
      })
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:134 ~ handelSubmitData ~ error:', error)
      showMessage({ error: getError(error) })
    } finally {
      setLoading(false)
    }
  }
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current >= dayjs().endOf('day')
  }

  return (
    <Layout isMyPage>
      <ContainerEditProfile maxWidth={1000}>
        <Spin spinning={loading}>
          <Form form={form} onFinish={handelSubmitData} className='form-container'>
            <MobileView>
              <Header className='mobile'>
                <Title>{t('USER_EDIT_PROFILE_TITLE')}</Title>
              </Header>
            </MobileView>
            <div className='left'>
              <Form.Item name={'image'}>
                <CardAvatar>
                  <div className='container'>
                    <UploadImage
                      image={profile?.image as string}
                      setValue={(value) => {
                        form.setFieldValue('image', value)
                      }}
                    />
                  </div>
                </CardAvatar>
              </Form.Item>
            </div>
            <div className='right'>
              <Header>
                <Title>{t('USER_EDIT_PROFILE_TITLE')}</Title>
              </Header>
              <Form.Item rootClassName='text-left p-relative mb-5' name='email'>
                <Input label={t('EMAIL')} disabled />
              </Form.Item>
              <Form.Item
                rootClassName='text-left p-relative mb-5'
                name='userName'
                rules={[
                  {
                    required: true,
                    message:
                      t('FIELD_REQUIRED', {
                        fieldName: t('USER_NAME'),
                        dynamicValue: true
                      }) ?? ''
                  },
                  {
                    max: 50,
                    message:
                      t('MAX_LENGTH_INPUT', {
                        fieldName: t('USER_NAME'),
                        length: '50',
                        dynamicValue: true
                      }) ?? ''
                  }
                ]}
              >
                <Input label={t('USER_NAME')} isRequired />
              </Form.Item>
              <Row gutter={[8, 0]}>
                <Col span={24} md={12}>
                  <Form.Item
                    rootClassName='text-left mb-5'
                    name='lastName'
                    rules={[
                      {
                        max: 10,
                        message:
                          t('MAX_LENGTH_INPUT', {
                            fieldName: t('LAST_NAME'),
                            length: '10',
                            dynamicValue: true
                          }) ?? ''
                      }
                    ]}
                  >
                    <Input label={t('LAST_NAME')} />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <Form.Item
                    rootClassName='text-left mb-5'
                    name='firstName'
                    rules={[
                      {
                        max: 10,
                        message:
                          t('MAX_LENGTH_INPUT', {
                            fieldName: t('FIRST_NAME'),
                            length: '10',
                            dynamicValue: true
                          }) ?? ''
                      }
                    ]}
                  >
                    <Input label={t('FIRST_NAME')} />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <Form.Item rootClassName='text-left mb-5' name='dateOfBirth'>
                    <DatePicker
                      label={t('DATE_OF_BIRTH')}
                      dateFormat={dateFormat}
                      datePickerFormat={dateFormat}
                      disabledDate={disabledDate}
                      placeholder={dateFormat}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <div className=''></div>
                  <div className='d-flex'>
                    <Form.Item name='phonePrefix' className='me-1 select-country'>
                      <SelectCountries label={t('PHONE_NUMBER')} showSearch disabled />
                    </Form.Item>
                    <Form.Item
                      name='phoneSuffix'
                      className='flex-grow-1'
                      rules={[{ pattern: REGEX_PHONENUMBER, message: t('INCORRECT_PHONE') ?? '' }]}
                    >
                      <Phone label={<></>} disabled />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Header>
                <Title>{t('ADDRESS')}</Title>
              </Header>
              <Row gutter={[8, 0]}>
                <Col span={24} md={12}>
                  <Form.Item
                    rootClassName='text-left mb-5'
                    name='zipCode'
                    rules={[
                      {
                        pattern: REGEX_POSTCODE,
                        message: t('FIELD_WRONG_FORMAT', { ns: 'error-message' }) ?? ''
                      }
                    ]}
                  >
                    <PostCode label={t('ZIP_CODE')} />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <Form.Item rootClassName='text-left mb-5' name='prefectures'>
                    <Select label={t('PREFECTURES')} options={listPrefectures} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                rootClassName='text-left p-relative mb-5'
                name='district'
                rules={[
                  {
                    max: 50,
                    message:
                      t('MAX_LENGTH_INPUT', {
                        fieldName: t('CITY'),
                        length: '50',
                        dynamicValue: true
                      }) ?? ''
                  }
                ]}
              >
                <Input label={t('CITY')} />
              </Form.Item>
              <Form.Item
                rootClassName='text-left p-relative mb-5'
                name='address'
                rules={[
                  {
                    max: 50,
                    message:
                      t('MAX_LENGTH_INPUT', {
                        fieldName: t('ADDRESS'),
                        length: '50',
                        dynamicValue: true
                      }) ?? ''
                  }
                ]}
              >
                <Input label={t('ADDRESS')} />
              </Form.Item>
              <Form.Item
                rootClassName='text-left p-relative mb-5'
                name='buildingNumber'
                rules={[
                  {
                    max: 50,
                    message:
                      t('MAX_LENGTH_INPUT', {
                        fieldName: t('BUILDING_NAME'),
                        length: '50',
                        dynamicValue: true
                      }) ?? ''
                  }
                ]}
              >
                <Input label={t('BUILDING_NAME')} />
              </Form.Item>
              <Form.Item rootClassName='mb-0 mt-5 text-right'>
                <div className='j-content-end d-flex'>
                  <div>
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
