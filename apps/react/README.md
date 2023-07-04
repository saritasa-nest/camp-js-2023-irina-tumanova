# react-camp-boilerplate

React project boilerplate for JS camp. Contains examples of how features, components, Redux store, routing and etc. should be implemented. When you start working on your own React project, update its name and description, remove code examples.

## Available Scripts

For this project you can run the following scripts:

### `npm run react:serve`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run react:build`

Builds the app for production to the `dist` folder at the workspace root.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run react:lint`

Runs `ESLint` for the project.

### `npm run react:stylelint`

Runs `Stylelint` for the project.

To add a new script or change the existing ones, read the corresponding [Nx docs](https://nx.dev/configuration/projectjson) first and then make changes to the `project.json`[project.json] file in the current directory

## Folder structure

```text
src
├── api
│   ├── services
│   ├── config.ts
│   └── index.ts
├── assets
├── components
├── features
├── routes
│   └── guards
├── store
├── theme
└── utils
```

## Component file structure

```text
CustomButton
├── CustomButton.tsx
├── CustomButton.module.css
└── index.ts
```
