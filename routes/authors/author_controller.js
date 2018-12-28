const db = require('../common/get_db_data.js');

async function getAuthorsData() {
  const sql = 'select * from authors';
  return db.executeQuery(sql);
}

async function getAuthorDataById(id) {
  const sql = 'select a.*,b.* from authors as a,books as b where b.author_id=a.id and a.id=?';
  return db.executeQuery(sql, [id]);
}

module.exports = {
  getAuthors: getAuthorsData,
  getAuthorById: getAuthorDataById,
};
