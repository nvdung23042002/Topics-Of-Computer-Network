/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Phone from '@/components/common/form/Phone'
import TrashIcon from '@/components/icons/TrashIcon'
import UploadIconSposor from '@/components/icons/UploadIconSposor'
import SponsorHorizontal from '@/components/modal/sponsor-modal/sponsor-horizontal'
import SponsorVertical from '@/components/modal/sponsor-modal/sponsor-vertical'
import SiteLoading from '@/components/site-loading'
import { Text700Styled } from '@/components/styled'
import { REGEX_EMAIL, REGEX_URL } from '@/constants/regex'
import NSBService from '@/services/Sponsor.service'
import getError from '@/utils/getError'
import showMessage from '@/utils/showMessage'
import { Form, Input, Spin, Tooltip } from 'antd'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  AntInputStyled,
  AppQRStyled,
  CancelBtnStyled,
  GroupBtnStyled,
  ItemGroupStyled,
  LogoAndNameStyled,
  LogoCompanyUploadStyled,
  OtherContentStyled,
  PhoneGroupStyled,
  PreviewBtnStyled,
  SaveBtnGroupStyled,
  SavePrivateBtnStyled,
  SavePublicBtnStyled,
  SponsorBannerStyled,
  SponsorUploadStyled,
  ThirdStepContentStyled,
  ThirdStepControlStyled,
  ThirdStepStyled
} from './styled'

import '@/styles/globals.scss'

import TooltipIcon from '@/components/icons/TooltipIcon'
import SelectCountries from '@/components/common/form/SelectCountries'
import { useWindowSize } from '@/hooks/useWindowResize'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import { AppRoutes } from '@/constants/routes'

const { TextArea } = Input

const STATUS = {
  PUBLIC: 'PUBLIC',
  UN_PUBLIC: 'UN_PUBLIC'
}

