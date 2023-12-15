import SiteLoading from '@/components/site-loading'
import classNames from 'classnames'
import { debounce } from 'lodash'
import { useEffect, FC, ReactElement, useRef, RefObject } from 'react'
import styled from 'styled-components'

const WrapLoading = styled.main`
  z-index: 1;
  background: ${(props) => props.theme.token.colorBgLoading};
  &.hidden {
    display: none;
  }
`

const withLoading = <P extends object>(WrappedComponent: FC<P>, duration = 400): FC<P> => {
  return (props): ReactElement => {
    const loadingRef: RefObject<HTMLDivElement> = useRef(null)
    const componentRef: RefObject<HTMLDivElement> = useRef(null)
    useEffect(() => {
      // Simulate a delay to show loading state
      debounce(() => {
        loadingRef.current?.classList.add('hidden')
        componentRef.current?.classList.remove('v-hidden')
      }, duration)()
    }, [])

    return (
      <>
        <WrapLoading
          ref={loadingRef}
          className={classNames({
            ['center-box w-100 h-100']: true
          })}
        >
          <SiteLoading />
        </WrapLoading>

        <WrappedComponent ref={componentRef} className={classNames('v-hidden')} {...props} />
      </>
    )
  }
}

export default withLoading
