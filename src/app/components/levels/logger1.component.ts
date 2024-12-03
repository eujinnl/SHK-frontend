import { Component, OnInit } from '@angular/core';
import { loadPyodide, PyodideInterface } from 'pyodide';
import { PlayerCodeService } from '../../services/player-code.service';
import { stat } from 'fs';
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
export class Logger1Component implements OnInit {
  private pyodideInterface: PyodideInterface | undefined;
  result: string | undefined;
  // words are 10 letters long to mantain standardization



  constructor(private pc: PlayerCodeService) {}

  async ngOnInit() {
    await this.loadPyodide();
    this.pc.state$.subscribe(async (state) => {	
      if (state['code'] ){
        const code =`
import sys
from io import StringIO

# Redirect stdout to capture print statements
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()

# Run the code
${state['code']}

# Reset stdout
sys.stdout = old_stdout

# Get the output
mystdout.getvalue()`;

        this.result = await this.runPythonScript(code);
      } 
    }

    )
    // console.log('Python script result:', this.result);
  }

  private async loadPyodide() {
    /* @vite-ignore */
    this.pyodideInterface = await loadPyodide({
      indexURL: PYODIDE_BASE_URL
    });
  }

  private async runPythonScript(script: string): Promise<string> {
    if (!this.pyodideInterface) {
      throw new Error('Pyodide is not loaded');
    }
    const result = await this.pyodideInterface.runPythonAsync(script);
    const resultObj = this.pyodideInterface.globals['get']("name");
    console.log('Result:', resultObj);

    return result.toString();
  }

}