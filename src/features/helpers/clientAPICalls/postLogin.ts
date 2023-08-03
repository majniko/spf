export type postLoginProps = {
  username: string
  password: string
}

export const postLogin = async ({ username, password }: postLoginProps) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    return await response.json()
  } catch (error) {
    return { error: 'network_error' }
  }
}
