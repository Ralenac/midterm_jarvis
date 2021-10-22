
const createNewListItemRow = function(item) {
  console.log({item})
  const $listItem = $(`
  <div class="list_items">
  <div class="check">
    <div class="check-mark"></div>
  </div>
    <div class="list_item_row">${item.name}
    </div>
    <div>
      <form id="delete-item">
          <button id="delete_button" type="delete"><i class="fas fa-trash"></i>
          </button>
      </form>
    </div>

    <div>
      <form>
        <button id="edit_button" type="edit">
          <i class="far fa-edit"></i>
        </button>
      </form>
      </div>
      </div>
        `)


  // console.log("test", $listItem)
  return $listItem;
}



const renderItems = function(items, categoryId) {

  let $itemContainer = $('#other-todo-container');
  if (categoryId === 1) {
    $itemContainer = $('#film-todo-container')
  }
  else if (categoryId === 2) {
    $itemContainer = $('#book-todo-container')
  }
  else if (categoryId === 3) {
    $itemContainer = $('#restaurants-todo-container')
  }
  else if (categoryId === 4) {
    $itemContainer = $('#products-todo-container')
  } else {
    $itemContainer = $('#other-todo-container');
  }
  $itemContainer.empty();
    for (const item of items) {
      const $item = createNewListItemRow(item);
      $itemContainer.append($item);
    }

};



const loadItem = function(categoryId) {

  console.log(" making  get category id in loaditem function", categoryId)
  $.get('/api/items', {category_id: categoryId},

    function(items) {
      console.log("result for items for get category id in loaditem function", items)
      renderItems(items, categoryId)
    })

};

const loadItemAll = function() {

  loadItem(1)
  loadItem(2)
  loadItem(3)
  loadItem(4)
  loadItem(0)

}


$(() => {

  loadItemAll()

  // $.get('/api/items')
  //   .then((items) => {
  //     console.log({items});
  //     // for (let item of items) {
  //     // console.log("test", {item})
  //     let listItem = createNewListItemRow(items)
  //     // console.log("what function has", listItem)
  //     let $todoContainer = $('#todo-container')
  //     // console.log("container", $todoContainer)
  //     $todoContainer.append(createNewListItemRow(listItem));
  //     // }
  //   })
  //   .catch((err) => {
  //     console.log("error", err)
  //   })


    const $newItemForm = $("#formItem");
    $newItemForm.on('submit', function(event) {
      event.preventDefault();
      console.log("this is event", event)

      const data = $newItemForm.serialize();
      const buttonvalue = event.originalEvent.submitter.attributes[4].value
      console.log({buttonvalue})

      let categoryId = 0;
      let url = "/api/items"

      if (buttonvalue==="movie") {
        url += "/towatchcategory"
        categoryId = 1;
      } else if (buttonvalue==="book") {
        url += "/toreadcategory"
        categoryId = 2;
      // } else if ($(this).attr("value")==="restaurant") {
      } else if (buttonvalue ==="restaurant") {
        url += "/toeatcategory"
        categoryId = 3;
      } else if (buttonvalue==="product") {
        url += "/tobuycategory"
        categoryId = 4;
      } else {
        url += "/othercategory"
        categoryId = 0;
      }

      const $todoItemTextInput = $('#todo_item-text');
      $todoItemTextInput.val('')

      $.ajax({
        method: "POST",
        url: url,
        data,
      })
      .then((data) => {
        console.log("from server", data)
        categoryId ? loadItem(categoryId) : loadItemAll();
      })
      .catch((error) => {
        console.log(error);
      })

    });


  // const $deleteButton = $('#delete_button');

  // $deleteButton.on('click', () => {
  //   console.log("hello")
  //   $.ajax({
  //     method: 'DELETE',
  //     url: `/api/items/${items.name}`
  //   })
  //     .then(() => {
  //       loadItem();
  //     });
  // });


});


