import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { GlobalSetting } from './styled'

export type GlobalRef = {
  active: () => void
  deactive: () => void
}

export default forwardRef<GlobalRef, any>((_, forwardRef) => {
  const [open, setOpen] = useState<boolean>(false)

  useImperativeHandle(
    forwardRef,
    () => ({
      active() {
        setOpen(true)
      },
      deactive() {
        setOpen(false)
      }
    }),
    []
  )

  return open ? <GlobalSetting /> : <></>
})
