import React from "react";

export function ScrollArea({ children, className }: any) {
  return (
    <div className={`overflow-y-scroll ${className}`} style={{ scrollbarWidth: "thin" }}>
      {children}
    </div>
  );
}
