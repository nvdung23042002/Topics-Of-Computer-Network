import React, { ReactElement, ReactNode } from 'react'
import { CollapseStyled, RightOutlinedStyled } from './styled'

type Props = {
  children: ReactNode | ReactElement
  className?: string
  activeKey?: any[]
  defaultActiveKey?: any[]
  destroyInactivePanel?: boolean
  onChange?: (key: any[]) => void
}

const CollapseComponent: React.FC<Props> = ({
  children,
  activeKey,
  className,
  onChange,
  defaultActiveKey,
  destroyInactivePanel
}) => {
  return (
    <CollapseStyled
      defaultActiveKey={defaultActiveKey ?? ['1']}
      ghost
      destroyInactivePanel={destroyInactivePanel}
      activeKey={activeKey}
      expandIcon={({ isActive }: any) => {
        return <RightOutlinedStyled active={String(isActive)} />
      }}
      className={className}
      onChange={onChange}
    >
      {children}
    </CollapseStyled>
  )
}

export default CollapseComponent
