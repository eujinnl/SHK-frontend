import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { gameState, levelInfo } from '../utils/utils';
import { loadPyodide, PyodideInterface } from 'pyodide';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerCodeService {
  scene: number = 0;
  private defaultState: gameState = {
    currentLevel: 1,
    currentScene: 1,
    code: "If you see this, something went wrong",
  };
  state: BehaviorSubject<gameState> = new BehaviorSubject<gameState>(this.defaultState);
  state$ = this.state.asObservable();

  // constructor(private http: HttpClient) {}

  submitCode(code: string, level: levelInfo) {
    // this is supposed to submit code to pyodide logger and pyodide component will handle execution and call "updatestate" method
    const cleanedCode = this.cleancode(code);
    const currentState = this.state.getValue();
    currentState.code = cleanedCode; // Add the cleaned code to the state
    this.state.next(currentState);
  }

  nextScene() {
    const currentState = this.state.getValue();
    currentState.currentScene += 1;
    this.state.next(currentState);
  }

  updateMonacoEditor(code: string) {
    const currentState = this.state.getValue();
    currentState.code = code;
    this.state.next(currentState);
  }

  achievementUnlocked() {

  }
  
  // Update a specific property dynamically
  updateVariable<K extends keyof gameState>(variable: K, value: gameState[K]){
    const currentState = this.state.getValue(); // Get the current state
    if (currentState[variable] !== value) { // Check if the state has changed to prevent infinite loops
      currentState[variable] = value; // Dynamically update the property
      this.state.next(currentState); // Push the updated state
    }
  }

  setGameName(name: string, username: string = "maxi") {
    // Implement the logic for setting the user's game name
  }

  cleancode(code: string): string {
    // Implement the logic for cleaning the code
    return code.trim();
  }
}
