import React from 'react'
import Heart from '@/assets/images/heart.png'
import Image from 'next/image'
import styled from 'styled-components'

type Props = {
  count: number
  isActive?: boolean
}
const ToggleWishListStyled = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  background: #000000b2;
  color: #ffff;
  border-radius: 999px;
  display: flex;
  gap: 10px;
  padding: 0.375rem 0.625rem;
  .count {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
  }
`
const HeartStyled = styled(Image)`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`

const ToggleWishList = (props: Props) => {
  // const [count, setCount] = useState(props.count)
  // const [toggle, setToggle] = useState(false)
  // useEffect(() => {
  //   setToggle(props.isActive ?? false)
  // }, [])
  return (
    <ToggleWishListStyled>
      <HeartStyled
        src={Heart}
        width={20}
        height={20}
        alt={'favorite-list'}
        // onClick={(e) => {
        //   e.stopPropagation()
        //   if (toggle) {
        //     setCount(count - 1)
        //   } else {
        //     setCount(count + 1)
        //   }
        //   setToggle(!toggle)
        // }}
      />
      <span className='count'>{props.count}</span>
    </ToggleWishListStyled>
  )
}

export default ToggleWishList
