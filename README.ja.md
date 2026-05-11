# select-city

日本の市区町村を選択するためのカスタムHTML要素です。都道府県/市区町村、および都道府県/市区町村/区の動的に連動するドロップダウンを提供します。

## デモ

[https://code4fukui.github.io/select-city/](https://code4fukui.github.io/select-city/)

## 機能

- **2つのコンポーネント**: 都道府県/市区町村の選択には `<select-city>` を、都道府県/市区町村/区の選択には `<select-ward>` を使用します。
- **動的ドロップダウン**: 親要素の選択に基づいて、市区町村や区のリストが自動的に生成されます。
- **値とLGCode**: `.value` プロパティで選択内容を完全な文字列（例: `"東京都新宿区"`）として取得でき、`.lgcode` プロパティで6桁の全国地方公共団体コード（例: `"131041"`）として取得できます。
- **プログラムによる制御**: `.value` または `.lgcode` を使用して、プログラムからコンポーネントの値を設定できます。
- **カスタムプレースホルダー**: `defaultpref`、`defaultcity`、`defaultward` 属性を使用して、デフォルトの「都道府県」や「市区町村」のテキストを変更できます。
- **必須属性**: `required` 属性を追加すると、選択が必要な場合に `.required` クラスが適用され、カスタムスタイルを設定できます。

## 使い方

### 1. 基本的な都道府県/市区町村の選択

2段階の選択には `<select-city>` 要素を使用します。

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

### 2. 都道府県/市区町村/区の選択

区を持つ自治体（例: 政令指定都市）の場合は、`<select-ward>` 要素を使用します。

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

### 3. 値の設定

フルネームの文字列またはLGCodeを使用して、プログラムから選択された市区町村を設定できます。

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

### 4. カスタマイズ

デフォルトのプレースホルダーテキストをカスタマイズし、フィールドを必須としてマークできます。

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

## 依存関係

このコンポーネントは、日本の地方公共団体コードと名称を処理するために [LGCodeライブラリ](https://github.com/code4fukui/LGCode) を使用しています。

## クレジット

App: [福野泰介の一日一創](https://fukuno.jig.jp/) ([select-city tag - src on GitHub](https://github.com/code4fukui/select-city))

## ライセンス

MIT
