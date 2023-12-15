import { ReactNode, RefObject, forwardRef, useRef } from 'react'
import { AlertContent, FileStyled, LabelStyled } from './styled'
import { ConfigProvider, InputProps } from 'antd'
import { FormTheme } from '@/theme'
import Button from '../button'
import Typography from '../typography'

interface InputPropsType extends InputProps {
  label?: string | ReactNode
  isRequired?: boolean
}

export default forwardRef<any, InputPropsType>(({ label, isRequired, className, value, ...props }: any, ref: any) => {
  const fileRef: RefObject<HTMLInputElement | null | undefined> = useRef<HTMLInputElement | null | undefined>(ref)
  const onFileChange = (e: any) => {
    if (e.target.value) props.onChange({ target: { value: e.target.files?.[0] } })
  }

  const onSelectImage = () => {
    if (!props.disabled) (fileRef as any)?.current?.click()
  }

  return (
    <ConfigProvider theme={FormTheme}>
      {label && (
        <LabelStyled>
          {label} {isRequired && label && <AlertContent>*</AlertContent>}
        </LabelStyled>
      )}
      <FileStyled>
        <input
          {...props}
          ref={fileRef as any}
          type='file'
          onChange={onFileChange}
          accept='image/x-png,image/gif,image/jpeg'
        />
        <Button className='button-file' onClick={onSelectImage} disabled={props.disabled}>
          Choose a file
        </Button>
        <Typography.Text className='file-name'>{value?.name ?? 'No file chosen'}</Typography.Text>
      </FileStyled>
    </ConfigProvider>
  )
})
