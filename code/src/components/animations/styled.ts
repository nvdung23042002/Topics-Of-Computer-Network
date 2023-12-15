import { keyframes } from 'styled-components'

export const translateUpBounce = (from = 0, to: number, multi?: string) => keyframes`
  from {
    transform: translateY(${from}px) ${multi};
  }

  50% {
    transform: translateY(${-to - 50}px) ${multi};
  }

  to {
    transform: translateY(-${to}px) ${multi};
  }

`
export const translateUpBounceString = (from = '0px', to: string, multi?: string) => keyframes`
  from {
    transform: translateY(${from}) ${multi};
  }

  50% {
    transform: translateY(calc(-${to} - 50px)) ${multi};
  }

  to {
    transform: translateY(-${to}) ${multi};
  }

`
export const translateLeftBounce = (from = 0, to: number, multi?: string) => keyframes`
  from {
    transform: translateX(${from}px) ${multi};
  }

  50% {
    transform: translateX(${-to + 50}px) ${multi};
  }

  to {
    transform: translateX(-${to}px) ${multi};
  }

`
export const translateLeftBounceString = (from = '0px', to: string, multi?: string) => keyframes`
  from {
    transform: translateX(${from}) ${multi};
  }

  50% {
    transform: translateX(calc(-${to} + 50px)) ${multi};
  }

  to {
    transform: translateX(-${to}) ${multi};
  }

`
export const translateRightBounce = (from = 0, to: number, multi?: string) => keyframes`
  from {
    transform: translateX(${from}px) ${multi};
  }

  50% {
    transform: translateX(${to - 50}px) ${multi};
  }

  to {
    transform: translateX(${to}px) ${multi};
  }

`
export const translateRightBounceString = (from = '0px', to: string, multi?: string) => keyframes`
  from {
    transform: translateX(${from}) ${multi};
  }

  50% {
    transform: translateX(calc(${to} - 50px)) ${multi};
  }

  to {
    transform: translateX(${to}) ${multi};
  }

`
export const translateUp = (from = 0, to: number, multi?: string) => keyframes`
  from {
    transform: translateY(${from}px) ${multi};
  }

  to {
    transform: translateY(-${to}px) ${multi};
  }

`
export const translateDown = (from = 0, to: number, multi?: string) => keyframes`
  from {
    transform: translateY(${from}px) ${multi};
  }

  to {
    transform: translateY(${to}px) ${multi};
  }
`
export const translateLeft = (from: number | string = 0, to: number | string, multi?: string) => keyframes`
  from {
    transform: translateX(${from}${typeof from === 'number' ? 'px' : ''}) ${multi};
  }

  to {
    transform: translateX(-${to}${typeof to === 'number' ? 'px' : ''}) ${multi};
  }

`
export const translateRight = (from = 0, to: number, multi?: string) => keyframes`
  from {
    transform: translateX(${from}px) ${multi};
  }

  to {
    transform: translateX(${to}px) ${multi};
  }
`
export const rotate = (from = 0, to: number, multi?: string) => keyframes`
  from {
    transform: rotate(${from}deg) ${multi};
  }

  to {
    transform: rotate(${to}deg) ${multi};
  }
`

export const scale = (from = 0, to: number, multi?: string) => keyframes`
  from {
    transform: scale(${from}) ${multi};
  }

  to {
    transform: scale(${to}) ${multi};
  }
`
