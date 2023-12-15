import { Avatar, Card, Descriptions } from 'antd'
import {
  ContainerSponsorInfo,
  DescriptionsStyled,
  HeaderSponsorInfo,
  SponsorProfileStyled,
  SponsorProfileTitleStyled
} from './styled'
import { IconButton } from '@/components/common/typography/styled'
import EditIcon from '@/components/icons/EditIcon'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/hooks/store'
import AvatarDefault from '@/assets/images/avatar_default.png'
import phoneServerFormat from '@/utils/phoneFormat'
import Typography from '@/components/common/typography'
import { useWindowSize } from '@/hooks/useWindowResize'
const Profile = () => {
  const navigate = useRouter()
  const sponsorProfile = useAppSelector((state) => state.authSponsor.sponsorProfile)
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  return (
    <SponsorProfileStyled>
      {isMaxWidth1199 && <SponsorProfileTitleStyled>ユーザー情報</SponsorProfileTitleStyled>}
      <Card>
        <ContainerSponsorInfo>
          <HeaderSponsorInfo>
            <div>
              <Avatar
                size={isMaxWidth1199 ? 60 : 80}
                src={
                  <img
                    src={sponsorProfile?.logoSponsor ?? AvatarDefault.src}
                    onError={(e) => (e.currentTarget.src = AvatarDefault.src)}
                    alt='avatar'
                  />
                }
              />
            </div>
            <div className='container-header-info'>
              <Typography.Text className='name text-nowrap' title={sponsorProfile?.companyName}>
                {sponsorProfile?.companyName}
              </Typography.Text>
              <IconButton
                type='text'
                icon={<EditIcon />}
                className='btn-icon'
                onClick={() => {
                  navigate.push('/sponsor/my-sponsor/edit-profile')
                }}
              />
            </div>
          </HeaderSponsorInfo>
          {isMaxWidth1199 ? (
            <DescriptionsStyled column={1}>
              <Descriptions.Item label={<span className='label-info'>メール</span>}>
                <Typography.Text className='text-info text-ellipsis' title={sponsorProfile?.email}>
                  {sponsorProfile?.email}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>郵便番号</span>}>
                <Typography.Text className='text-info text-ellipsis' title={sponsorProfile?.postCode}>
                  {sponsorProfile?.postCode}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>代表者メール</span>}>
                <Typography.Text className='text-info text-ellipsis' title={sponsorProfile?.contactEmail}>
                  {sponsorProfile?.contactEmail}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item className='hp-url' label={<span className='label-info'>ホームページURL</span>}>
                <Typography.Text title={sponsorProfile?.homepageUrl}>
                  <a
                    href={sponsorProfile?.homepageUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-link'
                    title={sponsorProfile?.homepageUrl}
                  >
                    {sponsorProfile?.homepageUrl}
                  </a>
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>電話番号</span>}>
                <Typography.Text
                  className='text-info text-ellipsis'
                  title={
                    sponsorProfile?.phonePrefix && sponsorProfile?.phoneSuffix
                      ? `${phoneServerFormat(sponsorProfile?.phonePrefix, sponsorProfile?.phoneSuffix, true)}`
                      : ''
                  }
                >
                  {sponsorProfile?.phonePrefix && sponsorProfile?.phoneSuffix
                    ? `${phoneServerFormat(sponsorProfile?.phonePrefix, sponsorProfile?.phoneSuffix, true)}`
                    : ''}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>住所</span>}>
                <Typography.Text className='text-info text-ellipsis' title={sponsorProfile?.addressCompany}>
                  {sponsorProfile?.addressCompany}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>代表者名</span>}>
                <Typography.Text className='text-info text-ellipsis' title={sponsorProfile?.contactName}>
                  {sponsorProfile?.contactName}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>代表者電話番号</span>}>
                <Typography.Text
                  className='text-info text-ellipsis'
                  title={
                    sponsorProfile?.contactPhonePrefix && sponsorProfile?.contactPhoneSuffix
                      ? `${phoneServerFormat(
                          sponsorProfile?.contactPhonePrefix,
                          sponsorProfile?.contactPhoneSuffix,
                          true
                        )}`
                      : ''
                  }
                >
                  {sponsorProfile?.contactPhonePrefix && sponsorProfile?.contactPhoneSuffix
                    ? `${phoneServerFormat(
                        sponsorProfile?.contactPhonePrefix,
                        sponsorProfile?.contactPhoneSuffix,
                        true
                      )}`
                    : ''}
                </Typography.Text>
              </Descriptions.Item>
            </DescriptionsStyled>
          ) : (
            <DescriptionsStyled column={2}>
              <Descriptions.Item label={<span className='label-info'>メール</span>}>
                <Typography.Text className='text-info text-ellipsis' title={sponsorProfile?.email}>
                  {sponsorProfile?.email}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>電話番号</span>}>
                <Typography.Text
                  className='text-info text-ellipsis'
                  title={
                    sponsorProfile?.phonePrefix && sponsorProfile?.phoneSuffix
                      ? `${phoneServerFormat(sponsorProfile?.phonePrefix, sponsorProfile?.phoneSuffix, true)}`
                      : ''
                  }
                >
                  {sponsorProfile?.phonePrefix && sponsorProfile?.phoneSuffix
                    ? `${phoneServerFormat(sponsorProfile?.phonePrefix, sponsorProfile?.phoneSuffix, true)}`
                    : ''}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>郵便番号</span>}>
                <Typography.Text className='text-info text-ellipsis' title={sponsorProfile?.postCode}>
                  {sponsorProfile?.postCode}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>住所</span>}>
                <Typography.Text className='text-info text-ellipsis' title={sponsorProfile?.addressCompany}>
                  {sponsorProfile?.addressCompany}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>代表者メール</span>}>
                <Typography.Text className='text-info text-ellipsis' title={sponsorProfile?.contactEmail}>
                  {sponsorProfile?.contactEmail}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>代表者名</span>}>
                <Typography.Text className='text-info text-ellipsis' title={sponsorProfile?.contactName}>
                  {sponsorProfile?.contactName}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>ホームページURL</span>}>
                <Typography.Text title={sponsorProfile?.homepageUrl}>
                  <a
                    href={sponsorProfile?.homepageUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-link'
                    title={sponsorProfile?.homepageUrl}
                  >
                    {sponsorProfile?.homepageUrl}
                  </a>
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>代表者電話番号</span>}>
                <Typography.Text
                  className='text-info text-ellipsis'
                  title={
                    sponsorProfile?.contactPhonePrefix && sponsorProfile?.contactPhoneSuffix
                      ? `${phoneServerFormat(
                          sponsorProfile?.contactPhonePrefix,
                          sponsorProfile?.contactPhoneSuffix,
                          true
                        )}`
                      : ''
                  }
                >
                  {sponsorProfile?.contactPhonePrefix && sponsorProfile?.contactPhoneSuffix
                    ? `${phoneServerFormat(
                        sponsorProfile?.contactPhonePrefix,
                        sponsorProfile?.contactPhoneSuffix,
                        true
                      )}`
                    : ''}
                </Typography.Text>
              </Descriptions.Item>
            </DescriptionsStyled>
          )}
        </ContainerSponsorInfo>
      </Card>
    </SponsorProfileStyled>
  )
}

export default Profile
