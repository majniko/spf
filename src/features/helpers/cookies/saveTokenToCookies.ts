export const saveTokenToCookies = (token: string): void => {
  const today: Date = new Date()
  today.setDate(today.getUTCDate() + 30)
  document.cookie = 'token=' + token + ';' + 'expires=' + today.toUTCString() + ';' + 'path=/'
}
