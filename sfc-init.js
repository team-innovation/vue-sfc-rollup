#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const prompts = require('prompts');
const ejs = require('ejs');
const chalk = require('chalk');
const updateCheck = require('update-check');
const minimist = require('minimist');

const pkg = require('./package.json');
const helpers = require('./lib/helpers');

// Prepare container for response data
const responses = {
  update: false,
  version: '',
  mode: '',
  npmName: '',
  componentName: '',
  language: '',
  savePath: '',
};

// Get any args passed
const argv = minimist(process.argv.slice(2));

// Create function to display update notification at script completion
function displayUpdateMessage() {
  /* eslint-disable no-console */
  if (responses.update) {
    const { latest } = responses.update;
    if (latest) console.log(`\r\n${chalk.black.bgRed(' UPDATE AVAILABLE ')}${chalk.red('-->')} The latest version of ${pkg.name} is ${chalk.yellow(latest)}\r\n`);
  }
  /* eslint-enable no-console */
}

// Create cancel function to exit the process
function onCancel() {
  // eslint-disable-next-line no-console
  console.log('User canceled. Goodbye!');
  displayUpdateMessage();
  process.exit();
}

// Create async prompt functions
async function checkForUpdates() {
  let update = null;
  try {
    update = await updateCheck(pkg);
  } catch (err) {
    const errIntro = ` ${pkg.name} failed to check for updates `;
    // eslint-disable-next-line no-console
    console.error(`\r\n${chalk.black.bgRed(errIntro)}${chalk.red('-->')} ${err}\r\n`);
    update = null;
  }

  if (update) {
    responses.update = update;
  }
}
async function getVersion() {
  // If provided via arg, skip this step
  if (argv.version) {
    responses.version = argv.version;
    return;
  }

  // Not provided via arg, show prompt
  const question = {
    type: 'select',
    name: 'version',
    message: 'Which version of Vue are you writing for?',
    choices: [
      { title: 'Vue 2', value: 2 },
      { title: 'Vue 3', value: 3 },
    ],
    initial: 0,
  };
  const response = await prompts(
    question,
    { onCancel },
  );
  responses.version = response.version;
}
async function getMode() {
  // If provided via arg, skip this step
  if (argv.mode) {
    responses.mode = argv.mode;
    return;
  }

  // Not provided via arg, show prompt
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
}

async function getName() {
  const { mode } = responses;
  let tmpKebabName = '';

  // If provided via arg, skip this step
  if (argv.name) {
    tmpKebabName = helpers.kebabcase(argv.name).trim();
    responses.npmName = argv.name;
    responses.componentName = helpers.convertScope(tmpKebabName);
    responses.savePath = helpers.convertScope(tmpKebabName, '_');
    return;
  }

  // Not provided via arg, show prompts
  const questions = [
    {
      type: 'text',
      name: 'npmName',
      message: `What is the npm name of your ${mode}?`,
      validate(val) {
        const kebabName = helpers.kebabcase(val).trim();
        return (kebabName !== '');
      },
    },
  ];
  if (mode === 'component') {
    questions.push({
      type: 'text',
      name: 'componentName',
      message: 'What is the kebab-case tag name for your component?',
      initial() { return helpers.convertScope(tmpKebabName); },
      validate(val) {
        const kebabName = helpers.kebabcase(val).trim();
        return (kebabName !== '');
      },
    });
  }
  const response = await prompts(
    questions,
    {
      onSubmit(prompt, answer) {
        if (prompt.name === 'npmName') tmpKebabName = helpers.kebabcase(answer).trim();
        if (prompt.name === 'componentName') tmpKebabName = helpers.kebabcase(answer).trim();
      },
      onCancel,
    },
  );
  responses.npmName = response.npmName;
  responses.componentName = response.componentName
    ? response.componentName
    : helpers.convertScope(tmpKebabName);
  responses.savePath = `./${helpers.convertScope(helpers.kebabcase(responses.npmName), '_')}`;
}

async function getLanguage() {
  // If provided via arg, skip this step
  if (argv.lang) {
    responses.language = argv.lang;
    return;
  }

  // Not provided via arg, show prompt
  const { mode } = responses;
  const question = {
    type: 'select',
    name: 'language',
    message: `Will this ${mode} be written in JavaScript or TypeScript?`,
    choices: [
      { title: 'JavaScript', value: 'js' },
      { title: 'TypeScript', value: 'ts' },
    ],
    initial: 0,
  };
  const response = await prompts(
    question,
    { onCancel },
  );
  responses.language = response.language;
}

