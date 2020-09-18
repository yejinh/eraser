// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

const textConsole = "console";
const textDebug = "debugger";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

  // defualt
  vscode.commands.registerCommand("eraser-by-yejinh.helloWorld", () => {
    vscode.window.showInformationMessage("hi from eraser!");
  });

  // delete console and debugger
  vscode.commands.registerCommand("eraser-by-yejinh.getAll", () => {
    if (!editor) {
      return;
    }

    const numberOfLine: number = editor.document.lineCount;
    const fullText: string = editor.document.getText();
    const textArray: string[] = fullText.split("\n");
    // const selections = editor.selections;

    editor.edit((line) => {
      // for (let selection of selections) {
      //   line.replace(selection, "");
      //   line.delete(selection);
      // }
      for (let i = 0; i < numberOfLine; i++) {
        if (
          textArray[i].includes(textConsole) ||
          textArray[i].includes(textDebug)
        ) {
          line.delete(
            new vscode.Range(
              new vscode.Position(i, textArray[i].indexOf(textConsole)),
              new vscode.Position(i, 1000)
            )
          );
        }
      }
    });

    vscode.window.showInformationMessage(fullText);
    vscode.window.showInformationMessage(numberOfLine + "");
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
