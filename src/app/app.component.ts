import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { mongoConfig } from './utils/utils';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
selector: 'app-root',
standalone: true,
imports: [RouterOutlet, ],
template: '<router-outlet/>',
styles: [],
})

export class AppComponent {
title = 'lejinn';
}


// if (typeof Worker !== 'undefined') {
// // Create a new
// const worker = new Worker(new URL('./app.worker', import.meta.url));
// worker.onmessage = ({ data }) => {
// console.log(`page got message ${data}`);
// };
// worker.postMessage('hello');
// } else {
// // Web Workers are not supported in this environment.
// // You should add a fallback so that your program still executes correctly.
// }