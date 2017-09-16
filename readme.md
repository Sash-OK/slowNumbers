# slowNumbers
 
 ## [Demo page](https://sash-ok.github.io/slowNumbers/)

```bash
npm install slow-numbers
```

## Подключение

```html
<!-- Требуется библиотека JQuery 1.12.4 и выше -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/slowNumbers.js"></script>
```

## Начальная инициализация
Необходима для того, чтобы отсчет пошел с указанного числа при загрузке страницы, а не с 0
```javascript
$(document).ready(function(){
  $(selector).slowNumbers({
    start: 1000
  });
});
```

### Обновление числа

```javascript
$(selector).slowNumbers('update', {
    end: 5000
});
```

### Необязательные параметры

```javascript
$(selector).slowNumbers('update', {
    format: true, // Разделение числа 10000000 => 10 000 000
    slowSpeed: 5 // Скорость земедления, чем выше тем медленнее
});
```

### Остановка анимации

```javascript
$(selector).slowNumbers('stop');
```
