import Notes from '../data/notesData.js'
import Utils from '../Utils.js'

const home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer')
  const noteListElement = noteListContainerElement.querySelector('note-list')

  const noteDetailContainerElement = document.querySelector('#noteDetailContainer')
  const noteDetailElement = noteDetailContainerElement.querySelector('#noteDetail')
  const noNotesSelectedElement = noteDetailContainerElement.querySelector('no-notes-selected')
  const buttonAddNoteElement = noteDetailContainerElement.querySelector('button-add-note')

  const showNoteList = () => {
    const result = Notes.getAll()
    const noteItemElements =  result.map((note) => {
      const noteItemElement = document.createElement('note-item')
      
      noteItemElement.note = note

      noteItemElement.addEventListener('click', () => {
        const formAddNoteElement = noteDetailContainerElement.querySelector('form-add-note')

        if (formAddNoteElement) {
          formAddNoteElement.remove()

          isFormAddNote = false

          Utils.showElement(noteDetailElement, 'flex')
        }

        const noteItemDetailElement = document.querySelector('note-item-detail')
        noteItemDetailElement.note = note
        Utils.hideElement(noNotesSelectedElement)
      })

      return noteItemElement
    })
    noteListElement.append(...noteItemElements)
  }

  const showFormAddNote = () => {
    Utils.hideElement(noteDetailElement)
    Utils.hideElement(buttonAddNoteElement)

    const formAddNoteElement = document.createElement('form-add-note')
    noteDetailContainerElement.appendChild(formAddNoteElement)
  }

  buttonAddNoteElement.addEventListener('click', () => {
    showFormAddNote()
  }) 

  showNoteList()
}

export default home