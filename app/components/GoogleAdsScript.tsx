'use client';

import { useEffect } from 'react';

interface GoogleAdsScriptProps {
  gtagId: string;
}

export function GoogleAdsScript({ gtagId }: GoogleAdsScriptProps) {
  useEffect(() => {
    // Verificar se já existe para evitar duplicação
    const existingLoader = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gtagId}"]`);
    const existingConfig = document.querySelector(`script[id="google-ads-config-${gtagId}"]`);
    
    if (existingLoader && existingConfig) {
      return;
    }

    // Criar e adicionar o script de carregamento
    if (!existingLoader) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
      script1.id = `google-ads-loader-${gtagId}`;
      // Inserir no início do head para garantir carregamento precoce
      document.head.insertBefore(script1, document.head.firstChild);
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
      if (loader && loader.nextSibling) {
        document.head.insertBefore(script2, loader.nextSibling);
      } else {
        document.head.appendChild(script2);
      }
    }
  }, [gtagId]);

  return null;
}

