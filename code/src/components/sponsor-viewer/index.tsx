import React, { useCallback } from 'react'
import { BackdropStyled } from './styled'
import classNames from 'classnames'
import SponsorHorizontal from '../modal/sponsor-modal/sponsor-horizontal'
import SponsorVertical from '../modal/sponsor-modal/sponsor-vertical'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import SiteLoading from '../site-loading'
import { closeSponsorDetail } from '@/redux/sponsor/slice'

export default () => {
  const sponsorDetail = useAppSelector((state) => state.sponsor.sponsorDetail)
  const detailSponsorLoading = useAppSelector((state) => state.sponsor.detailSponsorLoading)
  const dispatch = useAppDispatch()

  const close = useCallback(() => {
    dispatch(closeSponsorDetail())
  }, [dispatch])
  return (
    <>
      <BackdropStyled
        className={classNames({
          visible: detailSponsorLoading
        })}
      >
        {detailSponsorLoading && <SiteLoading width={50} />}
      </BackdropStyled>

      <SponsorVertical
        open={sponsorDetail?.template === 'TEMPLATE_1'}
        destroyOnClose
        onCancel={close}
        contentModal={sponsorDetail}
      />
      <SponsorHorizontal
        open={sponsorDetail?.template === 'TEMPLATE_2'}
        destroyOnClose
        onCancel={close}
        contentModal={sponsorDetail}
      />
    </>
  )
}
