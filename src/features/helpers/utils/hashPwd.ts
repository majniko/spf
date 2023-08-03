const bcrypt = require('bcryptjs')

export const hashPwd = (password: string): string => {
  const salt: string = bcrypt.genSaltSync(10)

  return bcrypt.hashSync(password, salt)
}
