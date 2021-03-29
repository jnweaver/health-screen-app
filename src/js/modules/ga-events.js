'use strict';


function gaEvents(role, result) {
  if (typeof gtag !== "undefined") {

    gtag('event', 'trackerResult', {
      'event_category': role,
      'event_label': result,
      'value': 1
    });

  }
}

export default gaEvents;
