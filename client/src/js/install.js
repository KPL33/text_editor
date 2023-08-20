//Here, we target the "Intall" "button" in our index.html file.
const butInstall = document.getElementById('buttonInstall');

//Here, we provide logic for installing the PWA.
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

//If "promptEvent" exists, the "deferredPrompt" "event" listed above is retrieved, when the "but"ton is "click"ed. If it does not exist, it "return"s, indicating that the installation prompt is no longer available.
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  promptEvent.prompt();
  
  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    
});
