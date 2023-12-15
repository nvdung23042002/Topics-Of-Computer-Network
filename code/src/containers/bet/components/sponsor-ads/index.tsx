import React, { useCallback, useEffect, useState } from 'react'
import { SponsorAdsImgStyled, SponsorAdsStyled } from './styled'
import NSBService from '@/services/NSB.service'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import _isEmpty from 'lodash/isEmpty'

type Props = {
  setIsEmptySponsorAds?: (empty: boolean) => void
}

const SponsorAds: React.FC<Props> = ({ setIsEmptySponsorAds }) => {
  const [listBanner, setListBanner] = useState<any[]>([])

  const getListBanner = useCallback(async () => {
    try {
      const response = await NSBService.getBanner({})
      if (!_isEmpty(response?.data?.result)) {
        setListBanner(response?.data?.result)
        setIsEmptySponsorAds && setIsEmptySponsorAds(false)
      } else {
        setIsEmptySponsorAds && setIsEmptySponsorAds(true)
      }
    } catch (error) {
      showMessage({ error: getError(error) })
    }
  }, [])

  useEffect(() => {
    getListBanner()
  }, [getListBanner])

  return (
    <SponsorAdsStyled>
      {listBanner?.map((item: any) => (
        <SponsorAdsImgStyled key={item?.id} sponsorId={item.sponsorId} image={item?.backgroundImage} />
      ))}
    </SponsorAdsStyled>
  )
}

export default SponsorAds
