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
  todoList.toggleClass('idle');
});

$('.composer').click(() => {
  console.log('yay');
});
