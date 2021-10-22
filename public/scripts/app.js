
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




const renderItems = function(items) {

  const $itemContainer = $('#film-todo-container');
  $itemContainer.empty();
    for (const item of items) {
      const $item = createNewListItemRow(item);
      $itemContainer.append($item);
    }


};


$(() => {

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
      //  console.log("this is event", event)

      const data = $newItemForm.serialize();


      if ($(this).attr("value")==="movie") {
      } else if ($(this).attr("value")==="book") {
      } else if ($(this).attr("value")==="restaurant") {
      } else if ($(this).attr("value")==="product") {
      }

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




  });


  const $deleteButton = $('#delete_button');

  $deleteButton.on('click', () => {
    console.log("hello")
    $.ajax({
      method: 'DELETE',
      url: `/api/items/${items.name}`
    })
      .then(() => {
        loadItem();
      });
  });


});


