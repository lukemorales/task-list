import "./style.scss"

type ModalProps = {
  children: React.ReactNode
  onClose?: () => void
}

const Modal = ({ children, onClose }: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose()
    }
  }

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">{children}</div>
    </div>
  )
}

export default Modal
