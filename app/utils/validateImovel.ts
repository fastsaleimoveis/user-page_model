/**
 * Valida se um imóvel tem os dados mínimos necessários para exibir um card
 * @param imovel - Objeto do imóvel a ser validado
 * @returns true se o imóvel é válido (tem pelo menos 1 foto, título e slug)
 */
export function isValidImovel(imovel: any): boolean {
  if (!imovel) {
    return false;
  }

  // Verificar se tem pelo menos 1 foto
  const hasPhoto = imovel.photos && 
                   Array.isArray(imovel.photos) && 
                   imovel.photos.length > 0;

  // Verificar se tem título
  const hasTitle = imovel.title && 
                   typeof imovel.title === 'string' && 
                   imovel.title.trim().length > 0;

  // Verificar se tem slug
  const hasSlug = imovel.slug && 
                  typeof imovel.slug === 'string' && 
                  imovel.slug.trim().length > 0;

  return hasPhoto && hasTitle && hasSlug;
}