const ThirdStep: React.FC = () => {
  const { t } = useTranslation(['common', 'sponsor', 'validate'])
  const initialValues = {
    title: '',
    image: '',
    icon: '',
    logoName: '',
    phonePrefixHomePage: 'JP(+81)',
    phoneSuffixHomePage: '',
    email: '',
    homePageUrl: '',
    appQrIos: '',
    appQrAndroid: '',
    content: ''
  }
  const router = useRouter()
  const ref = useRef<any>(null)
  const { chooseTemplate, typeScreen, templateId } = router.query || {}
  const [form] = Form.useForm()
  const [bannerUrl, setBannerUrl] = useState<string>('')
  const [avataUrl, setAvataUrl] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<any>(initialValues)
  const [loading, setLoading] = useState<boolean>(false)
  const [submittable, setSubmittable] = useState(false)
  const values = Form.useWatch([], form)
  const isChooseTemplate1 = Number(chooseTemplate) === 1

  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  const getDetailTemplate = useCallback(async () => {
    try {
      const response = await NSBService.GetDetailTemplate({
        id: templateId
      })

      const {
        content,
        email,
        icon,
        image,
        logoName,
        phonePrefixHomePage,
        phoneSuffixHomePage,
        title,
        appQrAndroid,
        appQrIos,
        homepageUrl
      } = response.data || {}
      setBannerUrl(image)
      setAvataUrl(icon)

      const fieldValues = {
        title,
        logoName,
        phonePrefixHomePage,
        phoneSuffixHomePage,
        email,
        content,
        image,
        icon,
        appQrAndroid,
        appQrIos,
        homePageUrl: homepageUrl
      }

      form.setFieldsValue(fieldValues)
      setFormValues(fieldValues)
    } catch (error) {
      showMessage({ error: getError(error) })
    }
  }, [typeScreen, templateId])

  useLayoutEffect(() => {
    if (typeScreen && templateId) {
      getDetailTemplate()
    }
  }, [getDetailTemplate])

  const onOpenModal = () => {
    setVisible(true)
  }
  const onCloseModal = () => {
    setVisible(false)
  }

  const renderModal = (type: number) => {
    const MODAL = {
      1: <SponsorVertical onCancel={onCloseModal} contentModal={formValues} />,
      2: <SponsorHorizontal onCancel={onCloseModal} contentModal={formValues} />
    }

    return isMaxWidth1199 ? MODAL[2] : MODAL[type]
  }

  const onCheck = async () => {
    try {
      const values = await form.validateFields()
      setFormValues({
        ...values,
        image: bannerUrl,
        icon: avataUrl
      })
      onOpenModal()
    } catch (errorInfo) {
      console.log('Failed')
    }
  }

  const handleSaveTemplate = async (status: string) => {
    setLoading(true)
    try {
      const values = await form.validateFields()

      if (typeof values.image !== 'string') {
        await ref.current.handleUpload({
          fileData: values.image,
          fieldName: 'image'
        })
      }

      if (typeof values.icon !== 'string') {
        await ref.current.handleUpload({
          fileData: values.icon,
          fieldName: 'icon'
        })
      }

      const {
        email,
        content,
        logoName,
        phonePrefixHomePage,
        phoneSuffixHomePage,
        title,
        image,
        icon,
        appQrAndroid,
        appQrIos,
        homePageUrl
      } = form.getFieldsValue() || {}
      const id = typeScreen ? templateId : 0

      const dataBody = {
        appQrAndroid,
        appQrIos,
        content,
        email,
        homePageUrl,
        icon,
        id,
        image,
        logoName,
        phonePrefixHomePage: phonePrefixHomePage,
        phoneSuffixHomePage: phoneSuffixHomePage,
        status,
        template: chooseTemplate === '1' ? 'TEMPLATE_1' : 'TEMPLATE_2',
        title
      }
      const response = await NSBService.SaveTemplateHomepage(dataBody)

      if (response.code === 200) {
        setLoading(false)
        router.push({
          pathname: router.pathname,
          query: {
            id: 'template',
            step: 1
          }
        })
      }
    } catch (errorInfo) {
      setLoading(false)

      console.log('Failed')
    }
  }

  const handleRemoveBannerImg = () => {
    setBannerUrl('')
    form.setFieldsValue({
      image: ''
    })
    setFormValues((prevState: any) => ({
      ...prevState,
      image: ''
    }))
  }

  const handleRemoveAvataImg = () => {
    setAvataUrl('')
    form.setFieldsValue({
      icon: ''
    })
    setFormValues((prevState: any) => ({
      ...prevState,
      icon: ''
    }))
  }

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      }
    )
  }, [values])

  return (
    <ThirdStepStyled>
      <Spin spinning={loading} indicator={<SiteLoading />}>
        <ThirdStepControlStyled>
          {isMaxWidth1199 ? (
            <div
              className='breadcrumb-mobile'
              onClick={() =>
                router.push({
                  pathname: AppRoutes.sponsorTemplate,
                  query: {
                    step: 2,
                    chooseTemplate
                  }
                })
              }
            >
              <ArrowLeftIcon />
              <Text700Styled className='choose-template'>テンプレート選択</Text700Styled>
            </div>
          ) : (
            <Text700Styled className='edit-template'>
              {t('EDIT_CONTENT', {
                ns: 'sponsor'
              })}
            </Text700Styled>
          )}

          {!isMaxWidth1199 && (
            <PreviewBtnStyled onClick={onCheck}>
              {t('PREVIEW', {
                ns: 'sponsor'
              })}
            </PreviewBtnStyled>
          )}
        </ThirdStepControlStyled>
        <ThirdStepContentStyled>
          <Form form={form} initialValues={formValues} layout='vertical'>
            <Form.Item
              className='title'
              name='title'
              label={t('TITLE', {
                ns: 'sponsor'
              })}
              rules={[
                {
                  required: true,
                  message: t('FIELD_REQUIRED', {
                    fieldName: t('TITLE', {
                      ns: 'sponsor'
                    }),
                    ns: 'validate'
                  }) as any
                },
                {
                  max: 50,
                  message: t('MAX_LENGTH_INPUT', {
                    length: 50,
                    ns: 'validate'
                  }) as any
                }
              ]}
            >
              <AntInputStyled
                width={403}
                placeholder={
                  t('PLEASE_ENTER_TITLE', {
                    ns: 'sponsor'
                  }) as any
                }
              />
            </Form.Item>
            <ItemGroupStyled>
              <SponsorBannerStyled>
                <Form.Item
                  name='image'
                  label={
                    <div
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    >
                      {t('UPLOAD_BANNER', {
                        ns: 'sponsor'
                      })}
                    </div>
                  }
                  className='upload-banner'
                  rules={[
                    {
                      required: true,
                      message: t('FIELD_REQUIRED', {
                        fieldName: t('UPLOAD_BANNER', {
                          ns: 'sponsor'
                        }),
                        ns: 'validate'
                      }) as any
                    }
                  ]}
                >
                  <SponsorUploadStyled
                    name='image'
                    className='banner-uploader'
                    listType='picture-card'
                    setImageUrl={setBannerUrl}
                    form={form}
                    ref={ref}
                    isExitsImg={!!bannerUrl}
                    setFormValues={setFormValues}
                    maxWidth={isChooseTemplate1 ? 520 : 1220}
                    maxHeight={isChooseTemplate1 ? 1220 : 520}
                    accept='image/png,image/jpeg,image/jpg'
                    openFileDialogOnClick={true}
                  >
                    {bannerUrl && (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveBannerImg()
                        }}
                      >
                        <TrashIcon className='trash-icon' />
                      </div>
                    )}
                    {bannerUrl ? (
                      <img src={bannerUrl} alt='banner' style={{ width: '100%' }} />
                    ) : (
                      <div>
                        <UploadIconSposor />
                        <div className='sub-text'>
                          <span className='blue-text'>
                            クリックしてアップロードするか、PNG/JPG/JPGE <br /> 形式のファイルを
                            ドラッグ＆アンドドロップする。
                          </span>
                          <span className='grey-text'>
                            (テンプレート 1：おすすめ520 X 1220ピクセル) <br />
                            (テンプレート 2：おすすめ1220 X 520ピクセル)
                          </span>
                        </div>
                      </div>
                    )}
                  </SponsorUploadStyled>
                </Form.Item>
              </SponsorBannerStyled>
              <OtherContentStyled>
                <LogoAndNameStyled>
                  <Form.Item
                    name='icon'
                    label={
                      <div
                        className='upload-logo-label'
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                      >
                        <span className='label'>
                          {t('UPLOAD_LOGO', {
                            ns: 'sponsor'
                          })}
                          <span className='asterisk'>*</span>
                        </span>
                        <Tooltip
                          rootClassName='upload-logo-tooltip'
                          title={
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  'クリックしてアップロードするか、PNG/JPG/JPGE<br/> 形式のファイルをドラッグ＆アンドドロップする。<br/>(おすすめ800 X 800ピクセル)'
                              }}
                            />
                          }
                          trigger='hover'
                          placement='bottom'
                        >
                          <TooltipIcon />
                        </Tooltip>
                      </div>
                    }
                    className='upload-logo'
                    rules={[
                      {
                        required: true,
                        message: t('FIELD_REQUIRED', {
                          fieldName: t('UPLOAD_LOGO', {
                            ns: 'sponsor'
                          }),
                          ns: 'validate'
                        }) as any
                      }
                    ]}
                  >
                    <LogoCompanyUploadStyled
                      name='icon'
                      className='logo-uploader'
                      listType='picture-card'
                      setImageUrl={setAvataUrl}
                      form={form}
                      ref={ref}
                      isExitsImg={!!avataUrl}
                      setFormValues={setFormValues}
                      maxWidth={800}
                      maxHeight={800}
                      accept='image/png,image/jpeg,image/jpg'
                    >
                      {avataUrl && (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                        <div
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveAvataImg()
                          }}
                        >
                          <TrashIcon className='trash-icon' />
                        </div>
                      )}
                      {avataUrl ? (
                        <img src={avataUrl} alt='logo' style={{ width: '100%' }} />
                      ) : (
                        <div>
                          <UploadIconSposor />
                        </div>
                      )}
                    </LogoCompanyUploadStyled>
                  </Form.Item>
                  <Form.Item
                    name='logoName'
                    label={t('LOGO_NAME', {
                      ns: 'sponsor'
                    })}
                    rules={[
                      {
                        required: true,
                        message: t('FIELD_REQUIRED', {
                          fieldName: t('LOGO_NAME', {
                            ns: 'sponsor'
                          }),
                          ns: 'validate'
                        }) as any
                      },
                      {
                        max: 50,
                        message: t('MAX_LENGTH_INPUT', {
                          length: 50,
                          ns: 'validate'
                        }) as any
                      }
                    ]}
                    className='logo-name'
                  >
                    <AntInputStyled flex={1} />
                  </Form.Item>
                </LogoAndNameStyled>
                <PhoneGroupStyled>
                  <div className='d-flex' style={{ marginBottom: 16 }}>
                    <Form.Item name='phonePrefixHomePage' className='me-1 select-country'>
                      <SelectCountries
                        label={t('TELEPHONE', {
                          ns: 'sponsor'
                        })}
                        showSearch
                        isRequired
                      />
                    </Form.Item>
                    <Form.Item
                      className='phone'
                      name='phoneSuffixHomePage'
                      // label={t('TELEPHONE', {
                      //   ns: 'sponsor'
                      // })}
                      rules={[
                        {
                          required: true,
                          message: t('FIELD_REQUIRED', {
                            fieldName: t('TELEPHONE', {
                              ns: 'sponsor'
                            }),
                            ns: 'validate'
                          }) as any
                        }
                      ]}
                    >
                      <Phone label={<></>} />
                    </Form.Item>
                  </div>
                </PhoneGroupStyled>
                <Form.Item
                  className='email'
                  name='email'
                  label={t('EMAIL', {
                    ns: 'sponsor'
                  })}
                  rules={[
                    {
                      required: true,
                      message: t('FIELD_REQUIRED', {
                        fieldName: t('EMAIL', {
                          ns: 'sponsor'
                        }),
                        ns: 'validate'
                      }) as any
                    },
                    {
                      pattern: REGEX_EMAIL,
                      message: t('EMAIL_INVALID', {
                        ns: 'validate'
                      }) as any
                    }
                  ]}
                >
                  <AntInputStyled flex={1} />
                </Form.Item>
                <Form.Item
                  className='homepage-url'
                  name='homePageUrl'
                  label={t('HP_URL', {
                    ns: 'sponsor'
                  })}
                  rules={[
                    {
                      required: true,
                      message: t('FIELD_REQUIRED', {
                        fieldName: t('HP_URL', {
                          ns: 'sponsor'
                        }),
                        ns: 'validate'
                      }) as any
                    },
                    {
                      pattern: REGEX_URL,
                      message: t('URL_INVALID', {
                        ns: 'validate'
                      }) as any
                    },
                    {
                      max: 4000,
                      message: t('MAX_LENGTH_INPUT', {
                        length: 4000,
                        ns: 'validate'
                      }) as any
                    }
                  ]}
                >
                  <AntInputStyled flex={1} />
                </Form.Item>
                <AppQRStyled>
                  <Form.Item
                    className='ios'
                    name='appQrIos'
                    label={t('IOS', {
                      ns: 'sponsor'
                    })}
                    rules={[
                      {
                        pattern: REGEX_URL,
                        message: t('URL_INVALID', {
                          ns: 'validate'
                        }) as any
                      },
                      {
                        max: 1500,
                        message: t('MAX_LENGTH_INPUT', {
                          length: 1500,
                          ns: 'validate'
                        }) as any
                      }
                    ]}
                  >
                    <AntInputStyled flex={1} />
                  </Form.Item>
                  <Form.Item
                    className='android'
                    name='appQrAndroid'
                    label={t('ANDROID', {
                      ns: 'sponsor'
                    })}
                    rules={[
                      {
                        pattern: REGEX_URL,
                        message: t('URL_INVALID', {
                          ns: 'validate'
                        }) as any
                      },
                      {
                        max: 1500,
                        message: t('MAX_LENGTH_INPUT', {
                          length: 1500,
                          ns: 'validate'
                        }) as any
                      }
                    ]}
                  >
                    <AntInputStyled flex={1} />
                  </Form.Item>
                </AppQRStyled>
                <Form.Item
                  className='infomation'
                  name='content'
                  label={t('CONTENT', {
                    ns: 'sponsor'
                  })}
                  rules={[
                    {
                      required: true,
                      message: t('FIELD_REQUIRED', {
                        fieldName: t('CONTENT', {
                          ns: 'sponsor'
                        }),
                        ns: 'validate'
                      }) as any
                    },
                    {
                      max: 3000,
                      message: t('MAX_LENGTH_INPUT', {
                        length: 3000,
                        ns: 'validate'
                      }) as any
                    }
                  ]}
                >
                  <TextArea
                    placeholder={
                      t('PLEASE_ENTER_CONTENT', {
                        ns: 'sponsor'
                      }) as any
                    }
                  />
                </Form.Item>
              </OtherContentStyled>
            </ItemGroupStyled>
          </Form>
        </ThirdStepContentStyled>
        <GroupBtnStyled>
          {!isMaxWidth1199 ? (
            <>
              <CancelBtnStyled onClick={() => router.back()}>
                {t('CANCEL', {
                  ns: 'sponsor'
                })}
              </CancelBtnStyled>
              <SaveBtnGroupStyled>
                <SavePublicBtnStyled
                  onClick={() => handleSaveTemplate(STATUS.PUBLIC)}
                  disabled={!submittable || !avataUrl || !bannerUrl}
                >
                  {t('SAVE_PUBLIC', {
                    ns: 'sponsor'
                  })}
                </SavePublicBtnStyled>
                <SavePrivateBtnStyled
                  onClick={() => handleSaveTemplate(STATUS.UN_PUBLIC)}
                  disabled={!submittable || !avataUrl || !bannerUrl}
                >
                  {t('SAVE_PRIVATE', {
                    ns: 'sponsor'
                  })}
                </SavePrivateBtnStyled>
              </SaveBtnGroupStyled>
            </>
          ) : (
            <>
              <PreviewBtnStyled onClick={onCheck}>
                {t('PREVIEW', {
                  ns: 'sponsor'
                })}
              </PreviewBtnStyled>
              <SaveBtnGroupStyled>
                <SavePrivateBtnStyled
                  onClick={() => handleSaveTemplate(STATUS.UN_PUBLIC)}
                  disabled={!submittable || !avataUrl || !bannerUrl}
                >
                  {t('SAVE_PRIVATE', {
                    ns: 'sponsor'
                  })}
                </SavePrivateBtnStyled>
                <SavePublicBtnStyled
                  onClick={() => handleSaveTemplate(STATUS.PUBLIC)}
                  disabled={!submittable || !avataUrl || !bannerUrl}
                >
                  {t('SAVE_PUBLIC', {
                    ns: 'sponsor'
                  })}
                </SavePublicBtnStyled>
              </SaveBtnGroupStyled>
              <CancelBtnStyled onClick={() => router.back()}>
                {t('CANCEL', {
                  ns: 'sponsor'
                })}
              </CancelBtnStyled>
            </>
          )}
        </GroupBtnStyled>
        {visible && renderModal(Number(chooseTemplate))}
      </Spin>
    </ThirdStepStyled>
  )
}

export default ThirdStep
