// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  //URL of development API
  //apiUrl: 'http://localhost:3000/api',
  apiUrl: 'http://139.59.102.174:3000/api',

  //Domain address
  //FILE_HOST_URL: 'http://localhost:3000/files',
  FILE_HOST_URL: 'http://139.59.102.174:3000/files'
};

