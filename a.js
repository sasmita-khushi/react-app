let array = [
  "singham",
  "Avatar",
  "Batman",
  "Jawan",
  "jeie",
  "jjdf",
  "asbdid",
  "The Shawshank Redemption",
  "The Godfather",
  "Pulp Fiction",
];

let filterdata = array.filter((item) => {
  item.toLocaleLowerCase();
});

console.log(filterdata);
