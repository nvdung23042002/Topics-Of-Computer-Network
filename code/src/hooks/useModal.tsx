import { useAppDispatch } from '@/hooks/store'
import { destroyModal, onModal, updateModal } from '@/redux/app/slice'
import { ModalPropsType } from '@/components/modal'

export default () => {
  const dispatch = useAppDispatch()

  const openModal: (param: ModalPropsType) => void = (param: ModalPropsType) => {
    dispatch(onModal(param))
  }
  const updateParams: (param: Partial<ModalPropsType>) => void = (param: Partial<ModalPropsType>) => {
    dispatch(updateModal(param))
  }
  const closeModal: () => void = () => {
    dispatch(destroyModal())
  }
  return { openModal, closeModal, updateParams }
}
