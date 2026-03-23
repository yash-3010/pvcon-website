const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "..", "src", "data", "company", "messages");

const translations = {
  de: {
    company: {
      hero: {
        tagline: "Unser Unternehmen",
        title: "Leitung & Globale Pr\u00e4senz",
        subtitle: "Lernen Sie die Menschen und das globale Netzwerk hinter PVCON kennen \u2014 Pharmakovigilanz-Exzellenz in 96 L\u00e4ndern und 4 Kontinenten.",
      },
      leadership: {
        tag: "Unternehmensleitung",
        heading: "Botschaft des CEO",
        ceo: {
          name: "Moin Don",
          title: "Pr\u00e4sident & CEO, Gr\u00fcnder",
          message: "Mit \u00fcber 33 Jahren Erfahrung in der Pharmaindustrie habe ich PVCON gegr\u00fcndet, um die L\u00fccke zwischen regulatorischen Anforderungen und operativer Realit\u00e4t in der Pharmakovigilanz zu schlie\u00dfen. In F\u00fchrungspositionen bei Sanofi Aventis und als Regional PV QA Director f\u00fcr den asiatisch-pazifischen Raum bei Johnson & Johnson erlebte ich den Bedarf an einem verl\u00e4sslichen Beratungspartner.",
          message2: "Heute ist PVCON in der gesamten Branche f\u00fcr seinen rigorosen Ansatz bei PV-Audits, Qualit\u00e4tssicherung und Unternehmensschulungen anerkannt. Unser Engagement f\u00fcr regulatorische Exzellenz und Patientensicherheit bleibt das Fundament all unserer Aktivit\u00e4ten.",
          credentials: [
            "Pharma Ratan 2016 Award \u2014 Lebenswerk in Arzneimittelsicherheit & PV",
            "Zertifizierter Lead Auditor \u2014 Ausbildung in USA, Deutschland, Frankreich & Singapur",
            "Adjunct Professor, Jamia Hamdard University",
            "Leiter, S\u00fcdasien-Kapitel \u2014 International Society of Pharmacovigilance (ISoP)",
            "Co-Autor, Indiens Nationales Pharmakovigilanz-Programm-Protokoll",
            "Mitglied, Central Advisory Committee \u2014 DIA India",
          ],
        },
      },
      globalPresence: {
        tag: "Globale Reichweite",
        heading: "Unsere Globale Pr\u00e4senz",
        subtitle: "Von unserem Hauptsitz in Mumbai aus betreut PVCON Kunden auf der ganzen Welt \u2014 Pharmakovigilanz-Beratung, GxP-Audits und regulatorische Unterst\u00fctzung.",
        stats: [
          { value: "96", label: "Betreute L\u00e4nder" },
          { value: "4", label: "Kontinente" },
          { value: "50+", label: "Kunden weltweit" },
        ],
      },
      team: {
        tag: "Unser Team",
        heading: "Die Menschen hinter PVCON",
        subtitle: "Ein Team erfahrener Pharmakovigilanz-Experten mit jahrzehntelanger kombinierter Erfahrung.",
        members: {
          "moin-don": { name: "Moin Don", role: "Pr\u00e4sident & CEO", bio: "33+ Jahre in der Pharmaindustrie. Ehemaliger Regional PV QA Director bei Johnson & Johnson, Asien-Pazifik. Zertifizierter Lead Auditor." },
          "rameez-don": { name: "Rameez Don", role: "Senior Consultant", bio: "10 Jahre Erfahrung in Pharmakovigilanz, Qualit\u00e4tssicherung und Training. Leiter der Gesch\u00e4ftsbereiche Operations und Training." },
          "sonam-garg": { name: "Sonam Garg", role: "Senior Consultant", bio: "5+ Jahre als GCP-Auditor und Dokumentationsspezialistin. Erfahrung in klinischer Forschungs-QA und Standort-Audits." },
          "nazrul-khan": { name: "Nazrul Islam Khan", role: "EU-Afrika Netzwerk-Direktor", bio: "14 Jahre PV-Operations- und Audit-Erfahrung. Ehemals MHRA und Janssen/J&J. Direktor von GPVQA (UK)." },
        },
      },
      cta: { heading: "Bereit, mit unserem Team zu arbeiten?", text: "Kontaktieren Sie unsere Pharmakovigilanz-Experten und erfahren Sie, wie PVCON Ihre regulatorische Compliance unterst\u00fctzen kann." },
      buttons: { getInTouch: "Kontakt aufnehmen" },
    },
  },
  fr: {
    company: {
      hero: {
        tagline: "Notre entreprise",
        title: "Direction & Pr\u00e9sence mondiale",
        subtitle: "D\u00e9couvrez les personnes et le r\u00e9seau mondial derri\u00e8re PVCON \u2014 l\u2019excellence en pharmacovigilance dans plus de 25 pays et 4 continents.",
      },
      leadership: {
        tag: "Direction",
        heading: "Message du PDG",
        ceo: {
          name: "Moin Don",
          title: "Pr\u00e9sident & PDG, Fondateur",
          message: "Fort de plus de 33 ans d\u2019exp\u00e9rience dans l\u2019industrie pharmaceutique, j\u2019ai fond\u00e9 PVCON pour combler le foss\u00e9 entre les attentes r\u00e9glementaires et la r\u00e9alit\u00e9 op\u00e9rationnelle en pharmacovigilance. Ayant occup\u00e9 des postes de direction chez Sanofi Aventis et en tant que Directeur R\u00e9gional PV QA Asie-Pacifique chez Johnson & Johnson, j\u2019ai constat\u00e9 le besoin d\u2019un partenaire de conseil fiable.",
          message2: "Aujourd\u2019hui, PVCON est reconnu dans l\u2019industrie pour son approche rigoureuse des audits PV, de l\u2019assurance qualit\u00e9 et de la formation. Notre engagement envers l\u2019excellence r\u00e9glementaire et la s\u00e9curit\u00e9 des patients reste le fondement de tout ce que nous faisons.",
          credentials: [
            "Prix Pharma Ratan 2016 \u2014 \u0152uvre d\u2019une vie en s\u00e9curit\u00e9 des m\u00e9dicaments & PV",
            "Auditeur principal certifi\u00e9 \u2014 Form\u00e9 aux USA, Allemagne, France & Singapour",
            "Professeur adjoint, Universit\u00e9 Jamia Hamdard",
            "Responsable, Chapitre Asie du Sud \u2014 International Society of Pharmacovigilance (ISoP)",
            "Co-auteur, Protocole du Programme National de Pharmacovigilance de l\u2019Inde",
            "Membre, Comit\u00e9 consultatif central \u2014 DIA India",
          ],
        },
      },
      globalPresence: {
        tag: "Port\u00e9e mondiale",
        heading: "Notre pr\u00e9sence mondiale",
        subtitle: "Depuis notre si\u00e8ge \u00e0 Mumbai, PVCON accompagne des clients \u00e0 travers le monde \u2014 conseil en pharmacovigilance, audits GxP et soutien r\u00e9glementaire.",
        stats: [
          { value: "96", label: "Pays desservis" },
          { value: "4", label: "Continents" },
          { value: "50+", label: "Clients dans le monde" },
        ],
      },
      team: {
        tag: "Notre \u00e9quipe",
        heading: "Les personnes derri\u00e8re PVCON",
        subtitle: "Une \u00e9quipe de professionnels exp\u00e9riment\u00e9s en pharmacovigilance avec des d\u00e9cennies d\u2019exp\u00e9rience combin\u00e9e.",
        members: {
          "moin-don": { name: "Moin Don", role: "Pr\u00e9sident & PDG", bio: "33+ ans dans l\u2019industrie pharmaceutique. Ancien Directeur R\u00e9gional PV QA chez Johnson & Johnson, Asie-Pacifique. Auditeur principal certifi\u00e9." },
          "rameez-don": { name: "Rameez Don", role: "Consultant senior", bio: "10 ans d\u2019exp\u00e9rience en pharmacovigilance, assurance qualit\u00e9 et formation. Dirige les divisions Op\u00e9rations et Formation." },
          "sonam-garg": { name: "Sonam Garg", role: "Consultante senior", bio: "5+ ans comme auditrice GCP et sp\u00e9cialiste documentation. Exp\u00e9rienc\u00e9e en AQ recherche clinique et audits de sites." },
          "nazrul-khan": { name: "Nazrul Islam Khan", role: "Directeur R\u00e9seau UE-Afrique", bio: "14 ans d\u2019exp\u00e9rience en op\u00e9rations PV et audit. Ancien professionnel MHRA et Janssen/J&J. Directeur de GPVQA (UK)." },
        },
      },
      cta: { heading: "Pr\u00eat \u00e0 travailler avec notre \u00e9quipe ?", text: "Contactez nos experts en pharmacovigilance et d\u00e9couvrez comment PVCON peut soutenir votre conformit\u00e9 r\u00e9glementaire." },
      buttons: { getInTouch: "Nous contacter" },
    },
  },
  zh: {
    company: {
      hero: {
        tagline: "\u6211\u4eec\u7684\u516c\u53f8",
        title: "\u9886\u5bfc\u56e2\u961f\u4e0e\u5168\u7403\u5e03\u5c40",
        subtitle: "\u4e86\u89e3PVCON\u80cc\u540e\u7684\u56e2\u961f\u548c\u5168\u7403\u7f51\u7edc\u2014\u2014\u5728\u8d85\u8fc725\u4e2a\u56fd\u5bb6\u548c4\u4e2a\u5927\u6d32\u63a8\u52a8\u836f\u7269\u8b66\u6212\u5353\u8d8a\u3002",
      },
      leadership: {
        tag: "\u9886\u5bfc\u56e2\u961f",
        heading: "CEO\u5bc4\u8bed",
        ceo: {
          name: "Moin Don",
          title: "\u603b\u88c1\u517cCEO\uff0c\u521b\u59cb\u4eba",
          message: "\u62e5\u6709\u8d85\u8fc733\u5e74\u5236\u836f\u884c\u4e1a\u7ecf\u9a8c\uff0c\u6211\u521b\u7acb\u4e86PVCON\uff0c\u65e8\u5728\u5f25\u5408\u836f\u7269\u8b66\u6212\u9886\u57df\u76d1\u7ba1\u671f\u671b\u4e0e\u8fd0\u8425\u5b9e\u9645\u4e4b\u95f4\u7684\u5dee\u8ddd\u3002\u66fe\u5728\u8d5b\u8bfa\u83f2\u62c5\u4efb\u9886\u5bfc\u804c\u52a1\uff0c\u5e76\u5728\u5f3a\u751f\u62c5\u4efb\u4e9a\u592a\u533a\u57dfPV QA\u603b\u76d1\uff0c\u6211\u4eb2\u8eab\u611f\u53d7\u5230\u884c\u4e1a\u5bf9\u53ef\u4fe1\u8d56\u54a8\u8be2\u5408\u4f5c\u4f19\u4f34\u7684\u8feb\u5207\u9700\u6c42\u3002",
          message2: "\u5982\u4eca\uff0cPVCON\u56e0\u5176\u5728PV\u5ba1\u8ba1\u3001\u8d28\u91cf\u4fdd\u8bc1\u548c\u4f01\u4e1a\u57f9\u8bad\u65b9\u9762\u7684\u4e25\u8c28\u65b9\u6cd5\u800c\u83b7\u5f97\u4e1a\u754c\u8ba4\u53ef\u3002\u6211\u4eec\u5bf9\u76d1\u7ba1\u5353\u8d8a\u548c\u60a3\u8005\u5b89\u5168\u7684\u627f\u8bfa\u59cb\u7ec8\u662f\u6211\u4eec\u4e00\u5207\u5de5\u4f5c\u7684\u57fa\u77f3\u3002",
          credentials: [
            "Pharma Ratan 2016\u5956\u2014\u2014\u836f\u7269\u5b89\u5168\u4e0ePV\u7ec8\u8eab\u6210\u5c31\u5956",
            "\u8ba4\u8bc1\u4e3b\u4efb\u5ba1\u8ba1\u5e08\u2014\u2014\u5728\u7f8e\u56fd\u3001\u5fb7\u56fd\u3001\u6cd5\u56fd\u548c\u65b0\u52a0\u5761\u63a5\u53d7\u57f9\u8bad",
            "Jamia Hamdard\u5927\u5b66\u517c\u804c\u6559\u6388",
            "\u56fd\u9645\u836f\u7269\u8b66\u6212\u5b66\u4f1a\uff08ISoP\uff09\u5357\u4e9a\u5206\u4f1a\u8d1f\u8d23\u4eba",
            "\u5370\u5ea6\u56fd\u5bb6\u836f\u7269\u8b66\u6212\u8ba1\u5212\u534f\u8bae\u5171\u540c\u4f5c\u8005",
            "DIA India\u4e2d\u592e\u54a8\u8be2\u59d4\u5458\u4f1a\u6210\u5458",
          ],
        },
      },
      globalPresence: {
        tag: "\u5168\u7403\u8986\u76d6",
        heading: "\u6211\u4eec\u7684\u5168\u7403\u5e03\u5c40",
        subtitle: "\u4ecePVCON\u5b5f\u4e70\u603b\u90e8\u51fa\u53d1\uff0c\u6211\u4eec\u4e3a\u5168\u7403\u5ba2\u6237\u63d0\u4f9b\u836f\u7269\u8b66\u6212\u54a8\u8be2\u3001GxP\u5ba1\u8ba1\u548c\u76d1\u7ba1\u652f\u6301\u670d\u52a1\u3002",
        stats: [
          { value: "96", label: "\u670d\u52a1\u56fd\u5bb6" },
          { value: "4", label: "\u5927\u6d32" },
          { value: "50+", label: "\u5168\u7403\u5ba2\u6237" },
        ],
      },
      team: {
        tag: "\u6211\u4eec\u7684\u56e2\u961f",
        heading: "PVCON\u80cc\u540e\u7684\u4eba",
        subtitle: "\u4e00\u652f\u7ecf\u9a8c\u4e30\u5bcc\u7684\u836f\u7269\u8b66\u6212\u4e13\u4e1a\u56e2\u961f\uff0c\u62e5\u6709\u6570\u5341\u5e74\u7684\u7efc\u5408\u7ecf\u9a8c\u3002",
        members: {
          "moin-don": { name: "Moin Don", role: "\u603b\u88c1\u517cCEO", bio: "33+\u5e74\u5236\u836f\u884c\u4e1a\u7ecf\u9a8c\u3002\u66fe\u4efb\u5f3a\u751f\u4e9a\u592a\u533a\u57dfPV QA\u603b\u76d1\u3002\u8ba4\u8bc1\u4e3b\u4efb\u5ba1\u8ba1\u5e08\u3002" },
          "rameez-don": { name: "Rameez Don", role: "\u9ad8\u7ea7\u987e\u95ee", bio: "10\u5e74\u836f\u7269\u8b66\u6212\u3001\u8d28\u91cf\u4fdd\u8bc1\u548c\u57f9\u8bad\u7ecf\u9a8c\u3002\u8d1f\u8d23\u4e1a\u52a1\u8fd0\u8425\u548c\u57f9\u8bad\u90e8\u95e8\u3002" },
          "sonam-garg": { name: "Sonam Garg", role: "\u9ad8\u7ea7\u987e\u95ee", bio: "5+\u5e74GCP\u5ba1\u8ba1\u5e08\u548c\u6587\u6863\u4e13\u5bb6\u3002\u62e5\u6709\u4e34\u5e8a\u7814\u7a76QA\u548c\u7814\u7a76\u8005\u73b0\u573a\u5ba1\u8ba1\u7ecf\u9a8c\u3002" },
          "nazrul-khan": { name: "Nazrul Islam Khan", role: "\u6b27\u6d32-\u975e\u6d32\u7f51\u7edc\u603b\u76d1", bio: "14\u5e74PV\u8fd0\u8425\u548c\u5ba1\u8ba1\u7ecf\u9a8c\u3002\u66fe\u4efbMHRA\u548cJanssen/J&J\u4e13\u4e1a\u4eba\u58eb\u3002GPVQA\uff08\u82f1\u56fd\uff09\u603b\u76d1\u3002" },
        },
      },
      cta: { heading: "\u51c6\u5907\u597d\u4e0e\u6211\u4eec\u7684\u56e2\u961f\u5408\u4f5c\u4e86\u5417\uff1f", text: "\u8054\u7cfb\u6211\u4eec\u7684\u836f\u7269\u8b66\u6212\u4e13\u5bb6\uff0c\u4e86\u89e3PVCON\u5982\u4f55\u652f\u6301\u60a8\u7684\u76d1\u7ba1\u5408\u89c4\u548c\u836f\u7269\u5b89\u5168\u8fd0\u8425\u3002" },
      buttons: { getInTouch: "\u8054\u7cfb\u6211\u4eec" },
    },
  },
  ja: {
    company: {
      hero: {
        tagline: "\u4f1a\u793e\u6982\u8981",
        title: "\u30ea\u30fc\u30c0\u30fc\u30b7\u30c3\u30d7\u3068\u30b0\u30ed\u30fc\u30d0\u30eb\u30d7\u30ec\u30bc\u30f3\u30b9",
        subtitle: "PVCON\u306e\u30c1\u30fc\u30e0\u3068\u30b0\u30ed\u30fc\u30d0\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3092\u3054\u7d39\u4ecb\u3057\u307e\u3059\u2014\u201425\u4ee5\u4e0a\u306e\u56fd\u30684\u5927\u9678\u3067\u30d5\u30a1\u30fc\u30de\u30b3\u30d3\u30b8\u30e9\u30f3\u30b9\u306e\u5353\u8d8a\u6027\u3092\u63a8\u9032\u3057\u3066\u3044\u307e\u3059\u3002",
      },
      leadership: {
        tag: "\u30ea\u30fc\u30c0\u30fc\u30b7\u30c3\u30d7",
        heading: "CEO\u30e1\u30c3\u30bb\u30fc\u30b8",
        ceo: {
          name: "Moin Don",
          title: "\u4ee3\u8868\u53d6\u7de0\u5f79\u793e\u9577\u517cCEO\u3001\u5275\u8a2d\u8005",
          message: "\u88fd\u85ac\u696d\u754c\u306733\u5e74\u4ee5\u4e0a\u306e\u7d4c\u9a13\u3092\u6301\u3061\u3001\u30d5\u30a1\u30fc\u30de\u30b3\u30d3\u30b8\u30e9\u30f3\u30b9\u306b\u304a\u3051\u308b\u898f\u5236\u671f\u5f85\u3068\u904b\u55b6\u73fe\u5b9f\u306e\u30ae\u30e3\u30c3\u30d7\u3092\u57cb\u3081\u308b\u305f\u3081\u306bPVCON\u3092\u8a2d\u7acb\u3057\u307e\u3057\u305f\u3002\u30b5\u30ce\u30d5\u30a3\u30a2\u30d9\u30f3\u30c6\u30a3\u30b9\u3067\u306e\u30ea\u30fc\u30c0\u30fc\u30b7\u30c3\u30d7\u5f79\u8077\u3001\u30b8\u30e7\u30f3\u30bd\u30f3\u30fb\u30a8\u30f3\u30c9\u30fb\u30b8\u30e7\u30f3\u30bd\u30f3\u3067\u306e\u30a2\u30b8\u30a2\u592a\u5e73\u6d0b\u5730\u57dfPV QA\u30c7\u30a3\u30ec\u30af\u30bf\u30fc\u3068\u3057\u3066\u306e\u7d4c\u9a13\u304b\u3089\u3001\u4fe1\u983c\u3067\u304d\u308b\u30b3\u30f3\u30b5\u30eb\u30c6\u30a3\u30f3\u30b0\u30d1\u30fc\u30c8\u30ca\u30fc\u306e\u5fc5\u8981\u6027\u3092\u5b9f\u611f\u3057\u307e\u3057\u305f\u3002",
          message2: "\u73fe\u5728\u3001PVCON\u306fPV\u76e3\u67fb\u3001\u54c1\u8cea\u4fdd\u8a3c\u3001\u4f01\u696d\u7814\u4fee\u306b\u304a\u3051\u308b\u53b3\u683c\u306a\u30a2\u30d7\u30ed\u30fc\u30c1\u3067\u696d\u754c\u5168\u4f53\u304b\u3089\u8a8d\u77e5\u3055\u308c\u3066\u3044\u307e\u3059\u3002\u898f\u5236\u306e\u5353\u8d8a\u6027\u3068\u60a3\u8005\u5b89\u5168\u3078\u306e\u30b3\u30df\u30c3\u30c8\u30e1\u30f3\u30c8\u306f\u3001\u79c1\u305f\u3061\u306e\u3059\u3079\u3066\u306e\u6d3b\u52d5\u306e\u57fa\u76e4\u3067\u3059\u3002",
          credentials: [
            "Pharma Ratan 2016\u8cde\u2014\u2014\u533b\u85ac\u54c1\u5b89\u5168\u6027\u30fbPV\u306b\u304a\u3051\u308b\u751f\u6daf\u529f\u7e3e\u8cde",
            "\u8a8d\u5b9a\u30ea\u30fc\u30c9\u30aa\u30fc\u30c7\u30a3\u30bf\u30fc\u2014\u2014\u7c73\u56fd\u3001\u30c9\u30a4\u30c4\u3001\u30d5\u30e9\u30f3\u30b9\u3001\u30b7\u30f3\u30ac\u30dd\u30fc\u30eb\u3067\u8a13\u7df4",
            "Jamia Hamdard\u5927\u5b66\u5ba2\u54e1\u6559\u6388",
            "\u56fd\u969b\u30d5\u30a1\u30fc\u30de\u30b3\u30d3\u30b8\u30e9\u30f3\u30b9\u5b66\u4f1a\uff08ISoP\uff09\u5357\u30a2\u30b8\u30a2\u652f\u90e8\u30ea\u30fc\u30c9",
            "\u30a4\u30f3\u30c9\u56fd\u5bb6\u30d5\u30a1\u30fc\u30de\u30b3\u30d3\u30b8\u30e9\u30f3\u30b9\u30d7\u30ed\u30b0\u30e9\u30e0\u30d7\u30ed\u30c8\u30b3\u30eb\u5171\u8457",
            "DIA India\u4e2d\u592e\u8aee\u554f\u59d4\u54e1\u4f1a\u30e1\u30f3\u30d0\u30fc",
          ],
        },
      },
      globalPresence: {
        tag: "\u30b0\u30ed\u30fc\u30d0\u30eb\u30ea\u30fc\u30c1",
        heading: "\u30b0\u30ed\u30fc\u30d0\u30eb\u30d7\u30ec\u30bc\u30f3\u30b9",
        subtitle: "\u30e0\u30f3\u30d0\u30a4\u672c\u793e\u304b\u3089\u3001PVCON\u306f\u4e16\u754c\u4e2d\u306e\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u306b\u30d5\u30a1\u30fc\u30de\u30b3\u30d3\u30b8\u30e9\u30f3\u30b9\u30b3\u30f3\u30b5\u30eb\u30c6\u30a3\u30f3\u30b0\u3001GxP\u76e3\u67fb\u3001\u898f\u5236\u30b5\u30dd\u30fc\u30c8\u3092\u63d0\u4f9b\u3057\u3066\u3044\u307e\u3059\u3002",
        stats: [
          { value: "96", label: "\u30b5\u30fc\u30d3\u30b9\u63d0\u4f9b\u56fd" },
          { value: "4", label: "\u5927\u9678" },
          { value: "50+", label: "\u4e16\u754c\u4e2d\u306e\u30af\u30e9\u30a4\u30a2\u30f3\u30c8" },
        ],
      },
      team: {
        tag: "\u30c1\u30fc\u30e0",
        heading: "PVCON\u306e\u30e1\u30f3\u30d0\u30fc",
        subtitle: "\u6570\u5341\u5e74\u306e\u7d4c\u9a13\u3092\u6301\u3064\u30d5\u30a1\u30fc\u30de\u30b3\u30d3\u30b8\u30e9\u30f3\u30b9\u5c02\u9580\u5bb6\u30c1\u30fc\u30e0\u3002",
        members: {
          "moin-don": { name: "Moin Don", role: "\u4ee3\u8868\u53d6\u7de0\u5f79\u793e\u9577\u517cCEO", bio: "\u88fd\u85ac\u696d\u754c33\u5e74\u4ee5\u4e0a\u3002\u5143J&J\u30a2\u30b8\u30a2\u592a\u5e73\u6d0bPV QA\u30c7\u30a3\u30ec\u30af\u30bf\u30fc\u3002\u8a8d\u5b9a\u30ea\u30fc\u30c9\u30aa\u30fc\u30c7\u30a3\u30bf\u30fc\u3002" },
          "rameez-don": { name: "Rameez Don", role: "\u30b7\u30cb\u30a2\u30b3\u30f3\u30b5\u30eb\u30bf\u30f3\u30c8", bio: "PV\u3001\u54c1\u8cea\u4fdd\u8a3c\u3001\u30c8\u30ec\u30fc\u30cb\u30f3\u30b0\u306710\u5e74\u306e\u7d4c\u9a13\u3002\u4e8b\u696d\u904b\u55b6\u30fb\u7814\u4fee\u90e8\u9580\u8cac\u4efb\u8005\u3002" },
          "sonam-garg": { name: "Sonam Garg", role: "\u30b7\u30cb\u30a2\u30b3\u30f3\u30b5\u30eb\u30bf\u30f3\u30c8", bio: "GCP\u76e3\u67fb\u54e1\u30fb\u6587\u66f8\u5c02\u9580\u5bb6\u30685\u5e74\u4ee5\u4e0a\u306e\u7d4c\u9a8c\u3002\u81e8\u5e8a\u7814\u7a76QA\u3068\u30b5\u30a4\u30c8\u76e3\u67fb\u306e\u5b9f\u52d9\u7d4c\u9a13\u3002" },
          "nazrul-khan": { name: "Nazrul Islam Khan", role: "EU\u30fb\u30a2\u30d5\u30ea\u30ab\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u30c7\u30a3\u30ec\u30af\u30bf\u30fc", bio: "PV\u904b\u55b6\u30fb\u76e3\u67fb14\u5e74\u306e\u7d4c\u9a13\u3002\u5143MHRA\u30fbJanssen/J&J\u3002GPVQA\uff08UK\uff09\u30c7\u30a3\u30ec\u30af\u30bf\u30fc\u3002" },
        },
      },
      cta: { heading: "\u79c1\u305f\u3061\u306e\u30c1\u30fc\u30e0\u3068\u50cd\u304f\u6e96\u5099\u306f\u3067\u304d\u3066\u3044\u307e\u3059\u304b\uff1f", text: "PVCON\u306e\u30d5\u30a1\u30fc\u30de\u30b3\u30d3\u30b8\u30e9\u30f3\u30b9\u5c02\u9580\u5bb6\u306b\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044\u3002" },
      buttons: { getInTouch: "\u304a\u554f\u3044\u5408\u308f\u305b" },
    },
  },
};

for (const [locale, data] of Object.entries(translations)) {
  const outPath = path.join(baseDir, `${locale}.json`);
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`Created: ${outPath}`);
}
console.log("Done!");
