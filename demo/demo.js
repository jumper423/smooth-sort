var ul = $('ul');

ul.smoothSort({itemSelector: 'li'});

$('.add').click(function () {
    var sort = Math.floor(Math.random() * (99 - 1 + 1)) + 1;
    ul.smoothSort('add', $("<li data-sort='" + sort + "'>Тест " + sort + "</li><li data-sort='" + sort + "'>Тест " + sort + "</li>"));
    ul.smoothSort('sort');
});

$('.edit').click(function () {
    var li = $('li[data-sort=1]');
    var sort = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
    li.text('Test 1 - ' + sort);
    ul.smoothSort('setSort', {el: li, sort: sort});
    ul.smoothSort('sort');
});

$('.remove').click(function () {
    var li = $('li[data-sort=3]');
    ul.smoothSort('remove', li);
    ul.smoothSort('sort');
});

