import React, { useRef } from 'react'
import { TooltipProps } from 'antd'
import { TooltipStyled } from './styled'

interface TooltipCustomProps {
  children: React.ReactElement | React.ReactNode
}

const TooltipCustom = (props: TooltipCustomProps & TooltipProps) => {
  const tooltipContainerRef = useRef(null)
  return (
    <span ref={tooltipContainerRef}>
      <TooltipStyled {...props} color='#183B56' getPopupContainer={(triggerNode) => triggerNode}>
        {props.children}
      </TooltipStyled>
    </span>
  )
}

export default TooltipCustom
