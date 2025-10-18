import styles from "./toastNotification.module.css";

type ToastNotificationProps = {
  message: string;
  show: boolean;
  onUndo?: () => void;
  onRequestClose: () => void;
};

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  show,
  onUndo,
  onRequestClose,
}) => {
  if (!show) return null;

  return (
    <div className={styles.frame}>
      <span className={styles.message}>{message}</span>
      {onUndo && (
        <button
          className={styles.undoButton}
          onClick={() => {
            onUndo();
            onRequestClose();
          }}
        >
          Undo
        </button>
      )}
      <button className={styles.closeButton} onClick={onRequestClose}>
        <img src="/ic_close_large.svg" alt="Close" />
      </button>
    </div>
  );
};

export default ToastNotification;
