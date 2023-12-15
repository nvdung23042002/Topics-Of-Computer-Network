import Container from '@/components/container'
import { ButtonStyled, ContainerStyled, InquiryStyled } from './styled'
import Typography from '@/components/common/typography'
import HightLineShort from '@/assets/svg/hight-line-short.svg'
import { Form } from 'antd'
import Input from '@/components/common/form/Input'
import TextArea from '@/components/common/form/TextArea'
import { Trans, useTranslation } from 'next-i18next'
import Anchor from '@/components/common/anchor'
import { AppRoutes } from '@/constants/routes'
import { REGEX_EMAIL } from '@/constants/regex'
import { memo, useCallback, useEffect, useState } from 'react'
import NSBService from '@/services/NSB.service'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'

const Inquiry: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation('home', { useSuspense: false })

  const [form] = Form.useForm()

  const onSubmit = useCallback(
    async (value: any) => {
      try {
        setLoading(true)
        const data: any = await NSBService.inquiry(value)

        if (data.code === 200) {
          form.resetFields()
          showMessage({ success: t('CONTACT_SUBMITTED_SUCCESSFULLY') })
        }
      } catch (error) {
        const err = getError(error)

        showMessage({ error: t(err.code, { ns: 'error-message' }) })
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  useEffect(() => {
    const fieldsError: string[] = form
      .getFieldsError()
      ?.filter(({ errors }) => errors?.length)
      ?.map((item) => item.name[0] as string)

    if (fieldsError?.length) form.validateFields(fieldsError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  return (
    <Container fullWidth>
      <InquiryStyled>
        <ContainerStyled maxWidth={1200}>
          <Typography.Title className='title' level={1}>
            {t('INQUIRY')}
            <br />
            <img className='hight-light' src={HightLineShort.src} alt='hight-light-short' />
          </Typography.Title>
          <Anchor id='contact' route={AppRoutes.contact} />

          <div className='form-inquiry'>
            <Form form={form} onFinish={onSubmit}>
              <Typography.Paragraph className='subtitle'>
                <Trans
                  t={t}
                  components={{
                    br: <br />,
                    b: <strong></strong>
                  }}
                >
                  CONTACT_SUB
                </Trans>
              </Typography.Paragraph>
              <Form.Item
                name='titleEmail'
                rules={[
                  {
                    required: true,
                    message: t('REQUIRED', { ns: 'validate' }) ?? ''
                  }
                ]}
              >
                <Input placeholder={t('NAME') ?? ''} maxLength={60} />
              </Form.Item>
              <Form.Item
                name='fromEmail'
                rules={[
                  {
                    required: true,
                    message: t('REQUIRED', { ns: 'validate' }) ?? ''
                  },
                  {
                    pattern: REGEX_EMAIL,
                    message: t('EMAIL_INVALID', { ns: 'validate' }) ?? ''
                  }
                ]}
              >
                <Input placeholder={t('MAIL') ?? ''} maxLength={320} />
              </Form.Item>
              <Form.Item
                name='contentEmail'
                rules={[
                  {
                    required: true,
                    message: t('REQUIRED', { ns: 'validate' }) ?? ''
                  }
                ]}
              >
                <TextArea placeholder={t('MESSAGE') ?? ''} minRows={5} />
              </Form.Item>
              <Form.Item>
                <ButtonStyled shape='round' type='primary' htmlType='submit' loading={loading}>
                  {t('SUBMIT')}
                </ButtonStyled>
              </Form.Item>
            </Form>

            <div className='remind'>
              <Typography.Title className='title' level={3}>
                {t('HELP')}
              </Typography.Title>
              <Typography.Text className='description'>
                {t('CONTACT_HELP', { phoneNumber: '+81-3435-6039', email: 'info@ebet.com' })}
              </Typography.Text>
            </div>
          </div>
        </ContainerStyled>
      </InquiryStyled>
    </Container>
  )
}

export default memo(Inquiry)
