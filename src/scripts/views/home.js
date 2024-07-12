import Notes from '../data/notesData.js'

const home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer')
  const noteDetailContainerElement = document.querySelector('#noteDetailContainer')
  const noteListElement = noteListContainerElement.querySelector('note-list')

  const showNoteList = () => {
    const result = Notes.getAll()
    const noteItemElements =  result.map((note) => {
      const noteItemElement = document.createElement('note-item')
      
      noteItemElement.note = note

      noteItemElement.addEventListener('click', () => {
        const noteItemDetailElement = document.querySelector('note-item-detail')
        noteItemDetailElement.note = note
        console.log(noteItemDetailElement.note)
      })

      return noteItemElement
    })
    noteListElement.append(...noteItemElements)
  }

  const onClickNoteItem = () => {

  }

  const showNoteDetail = () => {
    const result = Notes.getAll()
    const noteItemElements =  result.map((note) => {
      const noteItemElement = document.createElement('note-item')
      noteItemElement.note = note

      return noteItemElement
    })

    noteDetailElement.append(...noteItemElements)
  }

  showNoteList()
}

export default home