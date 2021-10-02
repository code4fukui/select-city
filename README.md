# select-pref
 
市区町村選択タグ, select-cityタグ

## sample

https://code4fukui.github.io/select-city/

## usage

```html
<script type="module" src="https://code4fukui.github.io/select-city/select-city.js"></script>

<select-city id="city"></select-city><br>

<p><input id="selected"></p>
<p><button id="set">福井県鯖江市をセット</button></p>

<script type="module">
city.onchange = () => {
  selected.value = city.value ? `${city.value}(${city.lgcode})が選択されました` : "都道府県を選択してください";
};
set.onclick = () => {
  pref.value = "福井県鯖江市";
};
</script>
```
