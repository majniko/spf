export const clearTokenFromCookies = (): void => {
  if (document) document.cookie = 'token=placeholder' + ';' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;' + 'path=/'
}
