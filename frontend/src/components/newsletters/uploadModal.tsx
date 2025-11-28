"use client";

import { Button } from "@tritonse/tse-constellation";
import { useRef, useState } from "react";

import styles from "./modal.module.css";

type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dateIso: string, file: File | null) => Promise<void>;
  disabled?: boolean;
};

export default function UploadModal({ isOpen, onClose, onSubmit, disabled }: UploadModalProps) {
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [localUploading, setLocalUploading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0] ?? null;
    if (!file) return;

    setLocalUploading(true);
    try {
      await onSubmit(new Date(date).toISOString(), file);
      onClose();
    } finally {
      setLocalUploading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} style={{ padding: 24, minWidth: 360 }}>
        <div className={styles.modalHeader}>
          <h3 style={{ color: "#fff", marginLeft: 8 }}>Upload Newsletter</h3>
          <Button className={styles.close} leadingIcon="ic_close_large" onClick={onClose} />
        </div>

        <div style={{ width: "100%", padding: "12px 24px", color: "#fff" }}>
          <label style={{ display: "block", marginBottom: 8 }}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4 }}
          />

          <div style={{ height: 16 }} />

          <label style={{ display: "block", marginBottom: 8 }}>File</label>
          <input ref={fileInputRef} type="file" accept=".pdf,image/*" />

          <div style={{ height: 20 }} />

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button onClick={onClose} leadingIcon="ic_close_large">
              Cancel
            </Button>
            <Button
              onClick={() => void handleUpload()}
              disabled={disabled || localUploading}
              leadingIcon="ic_upload"
            >
              {localUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
