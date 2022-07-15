# DEPRECATED

vue-sfc-rollup was created at a time when documentation and tooling to help get vue components/libraries published to npm was difficult to come by. The ecosystem has since evolved to include more "official" tooling that accomplishes the same things vue-sfc-rollup did. For this reason, vue-sfc-rollup is now considered deprecated.

The recommended replacement is [vite](https://vitejs.dev), specifically the ["library build"](https://vitejs.dev/guide/build.html#library-mode) configuration. To scaffold the files needed, you can run `npm create vite` as described in [scaffolding your first vite project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project). The process will allow you to create a Vue project complete with top-notch dev server, rollup-based build process, and optional Typescript and CSS preprocessor support (LESS/SCSS/Stylus/etc.)

The conventions recommended here regarding wrapper files for packaging your SFC/Library, including library index files, are still a great way to organize your files within the scaffolding provided by vite.

---

## vue-sfc-rollup

vue-sfc-rollup is a CLI templating utility that scaffolds a minimal setup for compiling a Vue Single File Component (SFC) - or library of multiple SFCs - into a form ready to share via npm. It doesn't assume any particular flavor of CSS or docs generator, so you can use what you're already used to. It's the fastest way to produce npm-ready vue components!

### TL;DR
Install globally
```bash
# Install globally (recommended)
npm install -g vue-sfc-rollup
sfc-init
```
**OR** use via npx
```bash
# For immediate, no-install usage
npx vue-sfc-rollup
```
Then...
```bash
# Fill in prompts

# Navigate to library folder
cd path/to/my-component-or-lib
npm install

# Do dev stuff
npm run serve

# Run build process
npm run build

# Ready to publish!
```


### Details

The vue-sfc-rollup utility scaffolds the essential files you need to kick off your SFC development. These files include:
- a minimal [rollup](https://rollupjs.org) config
- a corresponding package.json file with build/dev scripts and dependencies
- a minimal babel.config.js and .browserslistrc file for transpiling
- two wrappers used by rollup when packaging your SFC
- a sample SFC to kick-start development
- a sample usage file which can be used to load and test your component/library during development

In library mode, there is also an 'index' which declares the components exposed as part of your library.

When developing typescript-based components/libraries, the following supporting files will also be created:
- The basic typescript shim declaration file(s) common to vue-typescript development
- A basic tsconfig.json file

If you wish to integrate this into an existing SFC, please check out [the vue-sfc-rollup source](https://github.com/team-innovation/vue-sfc-rollup). The files generated by this utility are located inside the `templates` directory of the repository. Merge the important bits of those file with your existing code, and you'll be good to go.

#### Install

If you just want to try [vue-sfc-rollup](https://www.npmjs.com/package/vue-sfc-rollup), you can run it directly via `npx vue-sfc-rollup`.

For repeated use, however, you really should install it globally. To do so, simply open a terminal and execute the following:

```bash
npm install -g vue-sfc-rollup
```

Now, whenever you want to start a new component, you can just type `sfc-init` to run the wizard, and it will scaffold a new SFC for you!

#### Using the vue-sfc-rollup wizard

Using the vue-sfc-rollup wizard is simple. With vue-sfc-rollup installed globally, enter the following:
```bash
sfc-init
# Fill in prompts
```
The wizard will then prompt you for the following:

  - *select vue version*: Declare whether you are writing a component for Vue 2 or Vue 3
  - *select mode*: Declare whether you want to scaffold a single component or a library of components.
  - *npm name*: This is how people will find your component/library in npm. Please refer to [the official npm docs](https://docs.npmjs.com/files/package.json#name) for details of what to enter here.
  - *component name* (Single Component Mode Only): This is the kebab-case version of your SFC component name - what your component's tag would be if you were to use this in an HTML page or another component. Since any kebab-case tag name would also be a safe file name, this will also be the name of the generated files.
  - *javascript/typescript*: Do you wish to use typescript to develop your component/library?
  - *save path*: Where do you want to save this component? By default, the wizard will use your current directory and create a new folder based off of your npm name (eg. ./my-component-or-library).

After prompting you for this information, the wizard then creates copies of the files found in the `templates` directory and performs some variable replacement using the information entered.

#### Using the vue-sfc-rollup cli flags

For those who use this utility frequently and/or in automated processes, vue-sfc-rollup supports flags to specify the answers for all questions in the prompts. For example:

```bash
sfc-init --version=2 --mode=component --name=@scope/sampleComponent --lang=js --write

sfc-init --version=3 --mode=library --name=sampleLibrary --lang=ts
```

The first command in the example would scaffold a single vue 2 component with the npm name of `@scope/sampleComponent`, written in plain javascript, in the directory `./scope_sample-component`. It would write the files immediately.

The second command would scaffoled a vue 3 library with the npm name of `sampleLibrary`, written in typescript, and would suggest the directory `sample-library`, but would not write the files immediately, prompting for that last step instead.

All flags are optional, and the cli will prompt for values covered by flags which were missing.

#### Developing your SFC

vue-sfc-rollup is focused on packaging your SFC for distribution via npm. The [Vue CLI](https://cli.vuejs.org/) is excellent for the actual development process of your SFC, and vue-sfc-rollup comes pre-wired to use this process. With the Vue CLI installed, you can truly develop your SFC with zero configuration just by entering the following commands:

```bash
# Navigate to library folder
cd path/to/my-component-or-lib
npm install

# Do dev stuff
npm run serve
```

This will start up a webpack dev server with hot reloading and all the other awesomeness!

> **_NOTE:_** The code you write in your SFC will be transpiled by babel, allowing you the use of many modern features in your code. Babel is configured with babel/preset-env, so the code transpiled will target the environments specified in your `.browserslistrc` file. You should indicate supported environments in your component/library `README.md` file, as this requirement is passed on to users of your module, including those using bundlers. If this is a concern, you might suggest users add your component to their list of [transpileDependencies](https://cli.vuejs.org/config/#transpiledependencies) list.
>
> It is also possible to [configure babel/preset-env to always apply certain transformations](https://babeljs.io/docs/en/babel-preset-env#include) that fall outside those automatically applied. For example, webpack 4 is unable to handle optional chaining and nullish coalescing. Babel/preset-env might indicate it is widely supported by browsers, but build processes still running webpack 4 would crash when encountering this code.

### Packaging your SFC

Once your development is done, it's time to package your component to publish to npm. The actual process of [publishing to npm](https://docs.npmjs.com/getting-started/publishing-npm-packages) is left up to you, but the whole purpose of this project is to compile your SFC/library so that it's packaged and ready to go.

```bash
# Navigate to library folder
cd path/to/my-component-or-lib

# Run build process
npm run build

# Rollup does its thing...done!
# Ready to publish!
```

Running the build script results in 3 compiled files in the `dist` directory, one for each of the `main`, `module`, and `unpkg` properties listed in your package.json file. With these files generated, you're ready to go!
