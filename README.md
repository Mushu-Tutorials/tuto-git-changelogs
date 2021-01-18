# tuto-git-changelogs

*Submodule of [tuto-git](https://github.com/Mushu-Tutorials/tuto-git "tuto-git")*

Tutorial for automatic generated changelogs from [this medium article](https://medium.com/better-programming/create-your-own-changelog-generator-with-git-aefda291ea93)

## TODO

- [ ] Externalize the URL of the project in an environment file ([tuto 1](https://dev.to/deammer/loading-environment-variables-in-js-apps-1p7p), [tuto 2](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)) using `npm i dotenv`.

## Process

Naming convention :

- `feature:` : to commit a new feature
- `chore:` : to commit a new modification that not modify production ([source](https://stackoverflow.com/a/26944812/7998119 "Chore definition"))
- `hotfix:` : to commit a new hotfix

To update changelog automatically via javascript script (and upgrade the version) : `node index.js`