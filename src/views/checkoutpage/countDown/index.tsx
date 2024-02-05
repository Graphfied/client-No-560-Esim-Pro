"use client";
import { useState, useEffect } from "react";

export default function CountDown({
  onCountdownEnd,
}: {
  onCountdownEnd: () => void;
}) {
  const [countdown, setCountdown] = useState(15); // 15 minutes
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => Math.max(0, prevCountdown - 1));

      if (countdown === 0 && isMounted) {
        clearInterval(interval); // Stop the interval
        onCountdownEnd(); // Call the callback function when countdown reaches 0
      }
    }, 60 * 1000); // Update every minute

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [countdown, isMounted, onCountdownEnd]);

  if (!isMounted) {
    return null;
  }

  return <span className="inline">{countdown}</span>;
}
