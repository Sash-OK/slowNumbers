# slowNumbers
 
 ## [Demo page](https://sash-ok.github.io/slowNumbers/)

```bash
npm install slow-numbers
```


## Init on element
```javascript
$(document).ready(function(){
  var numbers = new SlowNumbers(
        'CSS Selector',
        startNumber,
        options
)
});
```

### Update

```javascript
numbers.changeTo(value, options);
```

### Add

```javascript
numbers.add(value, options);
```

### Subtract

```javascript
numbers.subtract(value, options);
```

### Options

```javascript
var options = {
	speed: number,
	format: boolean, // if true 1000000000 will be shown as 1000 000 000
}
```

### Остановка анимации

```javascript
numbers.stopChange();
```
