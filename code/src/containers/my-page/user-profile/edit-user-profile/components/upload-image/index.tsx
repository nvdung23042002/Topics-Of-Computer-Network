import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { Avatar } from 'antd'

import { DeleteButtonIcon, UploadFileStyled } from './styled'
import TrashIcon from '@/components/icons/TrashIcon'
import AvatarDefault from '@/assets/images/avatar_default.png'
// import AvatarContainer from '@/assets/svg/avatar-container.svg'
import UploadOutlinedIcon from '@/components/icons/UploadOutlinedIcon'
import showMessage from '@/utils/showMessage'
import { useTranslation } from 'next-i18next'
interface UploadImageProps {
  setValue: (value: any) => void
  image?: string
}

const UploadImage = forwardRef(({ image, setValue }: UploadImageProps, ref) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const inputUploadRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation('user-profile-edit')
  const handleBase64Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const allowedExtensions = ['jpeg', 'png', 'jpg']
        const fileExtension = file.name.split('.').pop()?.toLowerCase()

        if (fileExtension && allowedExtensions.includes(fileExtension)) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            setImageUrl(reader.result as string)
            setValue(file as any)
          }
        } else {
          setImageUrl(null)
          setValue(null)
          showMessage({ error: t(`ERROR_FILE_NOT_MATCH_FORMAT`, { dynamicValue: true, fileName: file.name }) })
        }
      } catch (error) {
        setValue(null)
        setImageUrl(null)
        showMessage({ error: t(`ERROR_UPLOAD_FILE_FAILED`, { dynamicValue: true, fileName: file.name }) })
      }
    }
  }

  useEffect(() => {
    if (image) {
      setImageUrl(image)
    } else {
      setImageUrl(null)
    }
  }, [image])

  return (
    <UploadFileStyled>
      {imageUrl ? (
        <>
          <Avatar
            src={
              <img
                src={imageUrl ?? AvatarDefault.src}
                onError={(e) => (e.currentTarget.src = AvatarDefault.src)}
                alt='avatar'
              />
            }
            size={160}
          />
          <DeleteButtonIcon
            type='text'
            icon={<TrashIcon className='icon' />}
            onClick={() => {
              setImageUrl(null)
              setValue(null)
            }}
            className='delete-avatar'
          />
        </>
      ) : (
        <>
          <Avatar src={null} size={160} className='container-avatar' draggable />
          <button
            type='button'
            className='container-upload'
            onClick={() => {
              inputUploadRef.current?.click()
            }}
          >
            <div className='container-icon'>
              <span className='icon'>
                <UploadOutlinedIcon />
              </span>
            </div>

            <div className='container-text'>
              <div className='text-main'>{t('CLICK_TO_UPLOAD')}</div>
              <div className='text-sub'>(jpeg, png, jpg)</div>
            </div>
          </button>
        </>
      )}

      <input
        ref={inputUploadRef}
        type='file'
        accept='image/*'
        onChange={handleBase64Change}
        className='upload-input'
        style={{ display: 'none' }}
      />
    </UploadFileStyled>
  )
})

export default UploadImage
