function injectFile(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s;
    if(file.includes('.js')){
      s = document.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('src', file);
    }
    else if(file.includes('.css')){
      s = document.createElement('link');
      s.rel = "stylesheet";
      s.type = "text/css";
      s.href = file;
    }
    th.appendChild(s);
}

injectFile( chrome.runtime.getURL('DAB_Lift-Booking-Redesign/main.js'), 'head');
injectFile( chrome.runtime.getURL('DAB_Lift-Booking-Redesign/main.css'), 'head');

