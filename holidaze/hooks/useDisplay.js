import { useState } from "react";

export function useDisplay() {
  const [display, setDisplay] = useState(false);

  const toggleDisplay = () => {
    if (display) {
      setDisplay(false);
    }

    if (display === false) {
      setDisplay(true);
    }
  };

  return [display, toggleDisplay];
}

//something is not okay with this one mabye
