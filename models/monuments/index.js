// const fs = require('fs/promises');
// const path = require('path');

// const monumentsPath = path.join(__dirname, 'singleMonument.json');

// const getAll = async () => {
//   const data = await fs.readFile(monumentsPath);

//   return JSON.parse(data);
// };

// const getById = async (id) => {
//   const monuments = await getAll();
//   const result = monuments.find((item) => item.id === id);

//   return result || null;
// };
// const add = async (data) => {
//   const monuments = await getAll();

//   const newMonument = {
//     ...data,
//   };
//   monuments.push(newMonument);
//   await fs.writeFile(monumentsPath, JSON.stringify(monuments, null, 2));
//   return newMonument;
// };
// const updateById = async (id, data) => {
//   const monuments = await getAll();
//   const index = monuments.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   monuments[index] = { id, ...data };
//   await fs.writeFile(monumentsPath, JSON.stringify(monuments, null, 2));

//   return monuments[index];
// };
// const deleteById = async (id) => {
//   const monuments = await getAll();
//   const index = monuments.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = monuments.splice(index, 1);
//   await fs.writeFile(monumentsPath, JSON.stringify(monuments, null, 2));

//   return result;
// };
// module.exports = {
//   getAll,
//   getById,
//   add,
//   updateById,
//   deleteById,
// };
