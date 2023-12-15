import styled from 'styled-components'

export const BetTableStyled = styled.div`
  table {
    table-layout: fixed;
    width: 100%;

    thead > tr {
      width: 100%;
      border: 1px solid ${(props: any) => props.theme.token.colorBorder2th};
      height: 40px;
      background-color: ${(props: any) => props.theme.token.colorBg2th};

      & > th {
        text-align: start;
        padding-left: 20px;
        vertical-align: middle;
        font-size: 14px;
        line-height: 20px;

        @media screen and (max-width: 767px) {
          padding-left: 10px;
        }
      }
    }

    tbody {
      tr {
        th {
          border: 1px solid ${(props: any) => props.theme.token.colorBorder2th};
          font-size: 14px;
          line-height: 20px;
          vertical-align: middle;
          word-break: break-all;
          padding: 0 8px;
        }
      }

      tr:nth-child(1) {
        th {
          height: 30px;
        }
      }

      tr:nth-child(2) {
        th {
          height: 48px;
          cursor: pointer;
          @media screen and (min-width: 1200px) {
            &:hover {
              background-color: #ffeeee;
            }
          }
        }

        th.active {
          background-color: ${(props: any) => props.theme.token.colorPrimary};

          & > * {
            color: ${(props: any) => props.theme.token.colorText2th};
          }
        }

        th.disable {
          cursor: default !important;
          background-color: #e5e3e3 !important;
          opacity: 0.5;
        }
      }
    }
  }
`
