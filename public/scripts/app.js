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

// const renderItems =  function(items) {
//   for (const item of items) {
//   const $item = createNewListItemRow(item);
//   $("#todo_lists_container").prepend($item);
// }
// }

// const loadItem = function() {


//   $.ajax({
//     method: "GET",
//     url: "/api/items",
//     success: (items) => {
//       console.log("data", items);
//       renderItems(items);
//     },
//     error: (err) => {
//       console.error(`there was an error: ${err}`);
//     }
//   });

// };

// loadItem();


$(() => {

  $.get('/api/categories')
  .then((categories) => {
    // console.log({categories});
    // let category = categories [0]

    for (let category of categories) {
    // console.log("test", {item})
    // let listItem = createNewListItemRow(item)
    // console.log("what function has", listItem)
    let $todoContainer = $('#todo-container')
    // console.log("container", $todoContainer)
    $todoContainer.append(createCategory(category));
    }
  })
  .catch((err) => {
    console.log("error", err)
  })



  $.get('/api/items')
    .then((items) => {
      console.log({items});
      for (let item of items) {
      // console.log("test", {item})
      // let listItem = createNewListItemRow(item)
      // console.log("what function has", listItem)
      let $todoContainer = $('#todo-container')
      // console.log("container", $todoContainer)
      $todoContainer.append(createNewListItemRow(item));
      }
    })
    .catch((err) => {
      console.log("error", err)
    })


// $("#formItem").submit(function(event) {
//   event.preventDefault();

//   const item = $("#todo_item-text").serialize();
//     $.ajax({
//       method: "POST",
//       url: "/api/items",
//       data: item
//     }).done(() => {
//       $("#todo_item-text").val("");
//       $("#todo_lists_container").empty();
//       loadItem();
//     });
//   });

});


