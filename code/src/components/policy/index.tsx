import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ModalProps } from 'antd'
import { PolicyModal } from './styled'
import Button from '@/components/common/button'
import EditorViewer from '@/components/common/editor-viewer'
import SponsorService from '@/services/Sponsor.service'
import NSBService from '@/services/NSB.service'
import { useTranslation } from 'next-i18next'

export type ModalHandle = {
  visible: (id?: string | number) => void
  hidden: () => void
}
export interface PolicyModalType extends ModalProps {
  page: 'user' | 'sponsor'
  typeTerm: 'TERM_SPONSOR' | 'TERM_SHOP_TICKET' | 'TERM_SHOP_ONLINE' | 'TERM_BET_TICKET' | 'TERM_BET'
  isTranslate?: boolean
  onChangePolicy: (isAccept: boolean) => void
}
export default forwardRef<ModalHandle, PolicyModalType>(
  ({ onChangePolicy, isTranslate, page, typeTerm, ...props }, forwardRef) => {
    const { t } = useTranslation('common', { useSuspense: false })
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [content, setContent] = useState<string | undefined>()
    const close = () => {
      setIsOpen(false)
    }

    const onSubmit = (status: boolean) => {
      onChangePolicy(status)
      close()
    }

    useEffect(() => {
      ;(async () => {
        try {
          const { data } = await (page === 'sponsor' ? SponsorService : NSBService).getTerms(typeTerm)
          setContent(data?.content)
        } catch (error) {
          console.error(error)
        }
      })()
    }, [])

    useImperativeHandle(
      forwardRef,
      () => ({
        visible() {
          setIsOpen(true)
        },
        hidden() {
          setIsOpen(false)
        }
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )

    return (
      <PolicyModal
        title={isTranslate ? t('TERM_OF_SERVICE') : '利用規約'}
        //   style={{ top: 20 }}
        centered
        width={638}
        open={isOpen}
        onCancel={close}
        destroyOnClose
        maskClosable={false}
        closable={false}
        keyboard={false}
        footer={
          <>
            <Button shape={'round'} onClick={() => onSubmit(false)}>
              {isTranslate ? t('DECLINE') : '拒否する'}
            </Button>
            <Button type='primary' shape={'round'} onClick={() => onSubmit(true)}>
              {isTranslate ? t('ACCEPT') : '同意する'}
            </Button>
          </>
        }
        {...props}
      >
        <EditorViewer className='policy-content' content={content ?? ''} />
      </PolicyModal>
    )
  }
)
