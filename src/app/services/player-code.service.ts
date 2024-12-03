import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { levelInfo } from '../utils/utils';
import { loadPyodide, PyodideInterface } from 'pyodide';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class PlayerCodeService {
  scene: number = 0;
  private state = new BehaviorSubject<Record<string, any>>({
    currentLevel: 1, // The active level
    currentScene: 2, // The active scene
    code: "",
  });
  state$ = this.state.asObservable();


  // constructor(private http: HttpClient) {}

  submitCode(code: string, level: levelInfo) {
    // this is supposed to submit code to pyodide logger and pyodide component will handle execution and call "updatestate" method
    const cleanedCode = this.cleancode(code)
    const currentState = this.state.getValue();
    currentState['code'] = cleanedCode; // Add the cleaned code to the state
    this.state.next(currentState);
  }

  nextScene() {
  }

  
  updateState(variableName: string, value: any) {
    const currentState = this.state.getValue();
    currentState[variableName] = value;
    this.state.next(currentState);
  }

  setGameName(name: string, username: string = "maxi") {
    const currentState = this.state.getValue();
    currentState['programName'] = name;
    this.state.next(currentState);
  }

  getGameName(username: string = "maxi") {
    return this.state.getValue()['programName'];
  }


  cleancode(code: string) {
    // Example: Remove infinite loops using basic detection (improve as needed)
    if (code.includes('while True') || code.includes('for(;;)')) {
      throw new Error('Infinite loops are not allowed.');
    }
    return code;

  }


  getVariable(variableName: string): any {
    return this.state.getValue()[variableName];
  }

}





