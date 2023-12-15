import { FC } from 'react'
import { TabStyled } from './styled'
import { TabsProps } from 'antd'

interface Props extends TabsProps {
  defaultActiveKey: string
  listItem: any[]
  isBorderBottom?: boolean
  className?: string
  onChange?: any
}

export const TabComponent: FC<Props> = ({
  defaultActiveKey = '1',
  listItem,
  isBorderBottom,
  className,
  onChange,
  ...props
}) => {
  return (
    <TabStyled
      isBorderBottom={isBorderBottom ?? false}
      defaultActiveKey={defaultActiveKey}
      items={listItem}
      className={className}
      onChange={onChange}
      {...props}
    />
  )
}
