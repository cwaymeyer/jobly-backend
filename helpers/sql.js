const { BadRequestError } = require('../expressError');

/**
 * Helper function to pass in dictionary of column names and values to be automatically updated as a single SQL SET statement.
 *
 * dataToUpdate: eg {firstName: 'Aliya', age: 32} updates the firstName and age columns of the row
 * jsToSql: eg {firstName: 'first_name', age: 'age'} maps the column names to the actual column names in the database
 *
 * Returns object {setCols: '"first_name"=$1, "age"=$2', values: ['Aliya', 32]}
 * Returns values array of values to be passed into the SQL statement
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError('No data');

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(', '),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
