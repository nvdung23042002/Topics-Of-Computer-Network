import banner from '@/components/banner'
import styled from 'styled-components'

export const SponsorAdsStyled = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 8px;
  row-gap: 8px;
  align-items: center;
`

export const SponsorAdsImgStyled = styled(banner)`
  position: relative;
  width: 430px;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;

  @media screen and (max-width: 575px) {
    width: 343px;
    height: 127.628px;
  }
`
