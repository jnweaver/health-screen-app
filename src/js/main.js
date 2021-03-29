// polyfill NodeList.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
   NodeList.prototype.forEach = Array.prototype.forEach;
}
// polyfill array.includes
import 'polyfill-array-includes';

const dayjs = require('dayjs');

import domReady from './modules/dom-ready';
import Settings from './modules/settings';
import gaEvents from './modules/ga-events';


const locales = {
  en: {
    student: "Student <span>Includes grad/professional students and student employees</span>",
    employee: "Employee",
    "visitor-guest": "Visitor/Guest",
    contractor: "Contractor"
  },
  es: {
    student: "Estudiante <span>Incluyendo estudiantes de posgrado, profesionales y estudiantes empleados</span>",
    employee: "Empleado/a",
    "visitor-guest": "Visitante o invitado/a",
    contractor: "Contratista (<i>Contractor</i>)"
  },
  zh: {
    student: "学生 <span>包括研究生、专业学位学生和学生员工</span>",
    employee: "员工",
    "visitor-guest": "游客和宾客",
    contractor: "合同工",
    students_def: "包括研究生、专业学位学生和学生员工"
  },
  hmn: {
    student: "Tus Mejyig <span>nrog rau cov Graduate, Professional, thiab Mejyig-Ua Haujlwm</span>",
    employee: "Tus Neeg Ua Haujlwm",
    "visitor-guest": "Tus Tuaj Saib/Qhua",
    contractor: "Tus Txais Haujlwm Ua (<i>Contractor</i>)"
  },
  sit: {
    student: "སློབ་ཕྲུག <span>ཞིབ་འཇུག་སློབ་མ་དང་། ཆེད་ལས་པ། སློབ་ཕྲུག་ལས་མི་བཅས་ཚུད་ཡོད</span>",
    employee: "ལས་བྱེད།",
    "visitor-guest": "གཟིགས་སྐོར་པའམ་སྐུ་མགྲོན།",
    contractor: "ཚོང་གན་འཇོག་མཁན་ནམ་ལས་ཀ་བོགས་མ་ལེན་མི།"
  },
  ne: {
    student: "विद्यार्थी <span>Graduate, व्यावसायिक, र विद्यार्थी कर्मचारीहरू</span>",
    employee: "कर्मचारी",
    "visitor-guest": "पाहुना",
    contractor: "ठेकेदार (<i>Contractor</i>)"
  }
};

