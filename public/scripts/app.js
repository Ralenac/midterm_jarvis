// $(document).ready(() => {});

// const createCategory = function (category) {
//   const $listCategory = $(`

//   <div class="todo_list_header">
//     <label class="name_category" for="items">${category.name}</label>
//   </div>
// `)
//   // console.log("test", $listCategory)
//   return $listCategory;
// }

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


const renderItems = function(items) {
  for (const item of items) {
    const $item = createNewListItemRow(item);
    $('#todo-container').append($item);
  }

};


$(() => {

  // $.get('/api/categories')
  // .then((categories) => {
  //   // console.log({categories});
  //   let category = categories [0]

  //   // for (let category of categories) {
  //   // console.log("test", {item})
  //   // let listItem = createNewListItemRow(item)
  //   // console.log("what function has", listItem)
  //   let $todoContainer = $('#todo-container')
  //   // console.log("container", $todoContainer)
  //   $todoContainer.append(createCategory(category));

  // })
  // .catch((err) => {
  //   console.log("error", err)
  // })



  $.get('/api/items')
    .then((items) => {
      console.log({items});
      // for (let item of items) {
      // console.log("test", {item})
      let listItem = createNewListItemRow(items)
      // console.log("what function has", listItem)
      let $todoContainer = $('#todo-container')
      // console.log("container", $todoContainer)
      $todoContainer.append(createNewListItemRow(listItem));
      // }
    })
    .catch((err) => {
      console.log("error", err)
    })


    const loadItem = function() {
      $.get('/api/items')
        .then((items) => {
          renderItems(items)
        })

    };

    loadItem()

    const $newItemForm = $("#formItem");
    $newItemForm.on('submit', (event) => {
      event.preventDefault();
       console.log("this is event", event)
      const data = $newItemForm.serialize();

      console.log("data", data)

      // console.log("new form", data)

      $.ajax({
        method: "POST",
        url: "/api/items",
        data,
      })
      .then((data) => {
        console.log("from server", data)
        loadItem()
      })
      .catch((error) => {
        console.log(error);
      })


      // $.post('/api/items', data)
      //   .then(() => {
      //     loadItem()
      //   })


  });



});


