/* eslint-disable no-undef */
const activator = $('.activator');
const form = $('.form');
const todoList = $('.todo-list');

activator.click(() => {
  todoList.removeClass('idle');
});

$('.close').click(() => {
  todoList.addClass('idle');
});

form.submit((event) => {
  event.preventDefault();

  const todoListTitle = $('.todo-list-title').val();
  if (todoListTitle.trim().length > 0) {
    $('.todo-list.creator').before(`
      <div class="todo-list">
        <header class="header">
          <h2>${todoListTitle}</h2>
          <div class="extras">
            <i class="small ellipsis horizontal icon"></i>
          </div>
        </header>

        <div class="composer">
          <div class="activator">
            <i class="icon plus"></i>
            <span>Add a card</span>
          </div>
        </div>
      </div>
    `);
  }

  $('.composer').click(() => {
    $('.header').after(`
      <div class="task">
        <div class="task-text-wrapper">
          <textarea class="task-text"
            placeholder="Enter a title for this task..."></textarea>
        </div>

        <div class="submit">
          <button class="ui primary button">Add Card</button>
          <i class="cancel icon"></i>
          <i class="ellipsis horizontal icon"></i>
        </div>
      </div>
    `);
    $('.composer').css('display', 'none');
  });
});
