import { Component,Inject, PLATFORM_ID, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorService } from './monaco-editor.service';
import { PlayerCodeService } from '../../services/player-code.service';
// import { getMonacoConfig, MonacoEditorService } from './monaco-editor.service';

@Component({
  standalone: true,
  providers: [MonacoEditorService, PlayerCodeService],
  imports: [MonacoEditorModule, FormsModule, HttpClientModule],
  selector: 'cs-editor',
  template: `<ngx-monaco-editor
      class="my-code-editor	h-full min-h-full	"
      [options]="editorOptions"
      [(ngModel)]="code"
      (onInit)="onEditorInit($event)"
      ></ngx-monaco-editor>
  `,
  styles: [
  ],
})

export class EditorComponent implements OnInit{
  @Output() codeSubmitted = new EventEmitter<string>();
  @Input() initialCode: string = 'function x() {\n\tconsole.log("Hello world!");\n}';

  code: string= 'function x() {\n\tconsole.log("Hello world!");\n}';

  editorOptions = {theme: 'vs-dark', language: 'python', wordWrap: 'on'};

  constructor(private monacoService: MonacoEditorModule, private playerCodeService: PlayerCodeService) {
  }
  ngOnInit(): void {
      return
  }

  onEditorInit(editor: any) {
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.className =
      'bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 mx-4 rounded-full disabled:bg-gray-500 disabled:cursor-not-allowed';
    saveButton.style.position = 'absolute';
    saveButton.style.bottom = '10px';
    saveButton.style.left = '10px';

    // this takes the code from the editor and emits it to the parent component
    saveButton.addEventListener('click', () => {
      const code = editor.getValue();
      this.codeSubmitted.emit(code);
      console.log('Save button clicked, code submitted:', code);
    });

    // editor.getDomNode().appendChild(saveButton);
    const editorDomNode = editor.getDomNode();
    if (editorDomNode) {
      editorDomNode.appendChild(saveButton);
    } else {
      console.error('Editor DOM node is not available');
    }
  }

}
