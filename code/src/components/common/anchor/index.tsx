import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styled from 'styled-components'

type AnchorProps = {
  id: string
  route: string
}

export const AnchorStyled = styled.div`
  position: relative;
  .anchor {
    position: absolute;
    top: -100px;
    z-index: -1;
  }
`

export default React.forwardRef((props: AnchorProps, forwardRef: any) => {
  const { asPath } = useRouter()

  useEffect(() => {
    if (asPath.includes(props.route)) {
      setTimeout(() => {
        document.querySelector(`#${props.id}`)?.scrollIntoView()
      }, 1000)
    }
  }, [asPath, props.route, props.id])
  return (
    <AnchorStyled ref={forwardRef}>
      <div className='anchor' id={props.id} />
    </AnchorStyled>
  )
})
