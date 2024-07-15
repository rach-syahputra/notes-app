import NotesAPi from '../data/remote/notes-api.js'
import Utils from '../Utils.js'

const home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer')
  const noteListElement = noteListContainerElement.querySelector('note-list')

  const noteDetailContainerElement = document.querySelector(
    '#noteDetailContainer'
  )
  const noteDetailElement =
    noteDetailContainerElement.querySelector('note-detail')

  const showNoteList = async () => {
    Utils.emptyElement(noteListElement)

    const notes = await NotesAPi.getNotes()
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item')

      noteItemElement.setAttribute('bgcolor', '#FAFAFA')
      noteItemElement.setAttribute('fontcolor', '#000000')
      noteItemElement.note = note

      noteItemElement.addEventListener('click', async () => {
        resetNoteItemAttributes()
        noteItemElement.setAttribute('bgcolor', '#E79B3D')
        noteItemElement.setAttribute('fontcolor', '#FFFFFF')

        const formAddNoteElement =
          noteDetailContainerElement.querySelector('form-add-note')

        if (formAddNoteElement) {
          formAddNoteElement.remove()
          const buttonAddNoteElement =
            noteDetailContainerElement.querySelector('button-add-note')
          Utils.showElement(noteDetailElement)
          Utils.showElement(buttonAddNoteElement)
        }

        const noteItemDetailElementExist =
          document.querySelector('note-item-detail')
        if (noteItemDetailElementExist) {
          noteItemDetailElementExist.remove()
        }

        const noteItemDetailElement = document.createElement('note-item-detail')
        noteItemDetailElement.setAttribute('titlecolor', '#E79B3D')
        noteItemDetailElement.setAttribute('bodycolor', '#000000')
        noteItemDetailElement.setAttribute('datecolor', '#A0A6A5')

        const noteData = await NotesAPi.getSingleNote(note.id)
        noteItemDetailElement.note = noteData
        noteDetailElement.append(noteItemDetailElement)

        const noNotesSelectedElement =
          noteDetailContainerElement.querySelector('no-notes-selected')
        Utils.hideElement(noNotesSelectedElement)
      })

      return noteItemElement
    })
    noteListElement.append(...noteItemElements)
  }

  const resetNoteItemAttributes = () => {
    const noteItemElements = noteListElement.querySelectorAll('note-item')
    noteItemElements.forEach((noteItemElement) => {
      noteItemElement.setAttribute('bgcolor', '#FAFAFA')
      noteItemElement.setAttribute('fontcolor', '#000000')
    })
  }

  const showFormAddNote = () => {
    const buttonAddNoteElement =
      noteDetailContainerElement.querySelector('button-add-note')

    Utils.hideElement(noteDetailElement)
    Utils.hideElement(buttonAddNoteElement)

    const formAddNoteElement = document.createElement('form-add-note')
    formAddNoteElement.addEventListener('noteAdded', onAddNoteHandler)
    formAddNoteElement.addEventListener(
      'addNoteCanceled',
      onCancelAddNoteHandler
    )
    noteDetailContainerElement.appendChild(formAddNoteElement)
  }

  const onAddNoteHandler = async (event) => {
    const note = event.detail
    await NotesAPi.createNote(note)
    showNoteList()
  }

  const onCancelAddNoteHandler = () => {
    const formAddNoteElement =
      noteDetailContainerElement.querySelector('form-add-note')

    if (formAddNoteElement) {
      formAddNoteElement.remove()

      const noteDetailElement =
        noteDetailContainerElement.querySelector('note-detail')
      const buttonAddNoteElement =
        noteDetailContainerElement.querySelector('button-add-note')

      Utils.showElement(noteDetailElement)
      Utils.showElement(buttonAddNoteElement)
    }
  }

  const buttonAddNoteElement =
    noteDetailContainerElement.querySelector('button-add-note')
  buttonAddNoteElement.setAttribute('src', 'plus.png')
  buttonAddNoteElement.addEventListener('click', () => {
    showFormAddNote()
  })

  showNoteList()
}

export default home
