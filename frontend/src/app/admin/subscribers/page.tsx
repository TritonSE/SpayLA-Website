"use client";

import { useState } from "react";

import styles from "./page.module.css";

type Subscriber = {
  name: string;
  email: string;
  date: string;
  id: number;
};

const subscriberList: Subscriber[] = Array.from({ length: 20 }, (_, i) => ({
  name: "Irene Joo",
  email: "irenejoo@ucsd.edu",
  date: "4/9/2025",
  id: i,
}));

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState(subscriberList);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [undoCache, setUndoCache] = useState<Subscriber[]>([]);
  const [toast, setToast] = useState<React.ReactNode>("");

  const copyEmails = async () => {
    const emails = subscribers.map((s) => s.email).join(", ");
    await navigator.clipboard.writeText(emails);
    setToast("Emails copied successfully.");
    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const undoDelete = () => {
    setSubscribers((prev) => [...prev, ...undoCache]);
    setUndoCache([]);
    setToast("");
  };

  const deleteSubscribers = () => {
    const toDelete = subscribers.filter((s) => selected.has(s.id));
    const remaining = subscribers.filter((s) => !selected.has(s.id));
    setUndoCache(toDelete);
    setSubscribers(remaining);
    setSelected(new Set());
    setToast(
      <>
        Subscriber deleted successfully.
        <button onClick={undoDelete} className={styles.undoButton}>
          Undo
        </button>
      </>,
    );
  };

  const toggleSelect = (id: number) => {
    const updated = new Set(selected);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelected(updated);
  };

  return (
    <div className={styles.outer}>
      {toast && (
        <div className={styles.toast}>
          {toast}
          <button
            onClick={() => {
              setToast("");
            }}
            className={styles.toastClose}
          >
            <img src="/close.svg" alt="Close" />
          </button>
        </div>
      )}
      <div className={styles.container}>
        <h1 className={styles.header}>Current Subscribers</h1>
        <div className={styles.emailFunctions}>
          <button
            onClick={() => {
              void copyEmails();
            }}
            className={styles.copyEmails}
          >
            {" "}
            <span>
              <img src={"/copy.svg"} alt="Copy Icon" className={styles.icon} />
            </span>
            <span>Copy All Emails</span>
          </button>
          <button onClick={deleteSubscribers} className={styles.deleteSubscribers}>
            <img src="/trash.svg" alt="Trash Icon" className={styles.icon} />
          </button>
        </div>
        <table className={styles.subscribersTable}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date Subscribed</th>
              <th scope="col">Select </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.name}</td>
                <td>{sub.email}</td>
                <td>{sub.date}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.has(sub.id)}
                    onChange={() => {
                      toggleSelect(sub.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
