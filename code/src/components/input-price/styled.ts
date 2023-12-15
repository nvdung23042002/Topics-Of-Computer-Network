import styled from 'styled-components'

export const InputPriceStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #c5bfbf;
  border-radius: 10px;
  align-items: center;
  padding: 5px 10px;
  .input-price {
    border: none;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    height: fit-content;
    padding: 0;
    &::placeholder {
      color: #6f7d95;
    }
    &::-webkit-inner-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &:focus-visible {
      outline: unset;
    }
  }
  .prefix {
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    display: flex;
    gap: 15px;
    .icon {
      svg {
        width: 14px;
        height: 24px;
      }
    }
    .blue {
      color: #045afc;
    }
    .green {
      color: #1cce66;
    }
  }
  .currency {
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    color: #6f7d95;
    display: flex;
    gap: 15px;
    justify-content: end;
  }
  @media screen and (max-width: 575px) {
    .input-wrapper {
      max-width: 200px;
      width: 100%;
    }
  }
`
