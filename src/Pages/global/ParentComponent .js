import React, { useState } from "react";
import TypeMusic from "../typeofmusic"; 

const ParentComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <TypeMusic
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    />
  );
};

export default ParentComponent;
