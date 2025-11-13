"use client";

import { useEffect, useState } from "react";

import styles from "./page.module.css";

import { deleteSubscribers, getSubscribers } from "@/api/subscribers";

type Subscriber = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  // const [undoCache, setUndoCache] = useState<Subscriber[]>([]);
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

  // const undoDelete = () => {
  //   setSubscribers((prev) => [...prev, ...undoCache]);
  //   setUndoCache([]);
  //   setToast("");
  // };

  const handleDelete = async () => {
    const idsToDelete = Array.from(selected);
    if (idsToDelete.length === 0) {
      setToast("Please select subscribers to delete.");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    const result = await deleteSubscribers(idsToDelete);

    if (result.success) {
      setSubscribers((currentSubscribers) =>
        currentSubscribers.filter((sub) => !selected.has(sub._id)),
      );
      setSelected(new Set());
      setToast(result.data.message);
    } else {
      setToast(result.error);
    }
    setTimeout(() => setToast(""), 5000);
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
          <button
            onClick={() => {
              void handleDelete();
            }}
            className={styles.deleteSubscribers}
          >
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
