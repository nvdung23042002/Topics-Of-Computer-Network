import React, { RefObject, memo, useEffect, useRef, useState } from 'react'
import { EditorViewerStyled } from './styled'
import { debounce } from 'lodash'
import classNames from 'classnames'

type EditorViewerType = {
  className?: string
  content: string
  onShowLess?: () => void
  showLess?: boolean
}
const EditorViewer: React.FC<EditorViewerType> = memo(
  ({ content, className, onShowLess, showLess }: EditorViewerType) => {
    const contentRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const [canMore, setCanMore] = useState<boolean>(true)
    const [moreView, setMoreView] = useState<boolean | undefined>()

    useEffect(() => {
      if (moreView === false && onShowLess) onShowLess()
    }, [moreView, onShowLess])

    useEffect(() => {
      debounce(() => {
        if (contentRef.current && showLess) {
          const clientHeight = contentRef.current.clientHeight

          if (clientHeight >= 100) {
            setCanMore(true)
          } else {
            setCanMore(false)
          }
        }
      }, 400)()
    }, [showLess])

    return (
      <>
        <EditorViewerStyled
          ref={contentRef}
          className={classNames(className, {
            'view-more': !moreView && canMore && showLess
          })}
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
        {canMore && showLess && (
          <button
            className='more-button'
            onClick={() => {
              setMoreView(!moreView)
            }}
          >
            {moreView ? '少なく' : 'もっと'}
          </button>
        )}
      </>
    )
  }
)

export default memo(EditorViewer)
