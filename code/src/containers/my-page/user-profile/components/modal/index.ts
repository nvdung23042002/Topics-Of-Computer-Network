export type ModalRef = {
  visible: (id?: string | number) => void
  hidden: () => void
  setLoading: (isLoading: boolean) => void
  clearForm: () => void
  setData: (value: any) => void
}

export type ModalVerifyRef = {
  visible: (id?: string | number) => void
  hidden: () => void
  setLoading: (isLoading: boolean) => void
  clearForm: () => void
  setData: (value: any) => void
  setLoadingResendButton: (isLoading: boolean) => void
  setTimeResendCode: () => void
}
