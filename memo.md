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
**package.json:**
```json
  "engines": {
    "node": "^18.19.1 || ^20.11.1 || >=22.0.0"
  }
```
[Node.jsのインストール](https://nodejs.org/ja/download)

[AngularとNode.jsバージョン比較](https://app.unpkg.com/@angular/core@15.1.5/files/package.json)

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
**app.component.ts** へ **RouterModule** をインポートしたことにより、Angularのルーティング機能である `<a [routerLink]>` ディレクティブや `<router-outlet>` タグを使用することが可能になる。
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

## [11. 詳細ページの作成](https://angular.jp/tutorials/first-app/11-details-page)
### 1. 詳細ページへのルーティングボタン追加
前章で追記したルーティング定義のうち、`details/:id` へのルーティングは動的なナビゲーションを提供する。

**routes.ts:**
```typescript
    {
        path: 'details/:id',// HousingLocationクラスの`id`プロパティを識別
        component: DetailsComponent,
        title: 'HomeDetails'
    }
```
詳細ページへのダイナミックルーティング機能を追加する。

**housinglocation.component.html:**
```HTML
    <a [routerLink]="['/details',housingLocation.id]">Learn More</a>
```
属性ディレクティブ `routerLink` には2つのエントリを持つ配列がバインドされた。1つ目はスタティックなURL、2つ目はダイナミックなURLである。

### 2. 詳細ページのロジック
**details.component.ts:**
```typescript
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor(){
    const housingLocationId: number = +this.route.snapshot.params['id'];//明示的に数値型へキャストする必要がある。
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }
}
```
**details.component.html:**
```HTML
<article>
    <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{housingLocation?.name}}"
    >
    <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
            <li>Utils available: {{housingLocation?.availableUnits}}</li>
            <li>Does this location have wi-fi: {{housingLocation?.hasWifi}}</li>
            <li>Does this location have laundry: {{housingLocation?.hasLaundry}}</li>
        </ul>
    </section>
</article>
````
## [12. フォームの利用](https://angular.jp/tutorials/first-app/12-forms)
### 1. ロジックへのフォーム機能の追加
**details.component.ts:**
```typescript
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
~~~
  imports: [CommonModule, ReactiveFormsModule], /*フォーム機能を実装したモジュールのインポート*/
~~~
export class DetailsComponent {
  ~~~
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
```
`FormGroup` と `FormControl` がフォーム機能を実現するデータ型である。`FormControl` は `FormGroup` の基本要素である。
> `FormGroup` はAngularのリアクティブフォームで使用されるフォーム管理クラス。複数の `FormControl` （個々の入力要素）をグループ化して管理する。上記使用例のほかにも以下のような用法がある。
> ```typescript
> console.log(this.applyForm.get('firstName')?.value); //プロパティ名を指定して値を取得
> this.applyForm.patchvalue(  //FormGroupの値を更新
>    firstName:  'Hoge',
>    lastName:   'Fuga',
>    email:      'hogefuga@example.com'
>);
>```
### 2. テンプレートへのフォーム機能の追加
**details.component.html:**
```HTML
    <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" formControlName="firstName" />
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" formControlName="lastName" />
            <label for="email">Email</label>
            <input type="text" id="email" formControlName="email" />
            <button type="submit" class="primary">Apply now</button>
        </form>
    </section>
```
`form`:ユーザが入力するデータを送信するための要素である。`button type="submit"` と `ngSubmit` 、または `submit` ディレクティブが連動してフォーム送信時に何かしらのロジック（関数）を実行できる。
|項目|`ngSubmit`|`sumit`|
|-|-|-|
|何者？|Angularのテンプレートディレクティブ|HTMLの標準フォームディレクティブ|
|機能|フォーム送信時にTypeScript関数を呼び出す|フォームデータをサーバーに送信|
|ページリロード|しない|する（`event.preventDefault()`で防ぐ）|

`form` タグの `formGroup` ディレクティブを使い、`FormGroup` 変数をプロパティバインド。
## [13. 検索機能](https://angular.jp/tutorials/first-app/13-search)
```HTML
<section>
    <form>
        <input type="text" placeholder="Filter by city name" #filter />
        <button type="button" class="primary" (click)="filterLocation(filter.value)">Search</button>
    </form>
</section>
```
`input` タグの `#filter` とは**テンプレートリファレンス変数（ローカル参照変数）** であり、`button` タグから参照できる。

## [14. HTTP通信](https://angular.jp/tutorials/first-app/14-http)
### 1. JSON Serverのインストール
```cmd
npm install -g json-server
```
さらに、Angularプロジェクトルートディレクトリへ **db.json** ファイルを作成する。
```cmd
type nul > db.json
```
**houseing.service.ts** へ定義していたHousingLocationListを**db.json**へJSON形式で記述する。続いて、以下のコマンドを実行してHousingLocationListを返却する疑似サーバーを起動する。
```cmd
json-server --watch db.json
```
上記の手順より、`localhost:3000/locations` へアクセスすると**db.json**へ定義したリストが返却される。
### 2. JSON Serverからデータを取得する
**housing.service.ts:**
```typescript
readonly apiUrl   =   'http://localhost:3000/locations';

  /*HousingLocationリストをすべて返す*/
  async getAllHousingLocationList(): Promise<HousingLocation[]>{
    const locations = await fetch(this.apiUrl);
    return (await locations.json()) ?? [];
  }

  /*Idをキーに検索し、合致したHousingLocationを返す*/
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined>{
    const location = await fetch(`${this.apiUrl}/${id}`);
    return (await location.json()) ?? {}
  }
```
`async`: メソッドを非同期関数として定義する。関数の戻り値が暗黙的に `Promise` 型になる。また、`await` キーワードを使用でき、`Promise` が解決されるまで関数の実行が一時停止する。

`fetch`: 指定されたURLへリソースをリクエストするビルトイン関数。Web標準のJavaScript APIで定義され、ブラウザ環境やNode.js環境で利用できる。HTTPリクエストを行い、`Promise` を返す。
>ビルトイン関数：プログラミング言語が標準で提供する機能。言語のランタイム環境に組み込まれており、特定のライブラリやモジュールをインポートする必要がない。

`await`: `fetch` が完了するまで待機する。`fetch` 関数のが完了すると、 `Promise` が `Response` へ解決される。
**home.component.ts:**
```typescript
  /*housing.service.tsをコンストラクタベースでDI*/
  constructor(housingService: HousingService){
    housingService.getAllHousingLocationList().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
```
**details.component.ts:**
```typescript
  constructor(){
    const housingLocationId: number = +this.route.snapshot.params['id'];
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocations: HousingLocation[]) => {
      this.housingLocation = housingLocations[0];
    });
  }
```
`then`: `Promise` が解決されたときに実行する処理をコールバック形式で定義する。

# Training
## [コンポーネント](https://angular.jp/guide/components)
全てのコンポーネントは次のものが必要。
- TypeScript: ロジックの定義
- HTML: DOMにレンダリングされる内容を制御
- CSS: HTMLでコンポーネントがどのように使用されるかを定義する

Anuglarでは、`@Component` デコレータによってこれらの情報を定義する。`@Component` デコレータへ渡すオブジェクトは、コンポーネントの**メタデータ**といい、`selector` や `template` や `styleUrl` などがある。
### インポート
`@Component` デコレータの `imports` プロパティ配列を使って、コンポーネント外のコンポーネントやディレクティブ、パイプを使用することができる。
>バージョンアップ後のAngularでは、コンポーネントはデフォルトでスタンドアローンであるため、コンポーネント間で直接インポートできる。旧バージョンでは、モジュール構成を採用しており、コンポーネントはスタンドアローンではないので、コンポーネント間で直接インポートすることはできず、`app.module.ts` などのモジュール定義ファイルで`@NgModule`の中でインポートする必要がある。

## [テンプレート](https://angular.jp/guide/templates)

### [概要](https://angular.jp/guide/templates)
テンプレートとは、各コンポーネントがWebページへレンダリングするDOMを定義するもの。通常、***component.ts** の `template` プロパティか ***.component.html** にある。
### [動的なテキスト、プロパティ、属性のバインディング](https://angular.jp/guide/templates/binding)
**バインディング:** コンポーネントのもつデータとテンプレートを連動させる。この接続により、コンポーネントデータの変更がレンダリングされるテンプレートへ自動的に反映させる。

#### ネイティブ要素のプロパティ
全てのHTML要素（タグ）には、対応するDOM表現がある。たとえば、`<button>` HTML要素はDOM内の `HTMLButtonElement` インスタンスに対応する。Angularでは、プロパティバインドの仕組み使い、DOMのプロパティとコンポーネントデータ（変数）をバインドできる。
```html
<button [disabled]="isFormValid">Save</button>
```
#### コンポーネントとディレクティブのプロパティ
要素がAngularコンポーネントのセレクタである場合、プロパティバインドの仕組みを使い、コンポーネント間のデータの受け渡しを可能にする。
```html
<app-hoge [hogeValue]="fugaValue" />
```
上記例では、**hoge.component.ts** の hogeValue 変数と **fuga.component.ts** の fugaValue をバインドする。

## [HTTPクライアント](https://angular.jp/guide/http)
### [概要](https://angular.jp/guide/http)
Angularアプリケーションは、HTTPプロトコル通信用のクライアントサービス `HttpClient` を `@angular/common/http` から提供している。
### [HttpClientの設定](https://angular.jp/guide/http/setup)

------
# Tips
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
**routes.ts:**
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

### `CommonModule`
#### `CommonModule` とは？
`*ngFor` 、`*ngIf` 、`async` パイプなどの基本的なディレクティブを定義するファイル。これらのディレクティブを使用するコンポーネントでは、`@Component` デコレータの`import` 配列に `CommonModule` をインポートする必要がある。

### シングルトンインスタンスやコンポーネントのメタ情報を取得する方法
ここでは、シングルトンインスタンス（サービスなど）やコンポーネントのメタ情報（パスなど）を取得する方法を示す。
#### `@angular/core/inject` 関数
```typescript
import { inject } from '@angular/core';
import { LoggerService } from `./logger.service`;
~~~
export class HogeComponent{
  private logger = inject(Loggerservice); /*直接サービスを注入*/
}
```
スタンドアローンコンポーネントに限り、コンストラクタを使わずにDIが可能。これにより、コンストラクタ関数外のスコープでDIコンテナに依存可能。
#### ファクトリ関数
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',// プロジェクト全体へ provide
  useFactory: () => new ApiService(inject(HttpClient)), // `inject` で `HttpClient` を取得
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get('/api/data');
  }
}
```
プロバイダのファクトリ関数内で依存性を解決できる。
### コンストラクタ
```typescript
import { Component } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-example',
  template: './example.component.html',
  styleUrls: ['./example.component.css'],
})
export class ExampleComponent {
  constructor(private logger: LoggerService) {
    this.logger.log('ExampleComponent initialized!');
  }
}
```
コンストラクタを使ったDIはコンベンショナルだが、コンストラクタ関数スコープでしかサービスを使用できないのが難点。

### Nullish Coalescing Operator(`??`)
`??` は、 `null` または `undefined` の場合にのみデフォルト値を適用する演算子である。

**例)**
```typescript
const result = this.value ?? 'defaultstr';// value がnullまたはundefinedならデフォルト値`defaultstr`
```

### `forkJoin` 関数
RxJS（Reactive Extensions for JavaScript）の一部の関数であり、ビルトイン関数ではない。RxJSとは、リアクティブプログラミングをサポートするためのライブラリで、非同期処理やイベント駆動型プログラム機能を提供する。
`forkJoin` とは、複数のObservableがすべて完了するまで待ち、完了時に単一のObservableとして返す。つまり、非同期処理の並列実行と同時返却機能である。
```cmd
npm install rxjs
```
```typescript
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const observable1 = of('Hello').pipe(delay(1000));
const observable2 = of('World').pipe(delay(2000));
const observable3 = of('!').pipe(delay(3000));

