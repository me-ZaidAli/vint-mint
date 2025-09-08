const { extractProducts } = require("./utils");

async function main() {
//   setInterval(async () => {
    console.log(await extractProducts());
//   }, 1000);
}

main();
