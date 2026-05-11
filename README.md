# select-city

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A custom HTML element for selecting Japanese municipalities (市区町村). Provides dynamically linked dropdowns for Prefecture/City and Prefecture/City/Ward selections.

## Demo

[https://code4fukui.github.io/select-city/](https://code4fukui.github.io/select-city/)

## Features

-   **Two Components**: Use `<select-city>` for Prefecture/City or `<select-ward>` for Prefecture/City/Ward.
-   **Dynamic Dropdowns**: City and ward lists are automatically populated based on the parent selection.
-   **Value & LGCode**: Access the selection as a full string (e.g., `"東京都新宿区"`) via the `.value` property, or as a 6-digit Local Government Code (e.g., `"131041"`) via the `.lgcode` property.
-   **Programmatic Control**: Set the component's value using either `.value` or `.lgcode`.
-   **Custom Placeholders**: Change the default "都道府県" or "市区町村" text using `defaultpref`, `defaultcity`, and `defaultward` attributes.
-   **Required Attribute**: Add `required` to apply a `.required` class for custom styling when a selection is needed.

## Usage

### 1. Basic Prefecture/City Selection

Use the `<select-city>` element for a two-level selection.

```html
<script type="module" src="https://code4fukui.github.io/select-city/select-city.js"></script>

<select-city id="city-selector"></select-city>
<p>Selected: <span id="result"></span></p>

<script type="module">
  const citySelector = document.getElementById("city-selector");
  const result = document.getElementById("result");

  citySelector.onchange = () => {
    if (citySelector.value) {
      result.textContent = `${citySelector.value} (LGCode: ${citySelector.lgcode})`;
    } else {
      result.textContent = "Please select a prefecture.";
    }
  };
</script>
```

### 2. Prefecture/City/Ward Selection

For municipalities with wards (e.g., designated cities), use the `<select-ward>` element.

```html
<script type="module" src="https://code4fukui.github.io/select-city/select-ward.js"></script>

<select-ward id="ward-selector"></select-ward>

<script type="module">
  const wardSelector = document.getElementById("ward-selector");
  wardSelector.onchange = () => {
    console.log(wardSelector.value, wardSelector.lgcode);
  };
</script>
```

### 3. Setting the Value

You can set the selected city programmatically using either the full name string or the LGCode.

```html
<select-city id="my-city"></select-city>
<button id="set-by-name">Set to Sabae</button>
<button id="set-by-code">Set to Shinjuku</button>

<script type="module">
  const myCity = document.getElementById("my-city");
  
  document.getElementById("set-by-name").onclick = () => {
    // Set by name
    myCity.value = "福井県鯖江市";
  };
  
  document.getElementById("set-by-code").onclick = () => {
    // Set by 6-digit LGCode
    myCity.lgcode = "131041"; // Tokyo, Shinjuku-ku
  };
</script>
```

### 4. Customization

Customize the default placeholder text and mark the field as required.

```html
<select-city
  id="custom-city"
  required="required"
  defaultpref="全国"
  defaultcity="全市区町村"
></select-city>

<style>
  /* Example styling for the required attribute */
  .required {
    background-color: #fdd;
  }
</style>
```

## Dependency

This component uses the [LGCode library](https://github.com/code4fukui/LGCode) to handle Japanese local government codes and names.

## Attribution

App: [福野泰介の一日一創](https://fukuno.jig.jp/) ([select-city tag - src on GitHub](https://github.com/code4fukui/select-city))

## License

MIT