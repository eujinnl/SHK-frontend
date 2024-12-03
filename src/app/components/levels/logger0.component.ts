import { Component, OnInit } from '@angular/core';
import { loadPyodide, PyodideInterface } from 'pyodide';
import { PlayerCodeService } from '../../services/player-code.service';
import { checkifHexCode } from '../../utils/utils';
/* @vite-ignore */
const PYODIDE_BASE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full';

@Component({
  selector: 'app-logger',
  standalone: true,
  template: `
    <div class="overflow-auto">
      {{ result }}
    </div>
  `,
})
export class Logger0Component implements OnInit {
  private pyodideInterface: PyodideInterface | undefined;
  result: string | undefined;
  words = ['Algorithms',
    "Executable",
    "Breakpoint",
    "Expression",
    "Arithmetic",
    "Resolution",
    "Encryption",
    "Frameworks",
    "Deployment",
    "FileSystem",
    "Scheduler",
    "Automation",
    "Overloaded",
    "Parameters",
    "Processing",
    "Repository",
    "Exceptions",
    "Conversion",
    "Interfaces",
    "Attributes",
    "Statements",
    "Validation",
    "Identifier",
    "Executable",
    "Concurrent"];

  constructor(private pc: PlayerCodeService) {}

  async ngOnInit() {
    this.initializePipes();
    await this.loadPyodide();
    this.pc.state$.subscribe(async (state) => {
      if (state['code']) {
        const code = `
import sys
from io import StringIO

# Redirect stdout
mystdout = StringIO()
sys.stdout = mystdout

try:
    # Execute the user's code
    exec(${JSON.stringify(state['code'])})
except Exception as e:
    # Capture exceptions
    print(f"Error: {e}")

# Reset stdout
sys.stdout = sys.__stdout__

# Get the output
mystdout.getvalue()
`;
        this.result = await this.runScene(code, state["currentScene"]);
        // console.log('Python script result:', this.result);
      }
    });
  }

  private async loadPyodide() {
    /* @vite-ignore */
    this.pyodideInterface = await loadPyodide({
      indexURL: PYODIDE_BASE_URL,
    });
    console.log('Pyodide loaded');
  }



  private async runScene(script: string, scene: number): Promise<string> {
    if (!this.pyodideInterface) {
      throw new Error('Pyodide is not loaded');
    }
    try {
      const pyresponse = await this.pyodideInterface.runPythonAsync(script);
      switch (scene) {
        case 1:
          const nameObj = this.pyodideInterface.globals['get']("name");
          // console.log(nameObj, typeof nameObj);
          if (typeof nameObj === 'string') {
            console.log("next scene");
          }
          // this.pc.updateState('scene', 1);
          break;
        case 2:
          var counter = 0
          const hairshapeObj  = this.pyodideInterface.globals['get']("hair_shape");
          const haircolorObj = this.pyodideInterface.globals['get']("hair_color");
          const shirtcolorObj = this.pyodideInterface.globals['get']("shirt_color");
          const pantcolorObj= this.pyodideInterface.globals['get']("pant_color");
          const shoecolorObj= this.pyodideInterface.globals['get']("shoe_color");
          if ( typeof hairshapeObj === 'string' ) {
            counter += 1;
          } 

          if ( typeof shirtcolorObj === 'string' && checkifHexCode(shirtcolorObj) ) {
            counter += 1;
          } 

          if (typeof pantcolorObj === 'string' && checkifHexCode(pantcolorObj) ) {
            counter += 1;
          } 

          if (typeof shoecolorObj === 'string' && checkifHexCode(shoecolorObj) ) {
            counter += 1;
          } 

          if (typeof haircolorObj === 'string' && checkifHexCode(haircolorObj) ) {
            counter += 1;
          }

          if (counter === 5){
            console.log("next scene");
          }

          break;
        case 3:

          break;
        }
        return pyresponse;
      }
      catch (error) {
      const pyresponse = (error as Error).toString();
      return pyresponse;
    }
  }

  initializePipes() {
    //i want to create a list of size 10, a mix of words from this.words and numbers
    let words = this.words;
    let randomWords = [];
    for (let i = 0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * words.length);
      randomWords.push(words[randomIndex]);
      words.splice(randomIndex, 1);
    }
    console.log(randomWords);

  }

}