async function getSavePath() {
  // If write provided via arg, skip this step
  if (argv.write) return;

  // Write not provided via arg, show prompt
  const { mode, savePath } = responses;
  const questions = [
    {
      type: 'text',
      name: 'savePath',
      message: `Enter a location to save the ${mode} files:`,
      initial() { return savePath; },
      validate: (val) => {
        // Validate path does not exist, then create directory
        const pathExists = fs.existsSync(val);
        return !pathExists;
      },
    },
  ];
  const response = await prompts(
    questions,
    {
      onCancel,
    },
  );
  responses.savePath = path.resolve(response.savePath);
}

// Create function to scaffold based on response data
function scaffold(data) {
  // Stop prompting for input, start processing
  const componentNamePascal = helpers.pascalify(data.componentName);
  const vars = {
    npmName: data.npmName,
    componentNamePascal,
    componentName: data.componentName,
    version: data.version,
    ts: data.language === 'ts',
  };
  const files = {
    common: [
      { 'build/rollup.config.ts': `build/rollup.config.${data.language}` },
      { 'src/entry.esm.ts': `src/entry.esm.${data.language}` },
      { 'src/entry.ts': `src/entry.${data.language}` },
      { 'dev/serve.ts': `dev/serve.${data.language}` },
      'dev/serve.vue',
      { '_template.browserslistrc': '.browserslistrc' },
      { '_template.gitignore': '.gitignore' },
      'babel.config.js',
      (data.language === 'ts' && data.version === 2) ? 'shims-tsx.d.ts' : null,
      (data.language === 'ts') ? 'shims-vue.d.ts' : null,
      (data.language === 'ts') ? 'tsconfig.json' : null,
    ],
    single: [
      { 'src/component.vue': `src/${data.componentName}.vue` },
      { 'single-package.json': 'package.json' },
    ],
    library: [
      { 'src/lib-components/component.vue': `src/lib-components/${data.componentName}-sample.vue` },
      { 'src/lib-components/index.ts': `src/lib-components/index.${data.language}` },
      { 'library-package.json': 'package.json' },
    ],
  };

  const fileActions = [
    ...files.common.filter((entry) => entry), // remove null entries
    ...files[data.mode === 'component' ? 'single' : 'library'].filter((entry) => entry), // remove null entries
  ];

  fileActions.forEach((entry) => {
    // If action is just a string, copy directly. If object,
    // rename from key to value
    let srcPath;
    let destPath;
    if (typeof entry === 'string') {
      srcPath = entry;
      destPath = entry;
    } else {
      [[srcPath, destPath]] = Object.entries(entry);
    }
    srcPath = path.join.apply(null, [
      __dirname,
      'templates',
      data.mode === 'component' ? 'single' : 'library',
      ...srcPath.split('/'),
    ]);
    destPath = path.join.apply(null, [
      data.savePath,
      ...destPath.split('/'),
    ]);
    helpers.ensureDirectoryExists(destPath);
    fs.writeFileSync(
      destPath,
      ejs.render(fs.readFileSync(srcPath).toString(), vars),
    );
  });

  // Display completion messages
  let completeMessage;
  if (data.mode === 'component') {
    completeMessage = `
  Init is complete, your files have been generated and saved into the directory you specified above.
  Within that directory, use src/${data.componentName}.vue as a starting point for your SFC.

  When you're ready, run \`npm run build\` to generate the redistributable versions.`;
  }
  if (data.mode === 'library') {
    completeMessage = `
  Init is complete, your files have been generated and saved into the directory you specified above.
  Within that directory, you will find a sample SFC at src/lib-components/${data.componentName}-sample.vue.
  **NOTE** Any components you wish to expose as part of your library should be saved in that directory, and
  an entry must be added to src/lib-components/index.${data.language} so rollup is aware of it`;

    if (data.language === 'ts') {
      completeMessage = `${completeMessage} and typescript users can
  receive proper support`;
    }
    completeMessage = `${completeMessage}.

  When you're ready, run npm run build to generate the redistributable versions.`;
  }
  // eslint-disable-next-line no-console
  console.log(completeMessage);
}

// Begin asking for input, then scaffold
checkForUpdates()
  .then(getVersion)
  .then(getMode)
  .then(getName)
  .then(getLanguage)
  .then(getSavePath)
  .then(() => {
    scaffold(responses);
    displayUpdateMessage();
  });
