import { Component, OnInit } from '@angular/core';
import { PlayerCodeService } from '../../services/player-code.service';
import { checkifHexCode, gameState } from '../../utils/utils';
import { timeout } from 'rxjs';

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
  private worker: Worker;
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
    interruptBuffer: Uint8Array;


  constructor(private pc: PlayerCodeService) {
    this.worker = new Worker(new URL('./logger0.worker.ts', import.meta.url));
    this.interruptBuffer = new Uint8Array(new SharedArrayBuffer(1))
    this.worker.onmessage = (event) => {
      const { type, result, error } = event.data;
      if (type === 'result') {
        this.result = result;
      } else if (type === 'error') {
        this.result = error;
      }
    };
  }

  async ngOnInit() {
    this.initializePipes();
    this.pc.updateMonacoEditor("# Define 'name' variable");
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
        this.interruptBuffer[0] = 0;
        this.worker.postMessage({ cmd: "setInterruptBuffer", buffer:this.interruptBuffer });
        this.worker.postMessage({ cmd: 'runCode', code: code });
        setTimeout(() => {
          this.interruptBuffer[0] = 2;
          console.log("buffer changed after 3 seconds")
        }, 3000); // Delay of 3 seconds
      }
    });
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