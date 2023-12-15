import NavButton from '@/components/common/nav-button'
import withLoading from '@/hoc/withLoading'
import Image from 'next/image'
import ComingSoon from '@/assets/images/coming-soon.png'
import Logo from '@/components/logo'
import Head from 'next/head'

export default withLoading(() => {
  return (
    <>
      <Head>
        <title>Page coming soon</title>
      </Head>
      <div className='center-box text-center'>
        <Logo style={{ transform: 'scale(1.5)', marginBottom: 60 }} />
        <Image src={ComingSoon} alt='coming-soon' priority style={{ width: '60vw', height: 'auto' }} />
        <NavButton type='primary' style={{ marginTop: 60 }} onClick={() => (window.location.href = '/')}>
          ホームページ
        </NavButton>
      </div>
    </>
  )
})
