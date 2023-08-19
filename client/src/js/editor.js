//Here, we import "get" and "put" methods detailed in the "./database.js" file and import the "header" constant from "./header.js".
import { getDb, putDb } from './database';
import { header } from './header';

//When "Data" is received in "localStorage", a "class" is created via the "constructor" method. We then establish that "localData" will store the "Item" ("content"), after "get"ting it from "localStorage".
export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    //"CodeMirror" is a JavaScript library that provides a text-editor for web apps. This snippet checks that the "CodeMirror" library is loaded and "throw"s an "Error" in the event that it is not loaded.
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    };

    //Here, we create an instance of "CodeMirror" and targets the element with ID "main" in our html. The instance has its various important keys and their values established below, to set preferences for how CodeMirror will operate in our app.
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    //When the "editor" is ready, if available, "data" is rertieved from the the "IndexedDB". If none is available, "localData" stored in "localStorage" is loaded, as a fall-back option. If no "data" is present in either of those options, the contents of "header" (which we "import"ed at the beginning of this document) will load, greeting the user with a "start-screen", of sorts.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    //When the data in "localStorage" "change"s, the new "Value" is set to show in the text-"editor".
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    //"blur" here allows our "editor" to listen for the moment When the "editor" is no longer in "focus". At that point, the message shown "log"s to the "console" and the new "content" entered by the user is "put" into the "localStorage" "DB".
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  };
};
