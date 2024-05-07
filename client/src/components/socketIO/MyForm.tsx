import React, { useState } from "react";

import { socketIO as socket } from "@/socket";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setIsLoading(true);
    socket.timeout(5000).emit("create-something", value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-row gap-2 p-4">
      <input
        className="border border-black"
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        className="rounded bg-blue-300 p-4"
        type="submit"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  );
}
