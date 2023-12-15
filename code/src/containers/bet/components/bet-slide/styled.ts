import banner from '@/components/banner'
import styled from 'styled-components'

export const BetSlideStyled = styled.div`
  max-width: 740px;
  margin-bottom: 35px;

  @media screen and (max-width: 1199px) {
    .slick-slide {
      & > div {
        text-align: center;
      }
    }
  }
`

export const BetSlideImageStyled = styled(banner)`
  position: relative;
  width: 363px !important;
  height: 135px !important;
  border-radius: 10px;
  overflow: hidden;

  @media screen and (max-width: 575px) {
    width: 343px !important;
    height: 127.628px !important;
  }

  .slick-dots {
    bottom: -15px !important;
  }
`
