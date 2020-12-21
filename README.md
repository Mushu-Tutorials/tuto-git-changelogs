# tuto-git-changelogs

Tutorial for automatic generated changelogs from [this medium article](https://medium.com/better-programming/create-your-own-changelog-generator-with-git-aefda291ea93)

## TODO

- [ ] Externalize the URL of the project in an environment file ([tuto](https://dev.to/deammer/loading-environment-variables-in-js-apps-1p7p)) using `npm i dotenv`.

## Process

Naming convention :

- `feature:` : to commit a new feature
- `chore:` : to commit a new modification that not modify production ([source](https://stackoverflow.com/a/26944812/7998119 "Chore definition"))
- `hotfix:` : to commit a new hotfix

To update changelog automatically via javascript script (and upgrade the version) : `node index.js`