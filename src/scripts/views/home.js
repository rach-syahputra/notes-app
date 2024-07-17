import NotesAPi from '../data/remote/notes-api.js'
import Utils from '../Utils.js'
import Swal from 'sweetalert2'

const home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer')
  const noteDetailContainerElement = document.querySelector(
    '#noteDetailContainer'
  )
  const noteDetailElement =
    noteDetailContainerElement.querySelector('note-detail')

  const showUnarchivedNotesList = async () => {
    noteListContainerElement.querySelector('note-list').remove()

    resetNoteDetail()

    Utils.showLoading()

    const notes = await NotesAPi.getUnarchivedNotes()

    if (notes) {
      const noteItemElements = showNoteItems(notes)

      setTimeout(() => {
        const newNoteListElement = document.createElement('note-list')
        newNoteListElement.setAttribute('column', '1')
        newNoteListElement.setAttribute('gutter', '8')
        noteListContainerElement.append(newNoteListElement)

        if (noteItemElements.length === 0) {
          const noNotesElement = document.createElement('no-notes')
          noNotesElement.setAttribute('fontcolor', '#A0A6A5')
          newNoteListElement.append(noNotesElement)
        }

        newNoteListElement.append(...noteItemElements)
        Utils.hideLoading()
      }, 1500)
    } else {
      Utils.hideLoading()
    }
  }

  const showArchivedNotesList = async () => {
    noteListContainerElement.querySelector('note-list').remove()

    resetNoteDetail()

    Utils.showLoading()

    const notes = await NotesAPi.getArchivedNotes()

    if (notes) {
      const noteItemElements = showNoteItems(notes)

      setTimeout(() => {
        const newNoteListElement = document.createElement('note-list')
        newNoteListElement.setAttribute('column', '1')
        newNoteListElement.setAttribute('gutter', '8')
        noteListContainerElement.append(newNoteListElement)

        if (noteItemElements.length === 0) {
          const noNotesElement = document.createElement('no-notes')
          noNotesElement.setAttribute('fontcolor', '#A0A6A5')
          newNoteListElement.append(noNotesElement)
        }

        newNoteListElement.append(...noteItemElements)
        Utils.hideLoading()
      }, 1500)
    } else {
      Utils.hideLoading()
    }
  }

  const showNoteItems = (notes) => {
    return notes.map((note) => {
      const noteItemElement = document.createElement('note-item')

      noteItemElement.setAttribute('bgcolor', '#FAFAFA')
      noteItemElement.setAttribute('fontcolor', '#000000')
      noteItemElement.note = note

      // add click event listener to note-item
      noteItemElement.addEventListener('click', async () => {
        resetNoteItemAttributes()
        noteItemElement.setAttribute('bgcolor', '#E79B3D')
        noteItemElement.setAttribute('fontcolor', '#FFFFFF')

        const formAddNoteElement =
          noteDetailContainerElement.querySelector('form-add-note')

        if (formAddNoteElement) {
          formAddNoteElement.remove()
          const buttonAddNoteElement = noteDetailContainerElement.querySelector(
            'button-add-new-note'
          )
          Utils.showElement(noteDetailElement)
          Utils.showElement(buttonAddNoteElement)
        }

        const noteItemDetailElementExist =
          document.querySelector('note-item-detail')
        if (noteItemDetailElementExist) {
          noteItemDetailElementExist.remove()
        }

        // add note-item-detail custom element
        const noteItemDetailElement = document.createElement('note-item-detail')
        noteItemDetailElement.setAttribute('titlecolor', '#E79B3D')
        noteItemDetailElement.setAttribute('bodycolor', '#000000')
        noteItemDetailElement.setAttribute('datecolor', '#A0A6A5')

        const noteData = await NotesAPi.getSingleNote(note.id)
        noteItemDetailElement.note = noteData
        noteDetailElement.append(noteItemDetailElement)

        const noteControlsElement =
          noteItemDetailElement.shadowRoot.querySelector('note-controls')
        //
        noteControlsElement.archived = note.archived
        // add event listener to note-controls custom element
        noteControlsElement.addEventListener('archiveNote', () =>
          onArchiveNoteHandler(noteControlsElement, note.id)
        )

        noteControlsElement.addEventListener('removeNote', () =>
          onRemoveNoteHandler(note.id)
        )

        const noNotesSelectedElement =
          noteDetailContainerElement.querySelector('no-notes-selected')
        Utils.hideElement(noNotesSelectedElement)
      })

      return noteItemElement
    })
  }

  const resetNoteDetail = () => {
    Utils.emptyElement(noteDetailElement)

    const img = document.createElement('img')
    img.setAttribute('src', 'notebook.svg')
    img.setAttribute('width', '200')

    const noNotesSelectedElement = document.createElement('no-notes-selected')
    noNotesSelectedElement.setAttribute('fontcolor', '#A0A6A5')

    noteDetailElement.appendChild(img)
    noteDetailElement.appendChild(noNotesSelectedElement)
  }

  const resetNoteItemAttributes = () => {
    const noteItemElements = noteListContainerElement
      .querySelector('note-list')
      .querySelectorAll('note-item')
    noteItemElements.forEach((noteItemElement) => {
      noteItemElement.setAttribute('bgcolor', '#FAFAFA')
      noteItemElement.setAttribute('fontcolor', '#000000')
    })
  }

  const showFormAddNote = () => {
    const buttonAddNoteElement = noteDetailContainerElement.querySelector(
      'button-add-new-note'
    )

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

  const onFilterNotesHandler = () => {
    const activeButton = notesFilterElement.shadowRoot.querySelector('.active')
    if (activeButton.innerHTML.toLowerCase() === 'unarchived') {
      showUnarchivedNotesList()
    }

    if (activeButton.innerHTML.toLowerCase() === 'archived') {
      showArchivedNotesList()
    }
  }

  const onAddNoteHandler = async (event) => {
    const note = event.detail
    await NotesAPi.createNote(note)

    const formAddNoteElement =
      noteDetailContainerElement.querySelector('form-add-note')
    formAddNoteElement.remove()

    Utils.showElement(noteDetailElement)
    Utils.showElement(buttonAddNoteElement)

    showUnarchivedNotesList()

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Note added successfully',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const onCancelAddNoteHandler = () => {
    const formAddNoteElement =
      noteDetailContainerElement.querySelector('form-add-note')

    if (formAddNoteElement) {
      formAddNoteElement.remove()

      const noteDetailElement =
        noteDetailContainerElement.querySelector('note-detail')
      const buttonAddNoteElement = noteDetailContainerElement.querySelector(
        'button-add-new-note'
      )

      Utils.showElement(noteDetailElement)
      Utils.showElement(buttonAddNoteElement)
    }
  }

  const onArchiveNoteHandler = async (noteControlsElement, noteId) => {
    const isNoteArchived = noteControlsElement.archived
    noteControlsElement.archived = !isNoteArchived

    // UNARCHIVE NOTE
    if (isNoteArchived) {
      const response = await NotesAPi.unarchiveNote(noteId)

      if (!response) {
        noteControlsElement.archived = !noteControlsElement.archived
      }

      const getNote = await NotesAPi.getSingleNote(noteId)
      if (getNote.archived) {
        noteControlsElement.archived = !noteControlsElement.archived
      }
    }
    // ARCHIVE NOTE
    else {
      const response = await NotesAPi.archiveNote(noteId)

      if (!response) {
        noteControlsElement.archived = !noteControlsElement.archived
      }

      const getNote = await NotesAPi.getSingleNote(noteId)

      if (!getNote.archived) {
        noteControlsElement.archived = !noteControlsElement.archived
      }
    }

    onFilterNotesHandler()
  }

  const onRemoveNoteHandler = async (noteId) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete this note?',
      showCancelButton: true,
      confirmButtonText: 'Remove',
    })

    if (result.isConfirmed) {
      await NotesAPi.removeNote(noteId)
      Swal.fire('Removed!', '', 'success')
    }

    onFilterNotesHandler()
  }

  // add event listener to notes-filter
  const notesFilterElement =
    noteListContainerElement.querySelector('notes-filter')
  notesFilterElement.addEventListener('filterNotes', onFilterNotesHandler)

  // add event listener to button-add-new-note
  const buttonAddNoteElement = noteDetailContainerElement.querySelector(
    'button-add-new-note'
  )

  buttonAddNoteElement.setAttribute('src', 'plus.png')
  buttonAddNoteElement.addEventListener('click', () => {
    showFormAddNote()
  })
  //

  showUnarchivedNotesList()
}

export default home
