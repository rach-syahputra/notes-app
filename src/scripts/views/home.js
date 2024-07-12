import Notes from '../data/notesData.js'

const home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer')
  const noteListElement = noteListContainerElement.querySelector('note-list')

  const showNoteList = () => {
    const result = Notes.getAll()
    const noteItemElements =  result.map((note) => {
      const noteItemElement = document.createElement('note-item')
      noteItemElement.note = note

      return noteItemElement
    })

    noteListElement.append(...noteItemElements)
  }

  showNoteList()
}

export default home