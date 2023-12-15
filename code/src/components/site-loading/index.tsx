type SiteLoadingProps = {
  width?: number
}

export default (({ width = 100 }) => {
  // return <Image className='center-box' width={width ?? 100} src={SiteLoading} alt='Loading...' priority />
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='center-box'
      style={{ margin: 'auto', background: 'none', width }}
      width='200'
      height='200'
      display='block'
      preserveAspectRatio='xMidYMid'
      viewBox='0 0 100 100'
    >
      <circle cx='84' cy='50' r='10' fill='rgba(222, 29, 67, 0.8)'>
        <animate
          attributeName='r'
          begin='0s'
          calcMode='spline'
          dur='0.3125s'
          keySplines='0 0.5 0.5 1'
          keyTimes='0;1'
          repeatCount='indefinite'
          values='10;0'
        ></animate>
        <animate
          attributeName='fill'
          begin='0s'
          calcMode='discrete'
          dur='1.25s'
          keyTimes='0;0.25;0.5;0.75;1'
          repeatCount='indefinite'
          values='rgba(222, 29, 67, 0.8);rgba(222, 29, 67, 0.5);rgba(222, 29, 67, 0.6);rgba(222, 29, 67, 0.7);rgba(222, 29, 67, 0.8)'
        ></animate>
      </circle>
      <circle cx='16' cy='50' r='10' fill='rgba(222, 29, 67, 0.8)'>
        <animate
          attributeName='r'
          begin='0s'
          calcMode='spline'
          dur='1.25s'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
          keyTimes='0;0.25;0.5;0.75;1'
          repeatCount='indefinite'
          values='0;0;10;10;10'
        ></animate>
        <animate
          attributeName='cx'
          begin='0s'
          calcMode='spline'
          dur='1.25s'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
          keyTimes='0;0.25;0.5;0.75;1'
          repeatCount='indefinite'
          values='16;16;16;50;84'
        ></animate>
      </circle>
      <circle cx='50' cy='50' r='10' fill='rgba(222, 29, 67, 0.7)'>
        <animate
          attributeName='r'
          begin='-0.3125s'
          calcMode='spline'
          dur='1.25s'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
          keyTimes='0;0.25;0.5;0.75;1'
          repeatCount='indefinite'
          values='0;0;10;10;10'
        ></animate>
        <animate
          attributeName='cx'
          begin='-0.3125s'
          calcMode='spline'
          dur='1.25s'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
          keyTimes='0;0.25;0.5;0.75;1'
          repeatCount='indefinite'
          values='16;16;16;50;84'
        ></animate>
      </circle>
      <circle cx='84' cy='50' r='10' fill='rgba(222, 29, 67, 0.6)'>
        <animate
          attributeName='r'
          begin='-0.625s'
          calcMode='spline'
          dur='1.25s'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
          keyTimes='0;0.25;0.5;0.75;1'
          repeatCount='indefinite'
          values='0;0;10;10;10'
        ></animate>
        <animate
          attributeName='cx'
          begin='-0.625s'
          calcMode='spline'
          dur='1.25s'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
          keyTimes='0;0.25;0.5;0.75;1'
          repeatCount='indefinite'
          values='16;16;16;50;84'
        ></animate>
      </circle>
      <circle cx='16' cy='50' r='10' fill='rgba(222, 29, 67, 0.5)'>
        <animate
          attributeName='r'
          begin='-0.9375s'
          calcMode='spline'
          dur='1.25s'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
          keyTimes='0;0.25;0.5;0.75;1'
          repeatCount='indefinite'
          values='0;0;10;10;10'
        ></animate>
        <animate
          attributeName='cx'
          begin='-0.9375s'
          calcMode='spline'
          dur='1.25s'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1'
          keyTimes='0;0.25;0.5;0.75;1'
          repeatCount='indefinite'
          values='16;16;16;50;84'
        ></animate>
      </circle>
    </svg>
  )
}) as React.FC<SiteLoadingProps>
