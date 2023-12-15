export type TypePagination = {
  current: number
  pageSize: number
  total: number
}

export type OptionType = {
  label: string
  value: any
}

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
}
