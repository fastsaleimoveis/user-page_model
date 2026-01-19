import { useEffect } from 'react';

const ScriptInjector = ({ scriptContent }) => {
  useEffect(() => {
    if (!scriptContent) return;

    const container = document.createElement('div');
    container.innerHTML = scriptContent;
  
    // Armazene referências aos elementos adicionados
    const addedElements = [];

    Array.from(container.children).forEach((child) => {
      const clonedChild = child.cloneNode(true);
      document.head.appendChild(clonedChild);
      addedElements.push(clonedChild);
    });
  
    return () => {
      // Remove os elementos usando as referências armazenadas
      addedElements.forEach((element) => {
        if (element && element.parentNode === document.head) {
          try {
            document.head.removeChild(element);
          } catch (error) {
            // Ignora erros se o elemento já foi removido
            console.warn('Erro ao remover elemento do head:', error);
          }
        }
      });
    };
  }, [scriptContent]);
  

  return null;
};

export default ScriptInjector;