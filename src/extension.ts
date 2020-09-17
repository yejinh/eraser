// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "eraser-by-yejinh" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "eraser-by-yejinh.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("hi from eraser!");
    }
  );

  let getCodes = vscode.commands.registerCommand(
    "eraser-by-yejinh.getAll",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const fullText = editor.document.getText();
      const numberOfLine = editor.document.lineCount;
      const array = fullText.split("\n");
      // const selections = editor.selections;

      editor.edit((line) => {
        // for (let selection of selections) {
        //   line.replace(selection, "");
        //   line.delete(selection);
        // }
        for (let i = 0; i < numberOfLine; i++) {
          if (array[i].startsWith("console")) {
            line.delete(
              new vscode.Range(
                new vscode.Position(i, 0),
                new vscode.Position(i, 1000)
              )
            );
          }
        }
      });

      vscode.window.showInformationMessage(fullText);
      vscode.window.showInformationMessage(numberOfLine + "");
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(getCodes);
}

// this method is called when your extension is deactivated
export function deactivate() {}
