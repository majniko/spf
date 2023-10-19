export const validateUsername = (username: string): boolean => {
  //minimum six characters, maximum twenty characters, only underscore and dot are allowed, no consecutive underscore or dot, no underscore or dot at the beginning or end
  const usernameRegex = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  return usernameRegex.test(username)
}
