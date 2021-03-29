require('dotenv-flow').config()

module.exports = {
  env: process.env.ELEVENTY_ENV,
  locales: {
    en: {
      title: "COVID-19 Health Screen",
      description: "COVID-19 self-monitoring survey for members of and visitors to the UW–Madison campus community.",
      label_yes: "Yes",
      label_no: "No",
      next_button: "Next",
      start_over_button: "Start over",
      thank_you: "Thank you!",
      students_def: "Includes grad/professional students and student employees"
    },
    es: {
      title: "Chequeo o evaluación de salud de <i>COVID-19</i>",
      description: "Cuestionario de monitoreo personal de síntomas de COVID-19 para miembros y visitantes de la comunidad universitaria de UW–Madison.",
      label_yes: "Sí",
      label_no: "No",
      next_button: "Siguiente",
      start_over_button: "Empiece de nuevo",
      thank_you: "¡Gracias!",
      students_def: "Incluyendo estudiantes de posgrado, profesionales y estudiantes empleados"
    },
    zh: {
      title: "新冠肺炎(<i>COVID-19</i>)筛查",
      description: "为威大-麦迪逊分校成员和访客提供的自我监测 COVID-19 问卷。",
      label_yes: "是",
      label_no: "否",
      next_button: "下一页",
      start_over_button: "重新开始",
      thank_you: "谢谢您!",
      students_def: "包括研究生、专业学位学生和学生员工"
    },
    hmn: {
      title: "Kev nug ntsuam saib puas muaj tus kab mob COVID-19",
      description: "Lus nug ntsuam cim mob COVID-19 ntawm tus kheej rau cov neeg thiab qhua tuaj rau hauv UW–Madison thaj chaw kawm ntawv.",
      label_yes: "Muaj",
      label_no: "Tsis muaj",
      next_button: "Mus tom ntej",
      start_over_button: "Pib dua",
      thank_you: "Ua tsaug!",
      students_def: "nrog rau cov Graduate, Professional, thiab Mejyig-Ua Haujlwm"
    },
    ne: {
      title: "<i>COVID-19</i> स्वास्थ्य जाँच",
      description: "UW–Madison क्याम्पस समुदायका सदस्यहरू र पाहुनाहरूका लागि <i>COVID-19</i> आत्म-निगरानीको सर्वेक्षण",
      label_yes: "छ",
      label_no: "छैन",
      next_button: "अर्को",
      start_over_button: "फेरि सुरु गर्नुहोस्",
      thank_you: "धन्यवाद!",
      students_def: "Graduate, व्यावसायिक, र विद्यार्थी कर्मचारीहरू"
    },
    sit: {
      title: "ཏོག་དབྱིབས་གཉན་རིམས་ ༡༩ ཡི་བདེ་ཐང་བརྟག་དཔྱད།",
      description: "ཝི་སི་ཀོན་སིན་གཙུག་ལག་སློབ་ཆེན་(མལ་ཌི་སིན་)སློབ་གྲྭའི་ཚོགས་མི་དང་གཟིགས་སྐོར་པའི་ཆེད་དུ་ཏོག་དབྱིབས་གཉན་རིམས་ ༡༩ ཡི་རང་ཉིད་ལྟ་ཞིབ་དྲི་བ།",
      label_yes: "ཡོད།",
      label_no: "མེད།",
      next_button: "རྗེས་མ།",
      start_over_button: "བསྐྱར་དུ་འགོ་འཛུགས།",
      thank_you: "ཐུགས་རྗེ་ཆེ།",
      students_def: "ཞིབ་འཇུག་སློབ་མ་དང་། ཆེད་ལས་པ། སློབ་ཕྲུག་ལས་མི་བཅས་ཚུད་ཡོད"
    }
  }
};