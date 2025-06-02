import { Button } from "@tritonse/tse-constellation";

import styles from "./modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
};

export default function Modal({ isOpen, onClose, imageUrl }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <Button className={styles.close} leadingIcon="ic_close_large" onClick={onClose}></Button>
        </div>
        <img src={imageUrl} alt="Preview" className={styles.previewImage} />
      </div>
    </div>
  );
}
