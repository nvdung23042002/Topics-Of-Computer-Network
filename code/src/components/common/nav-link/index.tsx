import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren, useState, useEffect } from 'react'

export type NavLinkProps = LinkProps & {
  className?: string
  activeClassName?: string
  alwaysActive?: boolean
  onClick?: () => void
}
const NavLink = ({ children, activeClassName, className = '', onClick, ...props }: PropsWithChildren<NavLinkProps>) => {
  const { asPath, isReady, locale } = useRouter()
  const [computedClassName, setComputedClassName] = useState(className)

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const newClassName = asPath?.includes(props.href as any) ? `${className} ${activeClassName}`.trim() : className

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName)
      }
    }
  }, [asPath, isReady, props.as, props.href, activeClassName, className, computedClassName])

  return (
    <Link className={computedClassName} locale={locale} {...props} style={{ outline: 'none' }} onClick={onClick}>
      {children}
    </Link>
  )
}

export default NavLink
