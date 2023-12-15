import NSBService from '@/services/Sponsor.service'
import { FormInstance, UploadProps, message } from 'antd'
import React, { useImperativeHandle } from 'react'
import { UploadStyled } from './styled'
import { useTranslation } from 'next-i18next'
import Config from '@/config'

interface Props extends UploadProps {
  form: FormInstance
  maxWidth: number
  maxHeight: number
  isExitsImg?: boolean
  setImageUrl?: any
  setFormValues?: any
}

export const UploadComponent = React.forwardRef((props: Props, ref: any) => {
  const { t } = useTranslation('validate')
  const { children, setImageUrl, form, maxWidth, maxHeight, isExitsImg, name, setFormValues } = props
  const maxSize = Config.MAX_FILE_SIZE

  useImperativeHandle(
    ref,
    () => ({
      handleUpload: async ({ fileData, fieldName }: any) => {
        try {
          const { file } = fileData
          const response = await NSBService.upload([file?.originFileObj], 'SPONSOR')
          form.setFieldsValue({
            [fieldName]: response[0]
          })
        } catch (error) {
          console.log('error :>> ', error)
          throw error
        }
      }
    }),
    []
  )

  // const validateImageDimensions = (img: any) => {
  //   return new Promise((resolve, reject) => {
  //     img.onload = () => {
  //       const { width, height } = img
  //       if (width <= maxWidth && height <= maxHeight) {
  //         resolve(true)
  //       } else {
  //         reject(false)
  //       }
  //     }
  //   })
  // }

  const customUploadRequest = async (options: any) => {
    const { file } = options
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    const img = new Image()
    img.src = URL.createObjectURL(file)

    const isLimit = file.size / 1024 / 1024 <= maxSize

    if (!isJpgOrPng) {
      message.error(
        t('UPLOAD_IMAGE_TYPE_INVALID', {
          ns: 'validate'
        })
      )
      return
    }

    if (!isLimit) {
      message.error(
        t('UPLOAD_IMAGE_LIMIT_SIZE', {
          maxSize: `${maxSize}MB`,
          ns: 'validate'
        })
      )
      return
    }

    // try {
    //   await validateImageDimensions(img)
    // } catch (error) {
    //   message.error(
    //     t('UPLOAD_IMAGE_DIMENTSIONS_INVALID', {
    //       maxWidth,
    //       maxHeight
    //     })
    //   )
    //   return
    // }

    setImageUrl(img.src)
    setFormValues((prevState: any) => ({
      ...prevState,
      [name as any]: img.src
    }))
  }

  return (
    <UploadStyled
      showUploadList={false}
      customRequest={customUploadRequest}
      multiple={false}
      isExitsImg={isExitsImg}
      {...props}
    >
      {children}
    </UploadStyled>
  )
})
