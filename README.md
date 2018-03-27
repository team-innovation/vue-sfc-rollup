# vue-sfc-rollup

The purpose of this project is to provide the minimal setup necessary to compile a Vue Single File Component (SFC) into a form ready to share via npm. At present, this should be considered *alpha* software, and is subject to quite a bit of change.

The only files of real consequence at the moment are the files located inside the `templates` directory of the repository. If you were to copy those files into another directory and replace the few {{ variables }} found therein with actual values, you would have a working SFC rollup process.

In the project root, there is a package.json itself along with a file to provide a wizard-like experience to get started.

## Using the sfc-init wizard

After cloning the repository, execute `npm install` to download the single dependency this repository itself has. Once this is done, execute `npm run sfc-init` to start the wizard.

The wizard will prompt for the following:

  - npm name: This is how people will find your component in npm. Please refer to [the official npm docs](https://docs.npmjs.com/files/package.json#name) for details of what to enter here
  - component name: This is the kebab-case version of your SFC component name - what your component's tag would be if you were to use this in an HTML page or another component. Since any kebab-case tag name would also be a safe file name, this will also be the name of the generated files.

After prompting you for this information, the wizard then creates copies the files found in the `templates` directory and performs the forementioned {{ variables }} replacement using the information enterd.

## Developing your SFC

vue-sfc-rollup is currently focused on packaging your SFC for distribution via npm. The Vue cli is excellent for the actual development process of your SFC, and it is recommended you use the official tooling.

With v3 of the Vue cli installed globally, you can truly develop your SFC with zero conf just by entering the following commands:

```bash
cd ./components/component-name
vue serve ./src/component.vue
```

This will start up a webpack dev server with hot reloading and all the other awesomeness!

## Packaging your SFC

Once your development is done, it's time to package your component to publish to npm. The actual process of [publishing to npm](https://docs.npmjs.com/getting-started/publishing-npm-packages) is left up to you, but the whole purpose of this project is to compile your SFC so that it's packaged and ready to go.

Navigate to the component directory in your terminal, then execute `npm run build` to start the build process. It should compile 3 files for you which match the `main`, `module`, and `unpkg` properties listed in your package.json file.

Once these files are generated, you're ready to go!