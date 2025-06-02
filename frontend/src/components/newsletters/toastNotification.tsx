import { Button } from "@tritonse/tse-constellation";
import React from "react";

import styles from "../newsletters/toastNotification.module.css";

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
      <Button
        className={styles.closeButton}
        leadingIcon="ic_close_large"
        onClick={onRequestClose}
      />
    </div>
  );
};

export default ToastNotification;
