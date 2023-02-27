const {
  addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIDHandler
} = require('./handler');

const routes = [
  // create Note
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  // view all notes
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  // view detail note
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  // edit note
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  // delete note
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIDHandler,
  },
];

module.exports = routes;
