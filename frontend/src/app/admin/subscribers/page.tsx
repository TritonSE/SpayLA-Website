"use client";

import { useEffect, useState } from "react";

import styles from "./page.module.css";

import { getSubscribers } from "@/api/subscribers";

type Subscriber = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
};

// const subscriberList: Subscriber[] = Array.from({ length: 20 }, (_, i) => ({
//   name: "Irene Joo",
//   email: "irenejoo@ucsd.edu",
//   date: "4/9/2025",
//   id: i,
// }));

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [undoCache, setUndoCache] = useState<Subscriber[]>([]);
  const [toast, setToast] = useState<React.ReactNode>("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      setIsLoading(true);
      const result = await getSubscribers();
      if (result.success) {
        setSubscribers(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    };
    void fetchSubscribers();
  }, []);
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
    const toDelete = subscribers.filter((s) => selected.has(s._id));
    const remaining = subscribers.filter((s) => !selected.has(s._id));
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

  const toggleSelect = (id: string) => {
    const updated = new Set(selected);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelected(updated);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>Loading subscribers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.errorText}>Error: {error}</p>
      </div>
    );
  }

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
              <tr key={sub._id}>
                <td>{sub.name}</td>
                <td>{sub.email}</td>
                <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.has(sub._id)}
                    onChange={() => {
                      toggleSelect(sub._id);
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
