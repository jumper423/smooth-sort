# Smooth Sort
[GitHub](https://github.com/jumper423/smooth-sort)

Плавная сортировка вертикальных элементов.

Главной задачей было добиться максимальной быстрой скорости сортировки и отрисовки, без лишних действий.
Данный плагин предназначен для узкого списка задач, по этому на супер функциональность в нём можете не рассчитывать.

[Демо](http://smooth-sort.infoblog1.ru/demo/)

Инициализация
------------

```ssh
bower install smooth-sort
```

```html
<script src="../jquery.min.js"></script>
<script src="../src/jquery.smooth-sort.js"></script>
```

Атрибут data-sort необходим для начальной сортировки. Он может быть изменён по пользовательский, указав иной в настройках плагина. Параметр "attrSort".
```html
<ul>
    <li data-sort="3">Тест 3</li>
    <li data-sort="5">Тест 5</li>
    <li data-sort="2">Тест 2</li>
    <li data-sort="1">Тест 1</li>
    <li data-sort="6">Тест 6</li>
    <li data-sort="4">Тест 4</li>
</ul>
```

Определяем настройки плагина
```javascript
var ul = $('ul');

ul.smoothSort({itemSelector: 'li'});
```

Добавление элемента
------------
Добавление с дальнейшей пересортировкой
```javascript
$('.add').click(function () {
    var sort = Math.floor(Math.random() * (99 - 1 + 1)) + 1;
    ul.smoothSort('add', $("<li data-sort='" + sort + "'>Тест " + sort + "</li>"));
    ul.smoothSort('sort');
});
```

Изменение параметра сортировки
------------
Изменение параметров сортировки на конкретном элементе с последующей пересортировкой
```javascript
$('.edit').click(function () {
    var li = $('li[data-sort=1]');
    var sort = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
    li.text('Test 1 - ' + sort);
    ul.smoothSort('setSort', {el: li, sort: sort});
    ul.smoothSort('sort');
});
```

Удаление элемента
------------
Удаление определённого элемента с дальнейшей пересортировкой
```javascript
$('.remove').click(function () {
    var li = $('li[data-sort=3]');
    ul.smoothSort('remove', li);
    ul.smoothSort('sort');
});
```