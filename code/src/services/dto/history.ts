export interface ResponsePagination {
  limit: number
  page: number
  pages: number
  total: number
}
export interface ProductHistoryResponse extends ResponsePagination {
  result: ProductHistory[]
}
export interface ProductHistory {
  buying: boolean
  canOfferFlag: boolean
  categoryId: number
  categoryName: string
  childIndex: number
  childPrice: number
  countChild: number
  countView: number
  createdAt: number
  creatorName: string
  currency: string
  currentTime: number
  description: string
  displayStatus: string
  holding: boolean
  id: number
  imageUrl: string
  isUserWished: boolean
  licenseAddress: string
  licenseFee: number
  licenseId: number
  name: string
  newAuctionFlag: boolean
  offerHighestPrice: number
  offerHighestPriceCurrency: string
  offerHighestYenPrice: number
  offerNftTransactionHash: string
  offerNftTransactionStatus: string
  parentProductId: number
  parentProductInfo: ParentProductInfo
  point: number
  price: number
  productAttributes: ProductAttribute[]
  productBid: ProductBid
  rareType: string
  remainingChildProductNumber: number
  remainingChildProductNumberCanPurchase: number
  reselling: boolean
  status: string
  title: string
  tokenId: number
  tokenStandard: string
  tokenType: string
  typeSale: string
  userId: number
  volume: number
  wishCount: number
  yenChildPrice: number
  yenPrice: number
  yenVolume: number
}

export interface ParentProductInfo {
  countChild: number
  imageUrl: string
  name: string
  remainingChildProductNumber: number
  remainingChildProductNumberCanPurchase: number
}

export interface ProductAttribute {
  categoryId: number
  categoryName: string
  createAt: number
  id: number
  name: string
  originalFlg: boolean
  priority: number
  productAttributesMultiLang: ProductAttributesMultiLang[]
  type: string
  value: string
}

export interface ProductAttributesMultiLang {
  langKey: string
  name: string
}

export interface ProductBid {
  bidId: number
  biggestBidPrice: number
  biggestBidPriceYen: number
  endTime: number
  expectPrice: number
  startPrice: number
  startPriceYen: number
  startTime: number
  status: string
  yenExpectPrice: number
}
export interface ProductAuction {
  id: number
  userId: number
  title: string
  name: string
  imageUrl: string
  price: number
  status: string
  productAttributes: any[]
  currentTime: string
  currency: string
  yenPrice: number
  displayStatus: string
  createdAt: string
  rareType: string
  description: any
  productBid: any
  newAuctionFlag: boolean
  typeSale: string
  parentProductId: any
  childIndex: any
  tokenType: string
  canOfferFlag: boolean
  offerNftTransactionHash: any
  offerNftTransactionStatus: string
  tokenId: number
  childPrice: any
  yenChildPrice: any
  categoryId: number
  categoryName: string
  tokenStandard: string
  subProductYenPrice: number
  auctionId: number
  productBidId: number
  bidPrice: number
  bidHistoryStatus: string
  bidAt: string
  fireStoreId: string
  approveStatus: string
  bidYenPrice: number
  countView: number
  wishCount: number
  isUserWished: boolean
  holding: boolean
  reselling: boolean
}

export interface ProductWish {
  buying: boolean
  canOfferFlag: boolean
  categoryId: number
  categoryName: string
  childIndex: number
  childPrice: number
  countChild: number
  countView: number
  createdAt: number
  creatorName: string
  currency: string
  currentTime: number
  description: string
  displayStatus: string
  holding: boolean
  id: number
  imageUrl: string
  isUserWished: boolean
  licenseAddress: string
  licenseFee: number
  licenseId: number
  name: string
  newAuctionFlag: boolean
  offerHighestPrice: number
  offerHighestPriceCurrency: string
  offerHighestYenPrice: number
  offerNftTransactionHash: string
  offerNftTransactionStatus: string
  parentProductId: number
  parentProductInfo: ParentProductInfo
  point: number
  price: number
  productAttributes: ProductAttribute[]
  productBid: ProductBid
  rareType: string
  remainingChildProductNumber: number
  remainingChildProductNumberCanPurchase: number
  reselling: boolean
  status: string
  title: string
  tokenId: number
  tokenStandard: string
  tokenType: string
  typeSale: string
  userId: number
  volume: number
  wishCount: number
  yenChildPrice: number
  yenPrice: number
  yenVolume: number
}
export interface IBetResult {
  betUserId: number
  commonId: number
  matchId: number
  odds: number
  ticketQuantity: number
  chosenOne: string
  fighterId: number
  firstFighterName: string
  secondFighterName: string
  startDate: string
  typeBet: string
  voteId: string
  betStatus: string
  betDateTime: string
  typeBetPlay: string
  matchName: string
  expectedAmount: number
  optionBet: string
  status: string
  freeBet: string
  oddsExpected: number
  actualAmount: number
}
