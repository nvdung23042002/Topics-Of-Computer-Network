export const AppRoutes = {
  betList: '/bet',
  betListFn: (
    activeTab: number | string,
    activeCartTab: number | string,
    activeTabList: number | string,
    activeCartList: number | string
  ) =>
    `/bet?activeTab=${activeTab}&activeCartTab=${activeCartTab}&activeTabList=${activeTabList}&activeCartList=${activeCartList}`,
  betDetail: (matchId: number) => `/bet/${matchId}`,
  betDetailGlobal: (matchId: number, methodBet: number) => `/bet/${matchId}?methodBet=${methodBet}`,
  fighters: '/bet/fighters',
  fightersDetail: (fighterId: number) => `/bet/fighters/${fighterId}`,
  news: '/news',
  newsDetail: (newsId: number) => `/news/${newsId}`,
  marketplace: '/market-place',
  shop: '/shop-online',
  myPage: '/my-page/user-profile',
  sponsor: '/sponsor',
  sponsorLogin: '/sponsor/login',
  sponsorRegister: '/sponsor/register',
  sponsorResetPassword: '/sponsor/reset-password',
  sponsorProfile: '/sponsor/my-sponsor/profile',
  sponsorHistory: '/sponsor/my-sponsor/transaction-history',
  sponsorTemplate: '/sponsor/my-sponsor/template',
  sponsorForgotPassword: '/sponsor/forgot-password',
  resetPassword: '/reset-pass',
  about: '/#about',
  faq: '/#faq',
  contact: '/#contact',
  home: '/',
  editSponsorProfile: '/sponsor/my-sponsor/edit-profile',
  editUserProfile: '/my-page/user-profile/edit',
  enterCodeAffiliate: '/my-page/affiliate/enter-code',
  successEnterCodeAffiliate: '/my-page/affiliate/success-enter-code',
  affiliateHistory: '/my-page/affiliate',
  withDrawal: '/my-page/withdrawal',
  ticketPurchase: '/my-page/buy-ticket',
  tradingHistory: '/my-page/history',
  orderHistory: (tabActive: number | string) => `/my-page/history?tabActive=${tabActive}`,
  guide: (tabActive?: number | string) => `/guide?tabActive=${tabActive ?? 'bets'}`,
  marketPlaceDetail: (id: string) => `/market-place/detail/${id}`,
  404: '/404'
}
