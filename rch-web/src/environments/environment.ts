// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // restws_base: "http://localhost:4200/rest",
  // model:"dummy-rest",
  restws_base: "http://10.10.29.44/rest",
  model:"rest",
  avmode: 2 //Modo de envío de passenger types al solicitar disponibilidad. 1=[objetos] 2=[ids de passenger types]
};
