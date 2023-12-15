import React from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import Icon from '@ant-design/icons/lib/components/Icon'
interface IconProps extends CustomIconComponentProps {
  component:
    | React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>>
    | React.ForwardRefExoticComponent<CustomIconComponentProps>
    | undefined
}

const IconCustom = ({ component, ...rest }: Partial<IconProps>) => {
  return <Icon component={component} {...rest} />
}

export default IconCustom
