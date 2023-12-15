import Table from '@/components/common/table'
import ButtonCommon from '@/components/common/button'
import styled from 'styled-components'

export const FirstStepStyled = styled.div`
  .title-column {
    word-break: break-all;
  }
`

export const FirstStepControlStyled = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;

  .template-management {
    font-size: 24px;

    @media screen and (max-width: 1199px) {
      font-size: 16px;
    }
  }
`

export const AddBtnStyled = styled(ButtonCommon)`
  width: 154px;
  border: none;
  background-color: ${({ theme }: any) => theme.token.colorPrimary};
  padding: 13px 0;
  height: auto;
  border-radius: 100px;

  @media screen and (max-width: 1199px) {
    margin-top: 32px;
    width: 100%;
  }

  & > div {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.3px;
  }
`

export const TemplateTableStyled = styled(Table)`
  margin-top: 24px;

  .ant-table-row {
    height: 60px;
  }

  .public {
    color: ${({ theme }: any) => theme.token.colorBgRewardWon};
  }

  .private {
    color: ${({ theme }: any) => theme.token.colorText11th};
  }
`
