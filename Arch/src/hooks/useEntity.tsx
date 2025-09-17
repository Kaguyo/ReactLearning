import type { ReactNode } from "react";
import React from "react";

interface UseEntityProps {
  joints: number;
  position: { x: number; y: number };
}

export function useEntity({ joints, position }: UseEntityProps) {
  const elements: ReactNode[] = [];

  for (let i = 0; i < joints; i++) {
    const isHead = i === 0;
    const isTail = i === joints - 1;

    const jointStyle: React.CSSProperties = isHead
      ? {
          width: '20px',
          height: '20px',
          backgroundColor: 'red',
          borderRadius: '50%',
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
        }
      : {
          width: '15px',
          height: '15px',
          backgroundColor: 'blue',
          borderRadius: '50%',
          position: 'relative',
        };

    elements.push(
      <div
        key={`joint-${i}`}
        id={isHead ? 'head' : isTail ? 'tail' : undefined}
        style={jointStyle}
      />
    );

    // Add connector except after the last joint
    if (i < joints - 1) {
      elements.push(
        <div
          key={`connector-${i}`}  
          style={{
            width: isHead ? '40px' : '30px',
            height: '20px',
            backgroundColor: 'transparent',
            display: 'inline-block',
          }}
        />
      );
    }
  }

  return <>{elements}</>;
}
