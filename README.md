# gh-add-people-to-repo
Organizationのリポジトリに、そのOrganizationに属するチームのアクセス権を追加するスクリプト。  

## 使い方

### GitHubのアクセストークンの設定
環境変数`GITHUB_TOKEN`で取得できるようにしておく。  

### 依存関係のインストール

```
npm i
```

### 実行例

- Organization: example-org
- Repository: example-org/some-repo
- Team: example-org/developer

`example-org/developer`に`example-org/some-repo`のアクセス権限を追加。  

```
node index.js -o example-org -t developer -r some-repo 
```

権限はデフォルトでは`pull`になります。`admin`権限など、その他の権限で追加したいときは`-p`オプションを使います。

```
node index.js -o example-org -t developer -r some-repo -p admin
```

### オプション
```
Options:
  -o, --org <string>                                                   Organization name (owner)
  -t --team <string>                                                   Team Slug (without organization name)
  -r --repo <string>                                                   Repository Name (without organization name)
  -p --permission <"pull" | "push" | "admin" | "maintain" | "triage">  Permission (default pull) (default: "pull")
  -h, --help                                                           display help for command
```

## Licence
MIT
