let options = [
    '--require-module ts-node/register', // load Typescript module
    '--require ./tests/steps/*.steps.ts', // Load Step Definitions
    '--format progress', //Load custom formatter
].join(' ');

let run_features = [
    './tests/features/', //Specify our feature files
    options,
].join(' ');

module.exports = {
    test_runner: run_features
};