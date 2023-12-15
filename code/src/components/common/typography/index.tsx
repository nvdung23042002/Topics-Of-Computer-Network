import { TitleProps } from 'antd/es/typography/Title'
import { TextProps } from 'antd/es/typography/Text'
import { TextStyled, TitleStyled, ParagraphStyled, IconButton } from './styled'
import { ParagraphProps } from 'antd/es/typography/Paragraph'
import CopyIcon from '@/components/icons/CopyIcon'
import copyTextToClipboard from '@/utils/copyTextToClipboard'
import toast from '@/utils/toast'
import { useTranslation } from 'next-i18next'
import { Tooltip } from 'antd'

interface TitlePropsType extends TitleProps {
  tooltipClassName?: string
}
interface TextPropsType extends TextProps {
  tooltipClassName?: string
}
const Title: React.FC<TitlePropsType> = ({ children, title, ...props }: TitlePropsType) =>
  title ? (
    <Tooltip title={title} trigger={['hover', 'click']}>
      <TitleStyled {...props}>{children}</TitleStyled>
    </Tooltip>
  ) : (
    <TitleStyled {...props}>{children}</TitleStyled>
  )

const Text: React.FC<TextPropsType> = ({ children, title, ...props }: TextPropsType) =>
  title ? (
    <Tooltip title={title} trigger={['hover', 'click']}>
      <TextStyled {...props}>{children}</TextStyled>
    </Tooltip>
  ) : (
    <TextStyled {...props}>{children}</TextStyled>
  )

const Paragraph: React.FC<ParagraphProps> = ({ children, ...props }: ParagraphProps) => (
  <ParagraphStyled {...props}>{children}</ParagraphStyled>
)

const TextCopy: React.FC<TextProps & { valueCopy?: string; t?: any }> = ({
  children,
  valueCopy,
  ...props
}: TextProps & { valueCopy?: string; t?: any }) => {
  const { t } = useTranslation('common')
  const handleCopy: any = (text: string) => {
    copyTextToClipboard(text)
      .then(() => {
        toast.success(props.t ? props.t('COPIED_DATA') : t('COPIED_DATA'), 'copy-notification', 5)
      })
      .catch((err) => toast.error(err))
  }
  return (
    <TextStyled {...props}>
      <div className='wrap-copy-text'>
        {children}{' '}
        <IconButton
          type='text'
          icon={<CopyIcon />}
          onClick={() => {
            return valueCopy ? handleCopy(valueCopy) : typeof children === 'string' && handleCopy(children)
          }}
        />
      </div>
    </TextStyled>
  )
}

export default { Title, Text, Paragraph, TextCopy }
