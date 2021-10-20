// $(document).ready(() => {});



const createCategory = function (category) {
  const $listCategory = $(`

  <div class="todo_list_header">
    <label class="name_category" for="items">${category.name}</label>
  </div>
`)
  // console.log("test", $listCategory)
  return $listCategory;
}

const createNewListItemRow = function(item) {
  console.log({item})
  const $listItem = $(`
  <div class="list_items">
          <div class="check">
            <div class="check-mark"></div>
          </div>
            <div class="list_item_row">${item.name}
            </div>

        </div>
  `)
  // console.log("test", $listItem)
  return $listItem;
}



$(() => {

  $.get('/api/categories')
  .then((categories) => {
    console.log({categories});
    let category = categories[1]
    // console.log("test", {item})
    // let listItem = createNewListItemRow(item)
    // console.log("what function has", listItem)
    let $todoContainer = $('#todo-container')
    // console.log("container", $todoContainer)
    $todoContainer.append(createCategory(category));
  })
  .catch((err) => {
    console.log("error", err)
  })



  $.get('/api/items')
    .then((items) => {
      console.log({items});
      let item = items[0]
      // console.log("test", {item})
      // let listItem = createNewListItemRow(item)
      // console.log("what function has", listItem)
      let $todoContainer = $('#todo-container')
      // console.log("container", $todoContainer)
      $todoContainer.append(createNewListItemRow(item));
    })
    .catch((err) => {
      console.log("error", err)
    })




});
