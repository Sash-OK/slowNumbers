# slowNumbers
 
 [Demo page](https://sash-ok.github.io/slowNumbers/)

## Подключение

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/slowNumbers.js"></script>
```

## Начальная инициализация, чтобы отсчет пошел с указанного числа, а не с 0
```javascript
$(document).ready(function(){
  $('.test').slowNumbers({
    start: 1330,
    format: true
  });
});
```

### Опции

```javascript

```