forkJoin([observable1, observable2, observable3]).subscribe(result => {
  console.log(result); // ['Hello', 'World', '!']
});
```
### `of` 関数
RxJS関数の一部の関数であり、ビルトイン関数ではない。任意の値を受け取り、それらを順番に発行するObservableを返す。
```typescript
import { of } from 'rxjs';

const observable$ = of(1,2,3,4,5);

observable$.subscripbe(value => console.log(value));// 1,2,3,4,5
```
`observable$` のようにObservable型の変数名の末尾には '$' を付けるのが慣習。これにより可読性が向上する。

### `pipe` 関数
RxJSの一部の関数であり、ビルトイン関数ではない。`pipe` 関数とは、Observableオブジェクトの操作をチェーンするためのメソッドで、**複数の演算子を順番に適用できる**。
```typescript
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

constructor(private http: HttpClient){}

getData(){
  this.http.get<any[]>('https://api.example.com/data').pipe(
    filter(data => data.length > 0),
    map(data => data.map(item => item.name))
  )
  .subscribe({
    next: (names) => {
      console.log(`name:${names}`);
    },
    error: (error) =>{
      console.error(error);
    }
  }
  });
}
```
### `subscribe` 関数
`subscribe` 関数はObservable型を受け取るのに使用される。Observableのデータストリームに対してリスナー（コールバック）を設定し、データが発行されるたびにそのリスナーが呼び出される。３つのコールバック関数を引数として受け取る。
1. `next` ハンドラ: Observableがデータを発行するたびに呼ばれる。発行されたデータが渡される。
2. `error` ハンドラ: Observableがエラーを発行したときに呼び出される。エラー情報が渡される。
3. `complete` ハンドラ: Observableが完了したときに呼び出される。データは渡されない。
```typescript
constructor(private http: HttpClient){}
data: any;
ngOnInIt(){
  this.http.get('https://example.com/data')
    .subscribe(
      next: (response: any) => {  // ちなみに`next: ` は省略可能
        console.log(response);
        this.data = response;
      },
      error: (error: error) => {
        console.error(error);
      },
      complete: () =>{
        console.log('Request Completed');
      }
    )
}
```

### `Promise` と `Observable` 


## HTML
### ディレクティブとは？
ディレクティブとは、AngularがHTMLの構造や動作を拡張するための仕組み。3種類のディレクティブがある。

|種類|説明|例|
|-|-|-|
|コンポーネント|HTMLテンプレートを持つ特殊なディレクティブ|`@Component({selector: 'app-home'})`|
|構造ディレクティブ|DOM（HTML要素）の追加・削除を制御|`*ngFor`,`*ngIf`,`*ngSwitch`|
|属性ディレクティブ|要素のスタイルや振る舞いを変更|`[ngClass]`,`[ngStyle]`,`appHighlight`|

コンポーネント `@Component` もディレクティブの１種であり、`selector: 'app-home'`というカスタムHTMLタグを定義してHTMLに`<app-home></app-home>`に埋め込むことができる。

### `img` タグ
```HTML
<img
    [src]="https://hogehoge.com/hogehoge.jpg"
    alt="hogehoge photo"
