const bcrypt = require('bcryptjs')

export const comparePwdWithHash = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}
