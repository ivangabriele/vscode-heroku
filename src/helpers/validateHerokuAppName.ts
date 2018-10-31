export default function validateHerokuAppName(message: string | null | undefined): boolean {
  return  message !== undefined &&
          message !== null &&
          message.trim() !== '' &&
          /^[a-z0-9\-]{3,}$/.test(message)
}
