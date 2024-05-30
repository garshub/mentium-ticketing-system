import React from "react";
import { DateTimeProps } from "../types";

const DateFormatter: React.FC<DateTimeProps> = ({ dateTimeString }) => {
  const formattedDate = new Date(dateTimeString).toLocaleDateString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = new Date(dateTimeString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <span>
      {formattedDate} {formattedTime}
    </span>
  );
};

export default DateFormatter;
