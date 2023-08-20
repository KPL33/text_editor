//Here, we "import" various modules that will help our app operate.
import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import { header } from './header';

const main = document.querySelector('#main');
main.innerHTML = header;

//"loadSpinner" is defined to create and append a loading "Spinner" "Element" to the "main" container. It prepares a "Spinner" that will be shown while the "editor" is being initialized.
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

//Here, we create an instance of the "Editor" class (the particulars of this class having been established in "./editor.js" and imported above). It gives us access to the functionality of the code editor for our app. "if" it fails to initialze, the "Spinner" that we established above "load"s instead.
const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

//Here, our app verifies that the web browser ("navigator") supports "serviceWorker"s. If it does not, an "error" logs to the "console" stating this.
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
