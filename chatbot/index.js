#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("Chat Bot", {
                font: "Standard",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};

const askQuestions = () => {
    const questions = [
        {
            name: "FILENAME",
            type: "input",
            message: "What is the name of the file without extension?"
        },
        {
            name: "EXTENSION",
            type: "list",
            message: "What is the file extension?",
            choices: [".rb", ".js", ".php", ".css"],
            filter: function (val) {
                return val.split(".")[1];
            }
        }
    ];
    return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
    const resultDir = '/result';
    const filePath = `${process.cwd()}${resultDir}/${filename}.${extension}`;
    shell.touch(filePath);
    return filePath;
};

const success = (filepath) => {
    console.log(
        chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
    );
};

const run = async () => {
    // show script introduction
    init();
    // ask questions
    const answers = await askQuestions();
    const {FILENAME, EXTENSION} = answers;
    // create the file
    const filePath = createFile(FILENAME, EXTENSION);
    // show success message
    success(filePath);
};

run();