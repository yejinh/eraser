// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

function checkLogs(line: vscode.TextLine) {
  const textConsole = "console";
  const textDebug = "debugger";

  return line.text.includes(textConsole) || line.text.includes(textDebug);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
  const document: vscode.TextDocument | undefined = editor?.document;

  // defualt
  vscode.commands.registerCommand("eraser-by-yejinh.helloWorld", () => {
    vscode.window.showInformationMessage("hi from eraser!");
  });

  // delete console and debugger
  vscode.commands.registerCommand("eraser-by-yejinh.deleteAll", () => {
    if (!editor || !document) {
      return;
    }

    const numberOfLine: number = editor.document.lineCount;

    editor.edit((line) => {
      for (let i = 0; i < numberOfLine; i++) {
        const currentLine = document.lineAt(i);

        if (checkLogs(currentLine)) {
          line.delete(currentLine.rangeIncludingLineBreak);
        }
      }
    });

    vscode.window.showInformationMessage(numberOfLine + "");
  });

  // inactive console and debugger
  vscode.commands.registerCommand("eraser-by-yejinh.inactiveAll", () => {
    if (!editor || !document) {
      return;
    }

    const numberOfLine: number = editor.document.lineCount;

    editor.edit((line) => {
      for (let i = 0; i < numberOfLine; i++) {
        const currentLine: vscode.TextLine = document.lineAt(i);

        if (checkLogs(currentLine)) {
          line.insert(new vscode.Position(i, 0), "// ");
        }
      }
    });

    vscode.window.showInformationMessage(numberOfLine + "");
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
