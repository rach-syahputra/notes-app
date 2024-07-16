const BASE_URL = 'https://notes-api.dicoding.dev/v2'

class NotesAPi {
  static async getUnarchivedNotes() {
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

  static async getArchivedNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`)

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

  static async getSingleNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`)

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

  static async createNote(note) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(note),
      })

      if (!response.status >= 200 && response.status < 300) {
        throw new Error('Add note failed')
      }

      const responseJson = await response.json()
      const { data } = responseJson

      return data
    } catch (error) {
      console.error(error)
    }
  }

  static async archiveNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      })

      if (!response.status >= 200 && response.status < 300) {
        throw new Error('Archive note failed')
      }

      const responseJson = await response.json()

      return responseJson
    } catch (error) {
      console.error(error)
    }
  }

  static async unarchiveNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      })

      if (!response.status >= 200 && response.status < 300) {
        throw new Error('Unarchive note failed')
      }

      const responseJson = await response.json()

      return responseJson
    } catch (error) {
      console.error(error)
    }
  }

  static async removeNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })

      if (!response.status >= 200 && response.status < 300) {
        throw new Error('Remove note failed')
      }

      const responseJson = await response.json()

      return responseJson
    } catch (error) {
      console.error(error)
    }
  }
}

export default NotesAPi
