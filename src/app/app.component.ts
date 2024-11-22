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