domReady(function () {

  const hs_panel_btn_next = document.getElementById('hs-panel-btn-next'),
        hs_panel_btn_reload = document.getElementById('hs-panel-btn-reload'),
        hs_panel_steps = document.querySelectorAll('.hs-panel-step');
  
  const route = function(locale, role) {
    window.location.assign('/' + locale + '/' + role + '/');
  }

  const enableButton = function(button) {
    button.classList.remove('uw-button-disabled');
    button.removeAttribute('disabled');
  }
  const disableButton = function(button) {
    button.classList.add('uw-button-disabled');
    button.setAttribute('disabled', true);
  }

  const swapPanels = function(panelToHide, panelToShow) {
    panelToHide.classList.add('uw-visually-hide');
    panelToHide.addEventListener('transitionend', function(e) {
      panelToHide.classList.add('uw-hide');
      showPanel(panelToShow);
    }, {
      capture: false,
      once: true,
      passive: false
    });
  }

  const showPanel = function(panel) {
    panel.classList.remove('uw-hide');

    if (panel.querySelector('.hs-caution')) {
      const settings = Settings.get();
      gaEvents(settings.role, 'red');
    }
    if (panel.querySelector('.hs-clear')) {
      const settings = Settings.get();
      gaEvents(settings.role, 'green');
    }
    setTimeout(function () {
      panel.classList.remove('uw-visually-hide');
      if (panel.classList.contains('hs-panel-step')) {
        panel.querySelector('h2').focus();
      }
    }, 20);
  }

  const getTimestamp = function() {
    return dayjs().format('h:mm a, MMMM D, YYYY');
  }

  const isHome = document.querySelector('body.home');
  if (isHome) {
    const settingsButton = document.getElementById('hs-button-settings');
    const languageChoices = document.querySelectorAll('.hs-language-choice input[type=radio]');
    const roleChoices = document.querySelectorAll('.hs-role-choice input[type=radio]');

    const settingsAreChecked = function() {
      let langChecked = false, roleChecked = false;
      languageChoices.forEach(function(lang) {
        if (lang.checked)
          langChecked = true;
      });
      roleChoices.forEach(function(role) {
        if (role.checked)
          roleChecked = true;
      });
      return langChecked && roleChecked;
    }

    const enableSettingsButton = function() {
      if (settingsAreChecked()) {
        settingsButton.removeAttribute('disabled');
        settingsButton.classList.remove('uw-button-disabled');
      }
    }

    const updateRoleLocales = function(lang) {
      roleChoices.forEach(function(role) {
        role.parentNode.querySelector('span').setAttribute('lang', lang.value);
        role.parentNode.querySelector('span').innerHTML = locales[lang.value][role.value];
      });
    }

    languageChoices.forEach(function(lang) {
      lang.addEventListener('change', function() {
        enableSettingsButton();
        updateRoleLocales(lang);
        languageChoices.forEach(function(lang) {
          lang.parentNode.classList.remove('checked');
        });
        if (this.checked) {
          this.parentNode.classList.add('checked');
        } else {
          this.parentNode.classList.remove('checked');
        }
      });
    });

    roleChoices.forEach(function(role) {
      role.addEventListener('change', function() {
        enableSettingsButton();
        roleChoices.forEach(function(role) {
          role.parentNode.classList.remove('checked');
        });
        if (this.checked) {
          this.parentNode.classList.add('checked');
        } else {
          this.parentNode.classList.remove('checked');
        }
      });
    });

    // validate settings and redirect accordingly
    settingsButton.addEventListener('click', function() {
      let isLangValid, isRoleValid, selectedLang, selectedRole;
      languageChoices.forEach(function(lang) {
        if (lang.checked) {
          // validate the input
          if (['en','es','zh','hmn','ne','sit'].includes(lang.value)) {
            isLangValid = true;
            selectedLang = lang.value;
          }
        }
      });
      roleChoices.forEach(function(role) {
        if (role.checked) {
          // validate the input
          if (['student','employee', 'visitor-guest', 'contractor'].includes(role.value)) {
            isRoleValid = true;
            selectedRole = role.value;
          }
        }
      });

      if (isLangValid && isRoleValid) {
        // set cookies if browser cookies enabled
        if (window.navigator.cookieEnabled)
          Settings.set(selectedLang,selectedRole);

        route(selectedLang, selectedRole);
      }
    });
  } else {
    // if it's not the language choice page, show Next button
    // hs_panel_btn_next.classList.remove('uw-visually-hide');
  }


  const hs_panels = document.querySelectorAll('.hs-panel');

  hs_panels.forEach(function(panel) {
    const yes = panel.querySelector('.hs-radio-wrapper .hs-radio-button:first-child input');
    const yes_label = panel.querySelector('.hs-radio-wrapper .hs-radio-button:first-child');
    const no = panel.querySelector('.hs-radio-wrapper .hs-radio-button:last-child input');
    const no_label = panel.querySelector('.hs-radio-wrapper .hs-radio-button:last-child');

    if (yes) {
      yes.addEventListener('change', function() {
        enableButton(hs_panel_btn_next);
        if (this.checked) {
          yes_label.classList.add('checked');
          no_label.classList.remove('checked');
        } else {
          yes_label.classList.remove('checked');
          no_label.classList.add('checked');
        }
      });
    }
    if (no) {
      no.addEventListener('change', function() {
        enableButton(hs_panel_btn_next);
        if (this.checked) {
          no_label.classList.add('checked');
          yes_label.classList.remove('checked');
        } else {
          no_label.classList.remove('checked');
          yes_label.classList.add('checked');
        }
      });
    }
  });

  if (hs_panel_btn_reload) {
    hs_panel_btn_reload.addEventListener('click', function(e) {
      Settings.clear();
      window.location.href = '/';
    });
  }

  if (hs_panel_btn_next) {
    hs_panel_btn_next.addEventListener('click', function(e) {
      const panel_id = this.getAttribute('data-panel');
      const panel_current = document.getElementById('hs-panel-' + panel_id);
      const panel_next = document.getElementById('hs-panel-' + (parseInt(panel_id) + 1));

      if (panel_current.querySelector('.hs-radio-wrapper .hs-radio-button:first-child input').checked) {

        const panel_guidance = document.getElementById('hs-panel-' + panel_id + '-guidance');

        panel_guidance.querySelector('.hs-timestamp').innerHTML = getTimestamp();
        swapPanels(panel_current, panel_guidance);
        hs_panel_btn_next.classList.add('uw-visually-hide');
        hs_panel_btn_next.setAttribute('aria-hidden', true);
      } else {
        swapPanels(panel_current, panel_next);
      }

      hs_panel_btn_next.setAttribute('data-panel', parseInt(panel_id) + 1);

      disableButton(hs_panel_btn_next);

      // last panel
      if (parseInt(panel_id) == hs_panel_steps.length-1) {
        panel_next.querySelector('.hs-timestamp').innerHTML = getTimestamp();
        hs_panel_btn_next.classList.add('uw-visually-hide');
      }

    });
  }
  
});
