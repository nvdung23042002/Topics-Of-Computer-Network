export interface RegisterType {
  address: string
  companyName: string
  contactEmail: string
  contactName: string
  contactPhone: string
  email: string
  homepageUrl: string
  logo: string
  password: string
  phone: string
  postCode: string
  userName: string
}

export interface LoginType {
  email: string
  password: string
}

export interface Cart<T> {
  list: T[]
  total: number
}
export interface CartItem {
  id: number | string
  sponsorshipName: string
  typeSponsor: string
  optionSponsor: string
  date: string
  sponsorAmount: number
  dirty?: boolean
}

export interface SponsorTournament {
  tournamentId: number
  tournamentName: string
  sponsorMatchs: any
  tournamentImageUrl: string
  startDatetime: string
  endDatetime: string
  optionSponsorTournament: string
  content: string
  date: string
  listSponsor: ListSponsor[]
}

export interface SponsorTournamentMatch<Match> {
  tournamentId: number
  tournamentName: string
  sponsorMatchs: Match[]
}

export interface SponsorMatch {
  matchId: number
  matchName: string
  matchImageUrl: string
  fighterId1: number
  fighterKanjiName1: string
  fighterAvatar1: string
  fighterId2: number
  fighterKanjiName2: string
  fighterAvatar2: string
  startDatetime: string
  endDatetime: string
  optionSponsorMatch: string
  content: string
  date: string
  listSponsor: ListSponsor[]
}
export interface ListSponsor {
  sponsorId: number
  logoSponsor?: string
}

export interface SponsorTransaction {
  matchId?: number | string
  optionSponsor: 'SINGLE_SPONSOR' | 'MULTI_SPONSOR'
  sponsorAmount: number
  tournamentId?: number | string
  typeSponsor: 'MATCH' | 'TOURNAMENT'
}

export interface PagingResult<T> {
  limit: number
  page: number
  records: T[]
  total: number
  totalPage: number
}
export interface Transaction {
  id: number
  typeSponsor: string
  sponsorshipName: any
  sponsorAmount: number
  statusPayment: string
  createdAt: string
}

export interface History {
  id: number
  typeSponsor: string
  sponsorshipName: any
  sponsorAmount: number
  typePayment: string
  statusPayment: string
  memo: any
  createdAt: string
}

export interface PaymentPayload {
  sponsorships: Sponsorship[]
  totalAmount: number
  typePayment: string
}

export interface Sponsorship {
  createdAt: string
  id: number
  sponsorAmount: number
  sponsorshipName: string
  statusPayment: string
  typeSponsor: string
}

export interface SponsorDetail {
  id: number
  title: string
  image: string
  icon: string
  logoName: string
  phonePrefixHomePage: any
  phoneSuffixHomePage: any
  email: string
  content: string
  homepageUrl: string
  appQrIos: string
  appQrAndroid: string
  status: string
  template: string
}