>
```
- src: 画像をフェッチするパス
- alt: 画像を取得できない場合に表示する
### `article` タグと `section` タグ
|項目 |`<article>`|`<section>`|
|-|-|-|
|意味|独立したコンテンツ|関連する内容のグループ化|
|使用例|ブログ記事・投稿・レビュー|章・トピックの集まり・Webページの構造化|

### `label` と `input`（いまさら聞けない）
```HTML
    <label for="first-name">First Name</label>
    <input type="text" id="first-name" formControlName="firstName" />
    <button type="submit" class="primary">Apply now</button>
```
`label`: フォームの入力フィールドに対して説明をつける。`for` 属性を使うと、対応する `id` をもつ `input` にラベルクリック時にフォーカスする。

`input`: ユーザが情報を入力するフィールド。`type` 属性で入力の種類（テキスト、パスワードなど）を指定できる。また、`formControlName` 属性を使うと、対応する `FormControl` を持つ `FormGroup` と紐づけ可能。

### DOM（Dociment Object Model）
**DOM**: Webページの構造化された表現を提供するプログラミングインタフェース。HTMLやXML文書をプログラムから操作できるようにする仕組み。以下のノードタイプがある。
- 要素ノード: HTMLタグ。例）`<html>`  `<body>` 
- テキストノード: 要素内のテキスト。例）`"Hello World"`
- 属性ノード: 要素の属性。例）`class="example"`
- ドキュメントノード: DOMツリー全体を表すノード。

TypeScriptからDOMを操作することも可能。
```typescript
const heading = document.getElementById('myHeading');
const paragraph = document.querySelector('p');
```

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