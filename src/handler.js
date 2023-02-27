const { nanoid } = require('nanoid');
const notes = require('./notes');

// Create Note
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  console.log(isSuccess);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteID: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);

  return response;
};

// View List Notes
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// View Detail Note
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Edit Note
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);
  console.log(index);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      // eslint-disable-next-line max-len
      // Catatan: Spread operator pada kode di atas digunakan untuk mempertahankan nilai notes[index] yang tidak perlu diubah. Jika Anda butuh mengingat kembali bagaimana spread operator bekerja, silakan simak pada dokumentasi yang dijelaskan MDN: Spread Syntax.
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Delete Note
const deleteNoteByIDHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'succes',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. ID tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIDHandler,
};

// CORS
//   const response = h.response({ error: false, message: 'Catatan berhasil ditambahkan' });
//   response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
// Atau Anda bisa menggunakan tanda *
// pada nilai origin untuk memperbolehkan data dikonsumsi oleh seluruh origin.
// response.header('Access-Control-Allow-Origin', '*');
// Good news! Penerapannya akan jauh lebih mudah bila Anda menggunakan Hapi.
// Dengan Hapi, CORS dapat ditetapkan pada spesifik route dengan menambahkan
// properti options.cors di konfigurasi route. Contohnya seperti ini:
// {
//     method: 'POST',
//     path: '/notes',
//     handler: addNoteHandler,
//     options: {
//       cors: {
//         origin: ['*'],
//       },
//     },
//   },
// Bila ingin cakupannya lebih luas alias CORS diaktifkan di seluruh route yang
// ada di server, Anda bisa tetapkan CORS pada konfigurasi ketika hendak membuat
// server dengan menambahkan properti routes.cors. Contohnya seperti ini:
// const server = Hapi.server({
//     port: 5000,
//     host: 'localhost',
//     routes: {
//       cors: {
//         origin: ['*'],
//       },
//     },
//   });
