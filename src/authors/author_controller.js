const db = require('../common/get_db_data.js');

async function getAuthorsData() {
  const sql = 'select * from authors';
  return db.executeQuery(sql);
}

async function getAuthorDataById(id) {
  const sql = 'select a.*,b.* from authors as a,books as b where b.author_id=a.id and a.id=?';
  return db.executeQuery(sql, [id]);
}

async function updateAuthorDataById(id, author) {
  const parameters = [
    author.name,
    author.about,
    author.place,
    id,
  ];
  const sql = `update authors
               set
               name=?,
               about=?,
               place=? where id=?`;
  return db.executeQuery(sql, parameters);
}

async function insertAuthorData(author) {
  const parameters = [
    author.id,
    author.name,
    author.about,
    author.place,
  ];
  const sql = 'insert into authors values(?,?,?,?);';
  return db.executeQuery(sql, parameters);
}

function deleteAuthorDataById(id) {
  const sql = 'delete from authors where id=?';
  return db.executeQuery(sql, [id]);
}

module.exports = {
  getAuthors: getAuthorsData,
  getAuthorById: getAuthorDataById,
  updateAuthorById: updateAuthorDataById,
  insertAuthor: insertAuthorData,
  deleteAuthorById: deleteAuthorDataById,
};
