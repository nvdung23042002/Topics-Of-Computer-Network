import { Card, Row } from 'antd'
import styled from 'styled-components'

export const ProductStyled = styled(Card)`
  height: 100%;
  border-radius: 15px;
  .ant-card-body {
    padding: 10px;
  }
  .eth-icon {
    color: ${(props) => props.theme.token.colorTextBlue};
    svg {
      width: 9px !important;
    }
  }
  .info-product {
    margin: 10px 0;
  }
  @media screen and (max-width: 570px) {
    border-radius: 15px;
    .status {
      font-weight: 500;
      font-size: 8px;
      line-height: 16px;
      padding: 0 10px;
      white-space: nowrap;
    }
    .eth-icon {
      svg {
        width: 7px !important;
      }
    }
    .info-product {
      margin: 0px;
    }
  }
`
export const ProductImageStyled = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  img {
    object-fit: contain;
  }
  @media screen and (max-width: 570px) {
    border-radius: 10px;
    padding: 0px;
  }
`
export const ProductCollectionNameStyled = styled.div`
  font-style: normal;
  font-weight: 350;
  font-size: 12px;
  color: #6f7d95;
  margin-top: 10px;
  margin-bottom: 5px;
  max-width: 100%;
  width: fit-content;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  @media screen and (max-width: 570px) {
    font-weight: 350;
    font-size: 10px;
    line-height: 14px;
    margin-bottom: 0px;
  }
`
export const ProductNameStyled = styled(Row)`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .product-name {
    display: inline-block;
    max-width: calc(100% - 30px);
    width: fit-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media screen and (max-width: 570px) {
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
  }
`
export const ProductPriceStyled = styled.div`
  text-align: end;
  .price {
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    display: flex;
  }
  .coin-price {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: ${(props) => props.theme.token.colorTextBlue};
  }
  @media screen and (max-width: 570px) {
    .coin-price {
      font-size: 12px;
      line-height: 17px;
    }
    .price {
      font-weight: 400;
      font-size: 10px;
      line-height: 14px;
    }
  }
`
