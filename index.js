import * as readLineSync from "readline-sync";
import * as fs from "fs";

const charCount = (str) => {
  return str.length;
};

const wordCount = (str) => {
  return str.split(/\s+/).length;
};

const lineCount = (str) => {
  return str.split("\n").length;
};

function processCommad(commnad) {
  try {
    const phrases = commnad.split(" ");

    if (phrases[0] != "wc") return "Invalid initiator";
    let fileName = phrases[1].startsWith("-") ? phrases[2] : phrases[1];
    const data = fs.readFileSync(fileName, "utf8");

    switch (phrases[1]) {
      case "-c":
        return `${fileName} Char count: ${charCount(data)}`;
      case "-w":
        return `${fileName} Word count: ${wordCount(data)}`;
      case "-l":
        return `${fileName} Line count: ${lineCount(data)}`;
      default: {
        if (fileName == phrases[1]) {
          return `${fileName}\n  Char count: ${charCount(
            data
          )}\n  Word count: ${wordCount(data)}\n  Line count: ${lineCount(
            data
          )}`;
        }
        throw Error("Error: Invalid args error");
      }
    }
  } catch (err) {
    return err;
  }
}
function init() {
  console.log("Enter command 'exit' to stop the process.");
  let running = true;
  let userInput = "";

  while (running) {
    userInput = readLineSync.question();
    if (userInput === "exit") break;
    console.log(processCommad(userInput));
  }
}
init();
