import { Component, OnInit } from '@angular/core';
import { loadPyodide, PyodideInterface } from 'pyodide';
import { PlayerCodeService } from '../../services/player-code.service';
import { checkifHexCode, gameState } from '../../utils/utils';
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
    this.pc.updateMonacoEditor("# Define 'name' variable")
    this.pc.state$.subscribe(async (state) => {
      if (state.code) {
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
        this.result = await this.runScene(code, state);
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



  private async runScene(code: string, state: gameState): Promise<string> {
    if (!this.pyodideInterface) {
      throw new Error('Pyodide is not loaded');
    }
    try {
      this.pyodideInterface.globals['clear']();
      const pyresponse = await this.pyodideInterface.runPythonAsync(code);
      switch (state["currentScene"]) {
        case 1:
          const nameObj = this.pyodideInterface.globals['get']("name");
          // console.log(nameObj, typeof nameObj);
          if (typeof nameObj === 'string') {
            this.pc.nextScene();
            // console.log(`Onwards to scene 2, name is defined as ${nameObj}`);
            this.pc.updateMonacoEditor("# Scene 2: Dress up the character\n\n# Set the hair shape\nhair_shape = \n\n# Set the hair color\nhair_color = \n\n# Set the shirt color\nshirt_color = \n\n# Set the pant color\npant_color = \n\n# Set the shoe color\nshoe_color = ");
          }
          break;
        case 2:
          var counter = 0
          const hairshapeObj  = this.pyodideInterface.globals['get']("hair_shape");
          const haircolorObj = this.pyodideInterface.globals['get']("hair_color");
          const shirtcolorObj = this.pyodideInterface.globals['get']("shirt_color");
          const pantcolorObj= this.pyodideInterface.globals['get']("pant_color");
          const shoecolorObj= this.pyodideInterface.globals['get']("shoe_color");
          if ( typeof hairshapeObj === 'string' && ['donald', 'black', 'bald'].includes(hairshapeObj)) {
            counter += 1;
            this.pc.updateVariable('hair_shape', hairshapeObj);
          } 
          if ( typeof shirtcolorObj === 'string' ) {
            if(checkifHexCode(shirtcolorObj)){
              counter += 1;
              this.pc.updateVariable('shirt_color', shirtcolorObj);
            }
          } 
          if (typeof pantcolorObj === 'string' ) {
            if(checkifHexCode(pantcolorObj)){
              counter += 1;
              this.pc.updateVariable('pant_color', pantcolorObj);
            }
          } 
          if (typeof shoecolorObj === 'string') {
            if(checkifHexCode(shoecolorObj)){
              counter += 1;
              this.pc.updateVariable('shoe_color', shoecolorObj);
            }
          } 
          if (typeof haircolorObj === 'string' ) {
            if(checkifHexCode(haircolorObj)){
              counter += 1;
              this.pc.updateVariable('hair_color', haircolorObj);
            }
          }
          if (counter === 5){
            if (state.confirmation === true){
              this.pc.nextScene();
              this.pc.updateMonacoEditor("# Scene 3: Splice the words so that you can move through the pipes!");
            }
            else{            
              this.pc.updateVariable('confirmation', false);
            }
          }

          break;
        case 3:
          

          break;
        default:
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

  }

}
