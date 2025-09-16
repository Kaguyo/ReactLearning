import Entity from '../components/Entity';

interface UseEntityProps {
  joints: number;
  position: { x: number; y: number };
}

export function useEntity({ joints, position }: UseEntityProps) {
   
  for (let i = 0; i < joints; i++) {
    const joint = document.createElement('div');
    if (i === 0) {
        joint.id = 'head';
    }

    if (joint.id === 'head') {
        joint.style.width = '20px';
        joint.style.height = '20px';
        joint.style.backgroundColor = 'red';
        joint.style.borderRadius = '50%';
        joint.style.left = `${position.x}px`;
        joint.style.top = `${position.y}px`;
    } else {
        joint.style.width = '15px';
        joint.style.height = '15px';
        joint.style.backgroundColor = 'blue';
        joint.style.borderRadius = '50%';
    }

    
  }

  const entity = 

  return <div/>;
}
