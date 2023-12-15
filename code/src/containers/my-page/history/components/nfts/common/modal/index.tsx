export type ModalRef = {
  visible: (id?: string | number) => void
  hidden: () => void
  setLoadingForm: (isLoading: boolean) => void
  clearForm: () => void
  setData?: (data: any) => void
}
