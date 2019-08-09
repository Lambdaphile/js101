/* eslint-disable no-undef */
const activator = $('.activator');
const form = $('.form');
const todoList = $('.todo-list');

activator.click(() => {
  todoList.toggleClass('idle');
  $('.todo-list-title').focus();
});

$('.close').click(() => {
  todoList.toggleClass('idle');
});

form.submit((event) => {
  event.preventDefault();
  todoList.toggleClass('idle');
});
