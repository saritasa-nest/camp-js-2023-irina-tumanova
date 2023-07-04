# angular-camp-boilerplate

Angular project boilerplate for JS camp. When you start working on your own Angular project, update its name and description, remove code examples.

## Available Scripts

For this project you can run the following scripts:

### `npm run angular:serve`

Runs the app in the development mode.\
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

The page will reload if you make edits.

### `npm run angular:build`

Builds the app for production to the `dist` folder at the workspace root.

### `npm run angular:development`

Builds the app for development to the `dist` folder at the workspace root.

### `npm run angular:lint`

Runs `ESLint` for the project.

### `npm run angular:stylelint`

Runs `Stylelint` for the project.

To add a new script or change the existing ones, read the corresponding [Nx docs](https://nx.dev/configuration/projectjson) first and then make changes to the `project.json`[project.json] file in the current directory

## Folder structure

```text
src
├── app
│   └── features
├── assets
├── core
│   ├── guards
│   ├── interceptors
│   ├── services
│   └── utils
├── environments
├── shared
│   ├── components
│   └── directives
└── theme
    └── elements
```

## How to generate angular entities

Open angular folder in terminal and use command: 
```
nx generate @nrwl/angular:{entity-type} {entity-name}
# or 
nx g @nrwl/angular:{entity-type} {entity-name}
```
If the `defaultCollection` property in `nx.json` is `@nrwl/angular` you can use these commands:
```
nx generate {entity-type} {entity-name}
# or
nx g {entity-type} {entity-name}
```
See entity types and details about angular generator [here](https://angular.io/cli/generate#ng-generate)

## How to add angular libraries to the project
1. Install package `npm install {library}`
2. Add library to project with nx cli `nx g {library}:ng-add`

### For example:
```
npm install @angular/material
nx g @angular/material:ng-add
```
