import { exec } from 'child_process';

// Definir los archivos a ejecutar
const scripts = [
    'Webscraping1',
    'Webscraping2',
    'Webscraping3',
    'Webscraping4',
    'Webscraping5'  // Reemplaza esto con el nombre de tu segundo script
];

// Función para ejecutar un archivo de web scraping
function runWebScraping(script, callback) {
    exec(`node ${script}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando el script ${script}: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error en el script ${script}: ${stderr}`);
            return;
        }
        console.log(`Salida del script ${script}:\n${stdout}`);
        if (callback) callback();
    });
}

// Ejecutar los scripts secuencialmente
function runScriptsSequentially(scripts) {
    if (scripts.length === 0) return;
    const [firstScript, ...restScripts] = scripts;
    runWebScraping(firstScript, () => runScriptsSequentially(restScripts));
}

runScriptsSequentially(scripts);
