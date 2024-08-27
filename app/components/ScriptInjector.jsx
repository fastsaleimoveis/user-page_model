import { useEffect } from 'react';

const ScriptInjector = ({ scriptContent }) => {
  useEffect(() => {
    const container = document.createElement('div');
    container.innerHTML = scriptContent;
  
    Array.from(container.children).forEach((child) => {
      document.head.appendChild(child.cloneNode(true));
    });
  
    return () => {
      Array.from(container.children).forEach((child) => {
        // Verifica se o nó pai é document.head antes de tentar removê-lo
        if (child.parentNode === document.head) {
          document.head.removeChild(child);
        }
      });
    };
  }, [scriptContent]);
  

  return null;
};

export default ScriptInjector;