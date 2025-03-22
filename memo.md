# Angular Tutorial  

## [1. Angularのセットアップ、プロジェクト作成、アプリケーションの起動](https://angular.jp/tutorials/first-app)  

### 1. Angular CLI のインストール  
以下のコマンドを実行して、Angular CLI をインストールする。  

```cmd
npm install -g @angular/cli
```
### 2. Node.jsのバージョン確認
package.jsonのengineプロパティには、各Angularバージョンに必要なNode.jsのバージョンが記載されている。
```cmd
node --version
```
**`package.json`:**
```json
  "engines": {
    "node": "^18.19.1 || ^20.11.1 || >=22.0.0"
  }
```
[Node.jsのインストール](https://nodejs.org/ja/download)

## [2. Homeコンポーネントの作成](https://angular.jp/tutorials/first-app/02-HomeComponent)

### 0. Angularプロジェクトの作成
以下のコマンドでAngularプロジェクトを作成する。
```cmd
ng new {プロジェクト名}
```

以下のコマンドでAngularアプリを起動する。
```cmd
ng serve
```

### 1. コンポーネントの作成
以下のコマンドでコンポーネントを作成する。
```cmd
ng generate component {コンポーネント名}
```
コンポーネントは次のメタ情報を含む。
- selector: コンポーネントの参照法
- standalone: コンポーネントが`NgModule`を必要とするかどうか。`standalone: true`のコンポーネントは以下の特性を持つ。
  - `@NgModule.declarations`プロパティで宣言できない。`@NgModule.declarations`とは、コンポーネントをアプリケーション内で利用可能となるよう宣言するためのプロパティ。
  - `@Components.imports`プロパティでテンプレートの依存関係を管理できる。
  - 別のコンポーネントの`@Components.imports`や`@NgModules.imports`プロパティでインポートできる。
- imports: コンポーネントの依存関係
- templates: コンポーネントのHTML
- styleUrls: コンポーネントが使用するCSSファイル群

**app.module.ts** の`@NgModule.declarations`プロパティに作成したコンポーネントが追記される。
```typescript
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
```
これによって、Angularプロジェクト内で **HomeComponent** を参照することができる。
### 2. コンポーネントレイアウトの編集
**AppComponent** へ **HomeComponent** をインポートする。
``` typescript:app.component.ts 
import { HomeComponent } from './home/home.component';
```
**AppComponent** のテンプレート（HTML）より **HomeComponent** を参照する。
```HTML
<main>
  <header class="brand-name">
    <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
  </header>
  <section class="content">
    <app-home></app-home>
  </section>
</main>
```
## [3. HousingLocationコンポーネントの作成](https://angular.jp/tutorials/first-app/03-HousingLocation)

## [4. インタフェースの作成](https://angular.jp/tutorials/first-app/04-interfaces)

### 1. インタフェースの定義
以下のコマンドでインタフェースを定義する
```cmd
ng generate interface {インタフェース名}
```

## [5. プロパティバインドと@Input](https://angular.jp/tutorials/first-app/05-inputs)
### 1. @Inputのインポート
**housinglocation.component.ts:**
```typescript
import { Component, Input } from '@angular/core';
export class HousinglocationComponent {
  @Input() housingLocation!: HousingLocation; //Non-Nullアサーションを使用するのは、初期値が不要のため
}
```
*この時点ではコンパイルエラー「名前 'housingLocation' が見つかりません」

## [6. プロパティバインドと@Input（続き）](https://angular.jp/tutorials/first-app/06-property-binding)

**プロパティバインド**：HTMLとTypeScriptで変数をシェアする。`@Input`を使用する。
### 1. プロパティバインドを宣言する
**home.component.ts:**
```HTML
<section class="result">
    <app-housinglocation [housingLocation]="housingLocation"></app-housinglocation>
</section>
```
プロパティバインドを記述する際には、次の二つの手順が必要。
1. 渡し手コンポーネントのテンプレートで次の構文を記述。
   ```HTML
   <{受け手コンポーネントのテンプレート名} [attribute]="value">
   </{受け手コンポーネント}>
   ```
   このとき、`attribute`には受け手コンポーネントで定義している変数名、`value`には渡し手コンポーネントの変数名を記述する。*`value`は渡し手コンポーネントのTypeScriptで宣言された変数である。
2. 受け手コンポーネントのTypeScriptに次の構文を記述。
   ```typescript
   export class {受け手コンポーネント}{
    @Input() attribute: {クラス名}
   }
   ```
## [7. インタポーレーションの利用](https://angular.jp/tutorials/first-app/07-dynamic-template-values)
### 1. 変数をテンプレートにInterpolate（補完）する
```HTML
<section class="listing">
    <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior ptoto of {{ housingLocation.name }}"
    >
    <h2 class="listing-heading">{{ housingLocation.name }}</h2>
    <p class="listing-location">{{ housingLocation.city }}</p>
</section>
```
- src: HTMLタグのプロパティ（DOMプロパティ）であるため、プロパティバインド（[attribute]="value"）を使う
- alt: HTMLの属性であるため、インターポーレーション（補完）を使う。属性は文字列として扱われるため、value値が文字列でないことを表現するために`{{...}}`を使う。

## [8. *ngFor構文](https://angular.jp/tutorials/first-app/08-ngFor)
### 1. *ngFor構文を使用する
**home.component.html:**
```HTML
<section class="result">
  <app-housinglocation
    *ngFor="let housingLocation of housingLocationList"
    [housingLocation]="housingLocation"
  >
  </app-housinglocation>
</section>
```
*前提として、**home.component.ts** でHousingLocation[]型の変数 housingLocationList が宣言されている。

## [9. サービスの使用](https://angular.jp/tutorials/first-app/09-services)
### 1. サービスの作成
以下のコマンドを実行し、**housing.service.ts** を作成する
```cmd
ng generate service housing --skip-tests
```
**housing.service.ts:**
```typescript
@Injectable({
  providedIn: 'root' //グローバルに利用可能。app.module.tsの@NgModules.providersに登録不要。
})
export class HousingService {
  constructor() { }
}
```
**home.component.ts** でサービスを使用する。
```typescript
import { HousingService } from '../housing.service';
export class HomeComponent {

  /*housing.service.tsをDIする。@Autowiredみたい*/
  constructor(housingService: HousingService){
    this.housingLocationList = housingService.getAllHousingLocationList();
  }
  housingLocationList: HousingLocation[] = [];
}
```
## [10. ルーティングの使用](https://angular.jp/tutorials/first-app/10-routing)
ルーティング：あるコンポーネントから他のコンポーネントへ誘導する機能。
### 1. ルーティングを定義する
以下のコマンドで **routes.ts** を作成する。アプリケーションのルーティングを記述するファイルである。
```cmd
type null >> routes.ts
```
続いて、 **app.component.ts** へ以下を追記。
```typescript
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterModule],
  ...
```
**app.component.html** のHomeコンポーネントテンプレート指定法を変更。
```diff
+   <a [routerLink]="['/']">
    <header class="brand-name">
      <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
    </header>
+  </a>
<section class="content">
+  <router-outlet></router-outlet>
-  <app-home></app-home>
</section>
```
**app.component.ts** へ **RouterModule** をインポートしたことにより、Angularのルーティング機能である `routerLink` や `router-outlet` を使用することが可能になる。
### 2. ルーティングを追加する
**routes.ts:**
```typescript
const routeConfig: Routes = [
    {   // ルートページでHomeコンポーネントを表示する
        path: '',
        component: HomeComponent,
        title: 'HomePage'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'HomeDetails'
    }
]

export default routeConfig;
```

------
# 99. Tips
## TypeScript
### テンプレートリテラル
テンプレートリテラル：シングルクォートやダブルクォートではない引用符号「``」を使って文字列を記述する方法。これにより、変数を埋め込むことが可能。可読性が向上する。
```TypeScript
const name: string = "太郎";
const templateLiteral: string = `こんにちは、${this.name} さん!`;
console.log(templateLiteral); //こんにちは、太郎 さん!
```
また、改行をそのまま書ける。
```TypeScript
const text: string = `これは1行目
これは2行目
これは3行目
`;
```
## `@NgModule` と `@Component`
### `@NgModule` とは?
Angularアプリはモジュール単位で構成される。`@NgModule`はアプリケーションのメタデータを定義するためのデコレータであり、コンポーネントやサービスをまとめてモジュールを定義する。
|プロパティ|説明|
|-|-|
|`declarations`|モジュール内で使うコンポーネント・ディレクティブ・パイプを登録|
|`imports`|他のモジュールを読み込む|
|`providers`|サービス（DIで利用）を登録|
|`bootstrap`|アプリケーション起動時に表示するルートコンポーネントを指定|
- 例 ) **app.module.ts:**
```typescript
@NgModule({
  declarations: [
    AppComponent,
    MyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### `@Component` とは?
AngularのUIを構成する基本単位。各コンポーネントは**テンプレート（HTML）** 、**ロジック（TypeScript）** 、**スタイル（CSS)** をもつ。

## 最近のAngularバージョンアップデートによる変更
### スタンドアローンコンポーネントの導入
従来のモジュールベース（`@NgModule`）の構造からよりシンプルで柔軟なコンポーネントベースのアーキテクチャへ移行した。これにより **app.module.ts** モジュールファイルを省略し、コンポーネント自体が必要な依存関係を自身で直接インポートすることとなった。
### ルーティング改善
従来はモジュール内でルーティングを定義していたが、スタンドアローンコンポーネント導入に伴い、コンポーネント自体にルートを直接関連付けるようになった。`RouterModule` をコンポーネントが直接インポートし、モジュールを介さずにルーティングを定義できる。

例) **main.ts:** （最新の方式）
```typescript
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes'

bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));
```
** routes.ts **
```typescript
const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'HomePage'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'HomeDetails'
    }
]
export default routeConfig;
```
`bootstrapApplication` とは、Angular15以降で導入された新たなブートストラップ。第1引数にブートストラップ直後に表示するコンポーネントを指定し、第2引数でアプリケーションに依存注入（DI）するサービスやプロバイダー（上記例ではテストサポートツール `provideProtractor` とルーティング機能を提供する `provideRouter` 。

参考（従来の方式））**main.ts:** 
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```
**app.module.ts**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
** app-routing.module.ts **
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### `<router-outlet>` と `<app-hogehoge>`
#### `<router-outlet>` は、Angularルーティングシステムによって表示されるコンポーネントが動的に切り替わる。
#### `<app-hogehoge>` は、Angularのカスタムコンポーネントを示すタグ。

## HTML
### ディレクティブとは？
ディレクティブとは、AngularがHTMLの構造や動作を拡張するための仕組み。3種類のディレクティブがある。

|種類|説明|例|
|-|-|-|
|コンポーネント|HTMLテンプレートを持つ特殊なディレクティブ|`@Component({selector: 'app-home'})`|
|構造ディレクティブ|DOM（HTML要素）の追加・削除を制御|`*ngFor`,`*ngIf`,`*ngSwitch`|
|属性ディレクティブ|要素のスタイルや振る舞いを変更|`[ngClass]`,`[ngStyle]`,`appHighlight`|

