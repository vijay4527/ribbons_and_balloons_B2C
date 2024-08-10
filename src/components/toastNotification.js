"use client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useEffect,useState } from "react";
const ToastNotification = ({ message, type, duration = 3000 }) => {
  const [toastMessage, setToastMessage] = useState(message);
  const notify = () =>
    toast(
      (t) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{toastMessage}</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              setToastMessage("");
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <i className="fa fa-x" style={{ height: "10px !important" }} />
          </button>
        </div>
      ),
      {
        duration: 3000,
        style: {
          marginRight: "20px",
        },
        icon: "✅",
        position: "top-right",
        progressBar: {
          style: {
            height: "4px",
            backgroundColor: "#4caf50",
          },
        },
      }
    );

  React.useEffect(() => {
    if (message) {
      notify();
    }
  }, [toastMessage, type]);

  return <Toaster position="top-right" reverseOrder={false} />;
};

export default ToastNotification;
