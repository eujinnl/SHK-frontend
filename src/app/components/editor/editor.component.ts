import { Component,Inject, PLATFORM_ID, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorService } from './monaco-editor.service';
import { NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';
// import { getMonacoConfig, MonacoEditorService } from './monaco-editor.service';

@Component({
  standalone: true,
  providers: [MonacoEditorService],
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


  isBrowser: boolean = false;

  code: string= 'function x() {\n\tconsole.log("Hello world!");\n}';

  editorOptions = {theme: 'vs-dark', language: 'python', wordWrap: 'on'};

  constructor(private monacoService: MonacoEditorModule, @Inject(PLATFORM_ID) private platformId: Object){
    this.isBrowser = isPlatformBrowser(this.platformId);
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
