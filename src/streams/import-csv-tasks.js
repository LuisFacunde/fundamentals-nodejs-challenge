import { parse } from "csv-parse";
import { fs } from "node:fs";

// Armazena o diretório do arquivo CSV
const pathCSV = new URL("./tasks.csv", import.meta.url);

// Cria uma readable stream para leitura do arquivo CSV
const readCSV = fs.createReadStream(pathCSV);

// Cria uma transform stream para tranformar o CSV em objeto
const parseCSV = parse({
  delimiter: ":",
  skipEmptyLines: true, // pula as linhas em branco
  fromLine: 2, // inicia a leitura da segunda linha
});

async function processCSV() {
    const linesParse = readCSV.pipe(parseCSV)

    for await (const line of linesParse) {
        push(line)
    }
} 
