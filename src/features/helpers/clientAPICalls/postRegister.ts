export type postRegisterProps = {
  username: string
  email: string
  password: string
}

export const postRegister = async ({ username, email, password }: postRegisterProps) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
    return await response.json()
  } catch (error) {
    return { error: 'network_error' }
  }
}
