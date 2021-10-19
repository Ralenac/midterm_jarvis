// $(document).ready(() => {});

const createItemsList = functiion(listItems) {
  let list = `<div class="list_items">
 </div>
`


}

const createCategory = function (category) {
  const list = `
  <div class="todo_list_header">
    <label class="name_category" for="items">Movies or Series to watch</label>
  </div>
`}

const createNewListItemRow = function(item) {
  console.log({item})


  const $listItem = $(`

  checkbox
  <div class="list_item">${item.name}</div>
</div>

  `)
  console.log("test", $listItem)
  return $listItem;
}

$(() => {
  $.get('/api/items')
    .then((items) => {
      console.log({items});
      // for (let item of items) {
      //   console.log(item)
      // }
      let item = items[1]
      console.log("test", {item})
      let listItem = createNewListItemRow(item)
      console.log("what function has", listItem)
      let $todoContainer = $('#todo-container')
      console.log("container", $todoContainer)
      $todoContainer.apend(createNewListItemRow(item));
    })
    .catch((err) => {
      console.log("error", err)
    })


});
