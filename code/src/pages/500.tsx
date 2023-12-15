import withLoading from '@/hoc/withLoading'
import { Result } from 'antd'
import Head from 'next/head'
import styled from 'styled-components'
const ResultStyled = styled(Result)`
  .ant-result-title {
    font-size: 50px;
    @media screen and (max-width: 775px) {
      font-size: 40px;
    }
    @media screen and (max-width: 570px) {
      font-size: 30px;
    }
  }
`

export default withLoading(() => {
  return (
    <>
      <Head>
        <title>Something went wrong</title>
      </Head>
      <ResultStyled
        className='center-box'
        status='500'
        title='Something went wrong'
        subTitle='Please try again later.'
      />
    </>
  )
})
