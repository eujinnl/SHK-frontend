import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { Observable, Subject, of } from 'rxjs';
import * as monaco from 'monaco-editor';
import { isPlatformBrowser } from '@angular/common';
// import { GAME_SERVER_URL } from '@global/config';


let monacoInstance: typeof monaco | undefined = undefined;
const monacoObservable: Subject<typeof monaco> = new Subject();

function setMonaco(instance: typeof monaco) {
  monacoInstance = instance;
  monacoObservable.next(monacoInstance);
}
export function getMonacoConfig(): NgxMonacoEditorConfig {

  
  return {
    onMonacoLoad: () => {

      if (typeof window === 'undefined') {
        // Skip Monaco setup if not in browser
        console.warn('Monaco Editor cannot be initialized in a non-browser environment.');
        return;
      }
      
      // No choice but to access the monaco object this way
      // Even the docs for this library accesses it this way
      // https://github.com/miki995/ngx-monaco-editor-v2

      // Surpresses @typescript-eslint/no-explicit-any for this line

      // eslint-disable-next-line
      const monacoIns = (window as any).monaco;
      setMonaco(monacoIns);

      // Disable unnecessary suggestions
      monacoIns.languages.typescript.javascriptDefaults.setCompilerOptions({
        allowNonTsExtensions: true,
        noLib: true,
      });
      const pythonconfig ={
        defaultToken: '',
        tokenPostfix: '.python',
        keywords: [
          'and',
          'as',
          'assert',
          'break',
          'class',
          'continue',
          'def',
          'del',
          'elif',
          'else',
          'except',
          'exec',
          'finally',
          'for',
          'from',
          'global',
          'if',
          'import',
          'in',
          'is',
          'lambda',
          'None',
          'not',
          'or',
          'pass',
          'print',
          'raise',
          'return',
          'self',
          'try',
          'while',
          'with',
          'yield',

          'int',
          'float',
          'long',
          'complex',
          'hex',

          'abs',
          'all',
          'any',
          'apply',
          'basestring',
          'bin',
          'bool',
          'buffer',
          'bytearray',
          'callable',
          'chr',
          'classmethod',
          'cmp',
          'coerce',
          'compile',
          'complex',
          'delattr',
          'dict',
          'dir',
          'divmod',
          'enumerate',
          'eval',
          'execfile',
          'file',
          'filter',
          'format',
          'frozenset',
          'getattr',
          'globals',
          'hasattr',
          'hash',
          'help',
          'id',
          'input',
          'intern',
          'isinstance',
          'issubclass',
          'iter',
          'len',
          'locals',
          'list',
          'map',
          'max',
          'memoryview',
          'min',
          'next',
          'object',
          'oct',
          'open',
          'ord',
          'pow',
          'print',
          'property',
          'reversed',
          'range',
          'raw_input',
          'reduce',
          'reload',
          'repr',
          'reversed',
          'round',
          'set',
          'setattr',
          'slice',
          'sorted',
          'staticmethod',
          'str',
          'sum',
          'super',
          'tuple',
          'type',
          'unichr',
          'unicode',
          'vars',
          'xrange',
          'zip',

          'True',
          'False',

          '__dict__',
          '__methods__',
          '__members__',
          '__class__',
          '__bases__',
          '__name__',
          '__mro__',
          '__subclasses__',
          '__init__',
          '__import__'
        ],

        brackets: [
          { open: '{', close: '}', token: 'delimiter.curly' },
          { open: '[', close: ']', token: 'delimiter.bracket' },
          { open: '(', close: ')', token: 'delimiter.parenthesis' }
        ],

        tokenizer: {
          root: [
            { include: '@whitespace' },
            { include: '@numbers' },
            { include: '@strings' },

            [/[,:;]/, 'delimiter'],
            [/[{}\[\]()]/, '@brackets'],

            [/@[a-zA-Z]\w*/, 'tag'],
            [/[a-zA-Z]\w*/, {
              cases: {
                '@keywords': 'keyword',
                '@default': 'identifier'
              }
            }]
          ],

          // Deal with white space, including single and multi-line comments
          whitespace: [
            [/\s+/, 'white'],
            [/(^#.*$)/, 'comment'],
            [/('''.*''')|(""".*""")/, 'string'],
            [/'''.*$/, 'string', '@endDocString'],
            [/""".*$/, 'string', '@endDblDocString']
          ],
          endDocString: [
            [/\\'/, 'string'],
            [/.*'''/, 'string', '@popall'],
            [/.*$/, 'string']
          ],
          endDblDocString: [
            [/\\"/, 'string'],
            [/.*"""/, 'string', '@popall'],
            [/.*$/, 'string']
          ],

          // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
          numbers: [
            [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'],
            [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number']
          ],

          // Recognize strings, including those broken across lines with \ (but not without)
          strings: [
            [/'$/, 'string.escape', '@popall'],
            [/'/, 'string.escape', '@stringBody'],
            [/"$/, 'string.escape', '@popall'],
            [/"/, 'string.escape', '@dblStringBody']
          ],
          stringBody: [
            [/[^\\']+$/, 'string', '@popall'],
            [/[^\\']+/, 'string'],
            [/\\./, 'string'],
            [/'/, 'string.escape', '@popall'],
            [/\\$/, 'string']
          ],
          dblStringBody: [
            [/[^\\"]+$/, 'string', '@popall'],
            [/[^\\"]+/, 'string'],
            [/\\./, 'string'],
            [/"/, 'string.escape', '@popall'],
            [/\\$/, 'string']
          ]
        }
      };
      monacoIns.languages.register({id:'python'});
      monacoIns.languages.setMonarchTokensProvider('python',pythonconfig);
      monacoIns.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position) => {
          const wordInfo = model.getWordUntilPosition(position);
          const range = new monacoIns.Range(
            position.lineNumber,
            wordInfo.startColumn,
            position.lineNumber,
            wordInfo.endColumn
          );
      
          const suggestions = pythonconfig.keywords.map((keyword) => {
            return {
              label: keyword,
              kind: monacoIns.languages.CompletionItemKind.Keyword,
              insertText: keyword,
              range: range,  // Assign the manually created range
            };
          });
      
          return {
            suggestions: suggestions,
          };
        },
      });
      
      
    },
  };

  
}

@Injectable({
  providedIn: 'root',
})
export class MonacoEditorService {
  private getMonaco(): Observable<typeof monaco> {
    return monacoInstance !== undefined ? of(monacoInstance) : monacoObservable;
  }

  constructor(private httpClient: HttpClient) {}

  // requestTypings() {
  //   return this.httpClient.get<string>(`${GAME_SERVER_URL}/api/typing`);
  // }

  // addExtraTypes(libString: string) {
  //   this.getMonaco().subscribe((monaco) => {
  //     monaco.languages.typescript.typescriptDefaults.addExtraLib(libString);
  //   });
  // }
}
