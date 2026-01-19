'use client';

import { useEffect } from 'react';

interface GoogleAdsScriptProps {
  gtagId: string;
}

export function GoogleAdsScript({ gtagId }: GoogleAdsScriptProps) {
  useEffect(() => {
    if (!gtagId) return;

    // Verificar se já existe para evitar duplicação
    const existingLoader = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gtagId}"]`);
    const existingConfig = document.querySelector(`script[id="google-ads-config-${gtagId}"]`);
    
    if (existingLoader && existingConfig) {
      return;
    }

    const addedScripts: HTMLScriptElement[] = [];

    // Criar e adicionar o script de carregamento
    if (!existingLoader) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
      script1.id = `google-ads-loader-${gtagId}`;
      // Inserir no início do head para garantir carregamento precoce
      try {
        document.head.insertBefore(script1, document.head.firstChild);
        addedScripts.push(script1);
      } catch (error) {
        console.warn('Erro ao adicionar script do Google Ads:', error);
      }
    }

    // Criar e adicionar o script de configuração
    if (!existingConfig) {
      const script2 = document.createElement('script');
      script2.id = `google-ads-config-${gtagId}`;
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtagId}');
      `;
      // Inserir após o script de carregamento
      const loader = document.getElementById(`google-ads-loader-${gtagId}`);
      try {
        if (loader && loader.nextSibling) {
          document.head.insertBefore(script2, loader.nextSibling);
        } else {
          document.head.appendChild(script2);
        }
        addedScripts.push(script2);
      } catch (error) {
        console.warn('Erro ao adicionar script de configuração do Google Ads:', error);
      }
    }

    return () => {
      // Cleanup: remover scripts adicionados
      addedScripts.forEach((script) => {
        if (script && script.parentNode === document.head) {
          try {
            document.head.removeChild(script);
          } catch (error) {
            // Ignora erros se o elemento já foi removido
            console.warn('Erro ao remover script do Google Ads:', error);
          }
        }
      });
    };
  }, [gtagId]);

  return null;
}

