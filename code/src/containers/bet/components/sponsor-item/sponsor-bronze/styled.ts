import styled from 'styled-components'

export const SponsorBronzeStyled = styled.div`
  /* position: relative; */
  width: 100%;
  max-width: 740px;
  height: 130px;
  background: linear-gradient(
    to bottom right,
    #673529 14.68%,
    #bf7544 31.64%,
    #e7d3ad 49.45%,
    #bf7544 65.13%,
    #a8643d 68.89%,
    #854b32 75.59%,
    #6f3b2b 81.09%,
    #673529 84.63%
  );
  padding: 2px;

  .second-class {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top right,
      #673529 14.68%,
      #bf7544 31.64%,
      #e7d3ad 49.45%,
      #bf7544 65.13%,
      #a8643d 68.89%,
      #854b32 75.59%,
      #6f3b2b 81.09%,
      #673529 84.63%
    );

    padding: 4px;
  }

  .second-class.small {
    padding: 2px;
  }

  .third-class {
    width: 100%;
    height: 100%;
    background: #000;
    padding: 8px;
  }

  .third-class.small,
  .third-class.medium {
    padding: 5px;
  }

  /* large item */
  .four-class {
    position: relative;
    width: 100%;
    height: 100%;
    background-position: 0 0, 0 0, 100% 0, 0 100%;
    background-size: 2px 100%, 100% 2px, 2px 100%, 100% 2px;
    background-repeat: no-repeat;
    background-image: repeating-linear-gradient(0deg, transparent, transparent 8px, transparent 8px, transparent 20px),
      repeating-linear-gradient(90deg, #854b32, #854b32 8px, transparent 8px, transparent 20px),
      repeating-linear-gradient(180deg, transparent, transparent 8px, transparent 8px, transparent 20px),
      repeating-linear-gradient(270deg, #854b32, #854b32 8px, transparent 8px, transparent 20px) // bottom
;
    border-image: repeating-linear-gradient(0deg, #854b32, #854b32 8px, transparent 8px, transparent 20px);
  }

  .company {
    position: absolute;
    top: 8px;
    left: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    .company-name {
      max-width: 200px;
      font-size: 16px;
      line-height: 24px;
      word-break: break-all;
    }
  }

  .logo {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
  }

  .company-money {
    position: absolute;
    bottom: 33px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    display: flex;
    align-items: baseline;

    .sponsor-money {
      font-size: 16px;
      line-height: 24px;
    }

    .money {
      font-style: normal;
      font-weight: 900;
      font-size: 36px;
      line-height: normal;
      background: linear-gradient(
        to top right,
        #673529 14.68%,
        #bf7544 31.64%,
        #e7d3ad 49.45%,
        #bf7544 65.13%,
        #a8643d 68.89%,
        #854b32 75.59%,
        #6f3b2b 81.09%,
        #673529 84.63%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      white-space: nowrap;
    }
  }

  .flag {
    position: absolute;
    top: 8px;
    right: 0;
    width: fit-content;
    height: auto;
    padding: 4px 26px 5px 37px;
    background: linear-gradient(
      to top right,
      #673529 14.68%,
      #bf7544 31.64%,
      #e7d3ad 49.45%,
      #bf7544 65.13%,
      #a8643d 68.89%,
      #854b32 75.59%,
      #6f3b2b 81.09%,
      #673529 84.63%
    );
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > span {
      color: ${({ theme }: any) => theme.token.colorText6th};
      opacity: 0.5;
      font-size: 18px;
      font-weight: 500;
    }

    & > .aa {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 19px 0 19px 21px;
      border-color: transparent transparent transparent ${({ theme }: any) => theme.token.colorText6th};
    }
  }

  .sponsor-money {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 8px;
    font-size: 16px;
    line-height: normal;
  }

  .sponsor-link {
    position: absolute;
    right: 0;
    font-size: 14px;
    line-height: normal;
    bottom: 8px;
  }

  /* small item */

  .company-small {
    position: absolute;
    top: 6px;
    left: 0;
    display: flex;
    align-items: center;
    gap: 3px;

    .company-name-small {
      max-width: 120px;
      font-size: 12px;
      line-height: normal;
      word-break: break-all;
    }
  }

  .logo-small {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
  }

  .flag-small {
    position: absolute;
    top: 11px;
    right: 0;
    padding: 2.46px 15.23px 2.08px 21.77px;
    background: linear-gradient(
      to top right,
      #673529 14.68%,
      #bf7544 31.64%,
      #e7d3ad 49.45%,
      #bf7544 65.13%,
      #a8643d 68.89%,
      #854b32 75.59%,
      #6f3b2b 81.09%,
      #673529 84.63%
    );
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > span {
      color: ${({ theme }: any) => theme.token.colorText6th};
      opacity: 0.5;
      font-size: 12px;
      font-weight: 500;
      line-height: normal;
    }

    & > .aa {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 11.5px 0 10px 11.5px;
      border-color: transparent transparent transparent ${({ theme }: any) => theme.token.colorText6th};
    }
  }

  .company-money-small {
    position: absolute;
    bottom: 37px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    display: flex;
    align-items: baseline;

    @media screen and (max-width: 1199px) {
      position: unset !important;
      height: 100%;
      align-items: center;
      justify-content: center;
      transform: unset;
    }

    .money-small {
      font-style: normal;
      font-weight: 900;
      font-size: 24px;
      line-height: normal;
      background: linear-gradient(
        to top right,
        #673529 14.68%,
        #bf7544 31.64%,
        #e7d3ad 49.45%,
        #bf7544 65.13%,
        #a8643d 68.89%,
        #854b32 75.59%,
        #6f3b2b 81.09%,
        #673529 84.63%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      white-space: nowrap;
    }
  }

  .sponsor-money-small {
    position: absolute;
    left: 0;
    bottom: 7px;
    font-size: 12px;
    line-height: normal;
  }

  .sponsor-link-small {
    position: absolute;
    right: 0;
    bottom: 7px;
    font-size: 12px;
    line-height: normal;
  }

  /* medium */
  .company-medium {
    position: absolute;
    top: 6px;
    left: 0;
    display: flex;
    align-items: center;
    gap: 3px;

    .company-name-medium {
      max-width: 160px;
      font-size: 12px;
      line-height: normal;
      word-break: break-all;
    }
  }

  .logo-medium {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
  }

  .flag-medium {
    position: absolute;
    top: 6px;
    right: 0;
    padding: 2.46px 15.23px 2.08px 21.77px;
    width: fit-content;
    height: auto;
    background: linear-gradient(
      to top right,
      #673529 14.68%,
      #bf7544 31.64%,
      #e7d3ad 49.45%,
      #bf7544 65.13%,
      #a8643d 68.89%,
      #854b32 75.59%,
      #6f3b2b 81.09%,
      #673529 84.63%
    );
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > span {
      color: ${({ theme }: any) => theme.token.colorText6th};
      opacity: 0.5;
      font-size: 12px;
      font-weight: 500;
      line-height: normal;
    }

    & > .aa {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 11px 0 11px 13px;
      border-color: transparent transparent transparent ${({ theme }: any) => theme.token.colorText6th};
    }
  }

  .company-money-medium {
    position: absolute;
    bottom: 37px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    display: flex;
    align-items: baseline;

    .money-medium {
      font-style: normal;
      font-weight: 900;
      font-size: 24px;
      line-height: normal;
      background: linear-gradient(
        to top right,
        #673529 14.68%,
        #bf7544 31.64%,
        #e7d3ad 49.45%,
        #bf7544 65.13%,
        #a8643d 68.89%,
        #854b32 75.59%,
        #6f3b2b 81.09%,
        #673529 84.63%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .sponsor-money-medium {
    position: absolute;
    left: 0;
    bottom: 7px;
    font-size: 12px;
    line-height: normal;
  }

  .sponsor-link-medium {
    position: absolute;
    right: 0;
    bottom: 7px;
    font-size: 12px;
    line-height: normal;
  }
`
