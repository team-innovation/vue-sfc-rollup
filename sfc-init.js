#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const prompts = require('prompts');
const ejs = require('ejs');

// Helpers for creating kebab-case/PascalCase versions of string
const pascalify = (str) => {
  const camelized = str.replace(/-([a-z])/g, c => c[1].toUpperCase());
  return camelized.charAt(0).toUpperCase() + camelized.slice(1);
};
const kebabcase = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();

// Helper to replace vars in files
const replaceVars = function replaceVars(str, vars) {
  return ejs.render(str, vars);
};

// Helper to ensure directory exists before writing file to it
const ensureDirectoryExists = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  return fs.mkdirSync(dirname);
};

// Create cancel function to exit the process
function onCancel() {
  // eslint-disable-next-line no-console
  console.log('User canceled. Goodbye!');
  process.exit();
}
// Prepare container for response data
const responses = {
  mode: '',
  npmName: '',
  componentName: '',
  savePath: '',
};

// Create async prompt functions
async function getMode() {
  const question = {
    type: 'select',
    name: 'mode',
    message: 'Is this a single component or a library?',
    choices: [
      { title: 'Single Component', value: 'component' },
      { title: 'Library', value: 'library' },
    ],
    initial: 0,
  };
  const response = await prompts(
    question,
    { onCancel },
  );
  responses.mode = response.mode;
  return response.mode;
}

async function getName(mode) {
  let tmpKebabName = '';
  let tmpSavePath = '';
  const questions = [
    {
      type: 'text',
      name: 'npmName',
      message: `What is the npm name of your ${mode}?`,
      validate(val) {
        const kebabName = kebabcase(val).trim();
        return (kebabName !== '');
      },
    },
  ];
  if (mode === 'component') {
    questions.push({
      type: 'text',
      name: 'componentName',
      message: 'What is the kebab-case tag name for your component?',
      initial() { return tmpKebabName; },
      validate(val) {
        const kebabName = kebabcase(val).trim();
        return (kebabName !== '');
      },
    });
  }
  questions.push({
    type: 'text',
    name: 'savePath',
    message: `Enter a location to save the ${mode} files:`,
    initial() { return `./${tmpSavePath}`; },
    validate: (val) => {
      // Validate path does not exist, then create directory
      const pathExists = fs.existsSync(val);
      return !pathExists;
    },
  });
  const response = await prompts(
    questions,
    {
      onSubmit(prompt, answer) {
        if (prompt.name === 'npmName') tmpKebabName = kebabcase(answer).trim();
        if (prompt.name === 'componentName') tmpKebabName = kebabcase(answer).trim();
        tmpSavePath = tmpKebabName;
      },
      onCancel,
    },
  );
  responses.npmName = response.npmName;
  responses.componentName = response.componentName ? response.componentName : tmpKebabName;
  responses.savePath = path.resolve(response.savePath);
  return response;
}

// Create function to scaffold based on response data
function scaffold(data) {
  // Stop prompting for input, start processing
  const componentNamePascal = pascalify(data.componentName);
  const vars = {
    npmName: data.npmName,
    componentNamePascal,
    componentName: data.componentName,
  };
  const newFiles = {
    package: '',
    rollupConfig: '',
    entryjs: '',
    libDev: '',
    libExports: '',
    component: '',
  };
  const paths = {
    package: path.join(data.savePath, 'package.json'),
    rollupConfig: path.join(data.savePath, 'build', 'rollup.config.js'),
    entryjs: path.join(data.savePath, 'src', 'entry.js'),
    libDev: null,
    libExports: null,
    component: null,
  };

  // Single component mode
  if (data.mode === 'component') {
    newFiles.package = replaceVars(
      fs.readFileSync(path.join(__dirname, 'templates', 'single', 'single-package.json')).toString(),
      vars,
    );
    newFiles.rollupConfig = replaceVars(
      fs.readFileSync(path.join(__dirname, 'templates', 'single', 'build', 'rollup.config.js')).toString(),
      vars,
    );
    newFiles.entryjs = replaceVars(
      fs.readFileSync(path.join(__dirname, 'templates', 'single', 'src', 'entry.js')).toString(),
      vars,
    );
    delete newFiles.libDev;
    delete newFiles.libExports;
    newFiles.component = replaceVars(
      fs.readFileSync(path.join(__dirname, 'templates', 'single', 'src', 'component.vue')).toString(),
      vars,
    );
    delete paths.libDev;
    delete paths.libExports;
    paths.component = path.join(data.savePath, 'src', `${data.componentName}.vue`);
  }

  // Library mode
  if (data.mode === 'library') {
    newFiles.package = replaceVars(
      fs.readFileSync(path.join(__dirname, 'templates', 'library', 'library-package.json')).toString(),
      vars,
    );
    newFiles.rollupConfig = replaceVars(
      fs.readFileSync(path.join(__dirname, 'templates', 'library', 'build', 'rollup.config.js')).toString(),
      vars,
    );
    newFiles.entryjs = replaceVars(
      fs.readFileSync(path.join(__dirname, 'templates', 'library', 'src', 'entry.js')).toString(),
      vars,
    );
    newFiles.libDev = replaceVars(
      fs.readFileSync(path.join(__dirname, 'templates', 'library', 'src', 'lib-dev.vue')).toString(),
      vars,
    );
    newFiles.libExports = replaceVars(
      fs.readFileSync(path.join(__dirname, 'templates', 'library', 'src', 'lib-components', 'index.js')).toString(),
      vars,
    );
    newFiles.component = replaceVars(
      fs.readFileSync(path.join(__dirname, 'templates', 'library', 'src', 'lib-components', 'component.vue')).toString(),
      vars,
    );
    paths.libDev = path.join(data.savePath, 'src', 'lib-dev.vue');
    paths.libExports = path.join(data.savePath, 'src', 'lib-components', 'index.js');
    paths.component = path.join(data.savePath, 'src', 'lib-components', `${data.componentName}-sample.vue`);
  }

  Object.keys(paths).forEach((key) => {
    ensureDirectoryExists(paths[key]);
    fs.writeFileSync(paths[key], newFiles[key]);
  });

  // Display completion messages
  let completeMessage;
  if (data.mode === 'component') {
    completeMessage = `
  Init is complete, your files have been generated and saved into the directory you specified above.
  Within that directory, use src/${data.componentName}.vue as a starting point for your SFC.
  When you're ready, run \`npm run build\` to generate the redistributable versions.

  `;
  }
  if (data.mode === 'library') {
    completeMessage = `
  Init is complete, your files have been generated and saved into the directory you specified above.
  Within that directory, you will find a sample SFC at src/lib-components/${data.componentName}-sample.vue.
  Any components you wish to expose as part of your library should be saved in that directory, and
  an entry must be added to src/lib-components/index.js so that rollup is aware of it. When you're
  ready, run \`npm run build\` to generate the redistributable versions.

  `;
  }
  // eslint-disable-next-line no-console
  console.log(completeMessage);
}

// Begin asking for input, then scaffold
getMode()
  .then(getName)
  .then(() => {
    scaffold(responses);
  });
