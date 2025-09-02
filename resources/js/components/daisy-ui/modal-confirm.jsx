import Modal from './modal'
import Button from './button'

export default function ModalConfirm({ onConfirm, modalState }) {
    const onClickConfirm = () => {
        onConfirm()
        modalState.toggle()
    }

    const onCancel = () => {
        modalState.setData(null)
        modalState.toggle()
    }

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={onCancel}
        >
            <div className="text-center text-content">
                <h3 className="mb-5  text-xl font-bold h-36 flex justify-center items-center">
                    ¿Estás seguro?
                </h3>
                <div className="flex justify-center gap-4">
                    <Button
                        type="error"
                        onClick={onClickConfirm}
                    >
                        Aceptar
                    </Button>
                    <Button
                        type="info"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
