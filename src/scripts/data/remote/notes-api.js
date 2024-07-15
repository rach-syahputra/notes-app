const BASE_URL = 'https://notes-api.dicoding.dev/v2'

class NotesAPi {
  static async getNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`)

      if (!response.status >= 200 && response.status < 300) {
        throw new Error('Something went wrong')
      }

      const responseJson = await response.json()
      const { data } = responseJson

      return data
    } catch (error) {
      console.error(error)
    }
  }
}

export default NotesAPi