コンポーネント `@Component` もディレクティブの１種であり、`selector: 'app-home'`というカスタムHTMLタグを定義してHTMLに`<app-home></app-home>`に埋め込むことができる。

### imgタグ
```HTML
<img
    [src]="https://hogehoge.com/hogehoge.jpg"
    alt="hogehoge photo"
>
```
- src: 画像をフェッチするパス
- alt: 画像を取得できない場合に表示する
## CSS
### CSS基本記法
Angularプロジェクトのルートディレクトリに配置される、**styles.css** は、Angularプロジェクト全体に適用されるグローバルスタイルを記述したもの。

**stypes.css:**
```css
* {/*すべてのHTML要素に適用される*/
    margin: 0;
    padding: 0;
  }
  
  body {/*<body></body>に適用される*/
    font-family: 'Be Vietnam Pro', sans-serif;
  }
  :root {/*CSS変数の定義*/
    --primary-color: #605DC8;
    --secondary-color: #8B89E6;
    --accent-color: #e8e7fa;
    --shadow-color: #E8E8E8;
  }
  
  button.primary {/*<button class="primary"></button>に適用される*/
    padding: 10px;
    border: solid 1px var(--primary-color);
    background: var(--primary-color);
    color: white;
    border-radius: 8px;
  }
  
```
**home.component.css**
```css
.results {/*クラスセレクタ <div class="results"></div>に適用される*/
    display: grid;
    column-gap: 14px;
    row-gap: 14px;
    grid-template-columns: repeat(auto-fill, minmax(400px, 400px));
    margin-top: 50px;
    justify-content: space-around;
}
input[type="text"] {/*属性セレクタ <input type="text"></input>に適用される*/
    border: solid 1px var(--primary-color);/*styles.cssから変数を参照*/
    padding: 10px;
    border-radius: 8px;
    margin-right: 4px;
    display: inline-block;
    width: 30%;
}
button {/*タグセレクタ <button></button>に適用される*/
    padding: 10px;
    border: solid 1px var(--primary-color);
    background: var(--primary-color);
    color: white;
    border-radius: 8px;
}
/*メディアクエリ 特定の画面サイズの時に適用されるスタイル*/
@media (min-width: 500px) and (max-width: 768px) {
.results {
    grid-template-columns: repeat(2, 1fr);
}
input[type="text"] {
    width: 70%;
}   
}
```