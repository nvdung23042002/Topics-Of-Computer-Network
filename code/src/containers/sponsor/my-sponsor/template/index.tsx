import { useRouter } from 'next/router'
import FirstStep from './first-step'
import SecondStep from './second-step'
import { SponsorTemplateStyled } from './styled'
import ThirdStep from './third-step'

export enum STEP_STATUS {
  TP_LIST = 1,
  CHOSE_TP = 2,
  CREATE_TP = 3
}

const Template = () => {
  const router = useRouter()
  const { step } = router.query || {}

  const renderStep = (step: number) => {
    const STEP = {
      [STEP_STATUS.TP_LIST]: <FirstStep />,
      [STEP_STATUS.CHOSE_TP]: <SecondStep />,
      [STEP_STATUS.CREATE_TP]: <ThirdStep />
    }

    return STEP[step]
  }

  return <SponsorTemplateStyled>{renderStep(Number(step || 1))}</SponsorTemplateStyled>
}

export default Template
