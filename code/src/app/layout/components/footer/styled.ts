import styled from 'styled-components'
import Image from 'next/image'
import Container from '@/components/container'
export const FooterStyled = styled.footer`
  border-top: 1px solid #d6e5e9;
  margin: 0;
  padding: 48px 15px;
  @media screen and (max-width: 1199px) {
    padding: 28px 15px 52px;
  }
`
export const FooterContainerStyled = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: space-between;
`
export const FooterRight = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 24px 100px;
  @media screen and (min-width: 768px) {
    .col:last-child {
      margin-right: 85px;
    }
  }
  @media screen and (max-width: 768px) {
    justify-content: flex-start;
  }
  .title {
    margin-bottom: 12px;
    color: #183b56;
    font-weight: 700;
    font-size: 16px;
  }
  .nav-item {
    margin-bottom: 12px;
    display: block;
    color: #6f7d95;
    font-weight: 400;
    font-size: 16px;
    white-space: nowrap;
  }
`
export const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
  .language-choice {
    margin-left: -12px;
  }
`
export const ImageStyled = styled(Image)``
