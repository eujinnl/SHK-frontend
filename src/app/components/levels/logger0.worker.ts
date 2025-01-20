// importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
import { loadPyodide } from 'pyodide';
import { checkifHexCode, gameState } from '../../utils/utils';
/* @vite-ignore */
const PYODIDE_BASE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full';


const pyodideinterface = await loadPyodide({indexURL:PYODIDE_BASE_URL});
// self.postMessage({ type: 'pyodideLoaded' });



self.addEventListener('message', async (msg) => {
  console.log("new message")
  const { cmd, buffer, code } = msg.data;
  if (cmd === "setInterruptBuffer") {
    console.log("buffer set")
    console.log(`buffer:${buffer}`)
    pyodideinterface.setInterruptBuffer(buffer);
    return;
  }

  if (cmd === 'runCode') {
    try {
      const result = await pyodideinterface.runPythonAsync(code);
      console.log(result);
      self.postMessage({ type: 'result', result });
    } catch (error) {
      self.postMessage({ type: 'error', error: (error as Error).toString() });
    }
  }
});

// self.onmessage = async (event) => {
//   const { cmd, code } = event.data;

//   if (cmd === 'runCode') {
//     try {
//       const result = await pyodideinterface.runPythonAsync(code);
//       self.postMessage({ type: 'result', result });
//     } catch (error) {
//       self.postMessage({ type: 'error', error: (error as Error).toString() });
//     }
//     }
// };


