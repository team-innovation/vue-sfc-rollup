const path = require('path');
const fs = require('fs');
const readlineSync = require('readline-sync');

// Helpers for creating kebab-case/PascalCase versions of string
const pascalify = str => {
    const camelized = str.replace(/-([a-z])/g, c => c[1].toUpperCase());
    return camelized.charAt(0).toUpperCase() + camelized.slice(1);
};
const kebabcase = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()

// Helper to replace vars in files
const replaceVars = function replaceVars(str, vars) {
    let newstr = str;
    Object.keys(vars).forEach((key) => {
        const rx = new RegExp('{{\\s?'+key+'\\s?}}', 'g');
        newstr = newstr.replace(rx,vars[key]);
    });
    return newstr;
}

// Helper to ensure directory exists before writing file to it
const ensureDirectoryExists = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExists(dirname);
    fs.mkdirSync(dirname);
};

// Prompt user for input to populate template files
const npmName = readlineSync.question('What is the npm name of your component? ');
const componentName = readlineSync.question('What is the kebab-case tag name for your component? ('+kebabcase(npmName)+')', {
    defaultInput: kebabcase(npmName),
});
const componentNamePascal = pascalify(componentName);
replaceVars('afd',{
    npmName,
    componentName,
    componentNamePascal,
});

// Stop prompting, start processing
const vars = {
    npmName,
    componentName,
    componentNamePascal,
};
const newFiles = {
    package: '',
    rollupConfig: '',
    indexjs: '',
    component: '',
};
newFiles.package = replaceVars(
    fs.readFileSync(path.join(__dirname, 'templates', 'package.json')).toString(),
    vars,
);
newFiles.rollupConfig = replaceVars(
    fs.readFileSync(path.join(__dirname, 'templates', 'build', 'rollup.config.js')).toString(),
    vars,
);
newFiles.indexjs = replaceVars(
    fs.readFileSync(path.join(__dirname, 'templates', 'src', 'index.js')).toString(),
    vars,
);
newFiles.component = replaceVars(
    fs.readFileSync(path.join(__dirname, 'templates', 'src', 'component.vue')).toString(),
    vars,
);

const paths = {
    package: path.join(__dirname, 'components', componentName, 'package.json'),
    rollupConfig: path.join(__dirname, 'components', componentName, 'build', 'rollup.config.js'),
    indexjs: path.join(__dirname, 'components', componentName, 'src', 'index.js'),
    component: path.join(__dirname, 'components', componentName, 'src', 'component.vue'),
};

Object.keys(paths).forEach((key) => {
    ensureDirectoryExists(paths[key]);
    fs.writeFileSync(paths[key], newFiles[key]);
});

// Display completion messages
console.log(
    '\n' +
    'Init is complete, files are ready! You\'ll find them in the ' +
    '`components/' + componentName + '` directory.' +
    '\n' +
    'Within that directory, use src/component.vue as a ' +
    'starting point for your SFC. When you\'re ready, run ' +
    '`npm run build` to generate the redistributable versions.' +
    '\n\n'
);