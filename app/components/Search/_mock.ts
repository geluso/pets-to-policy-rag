import { Paragraph, SourceDocumentProps } from "@/app/types";

export const rawParagraphsJSON = '[[{"i":false,"t":"The legal framework for the use and management of electronic and digital signatures by higher education institutions is outlined under Texas law."},{"i":true,"t":" Section 51.9336 specifies "},{"i":false,"t":"that institutions are responsible for determining their own policies regarding electronic and digital signatures, superseding any conflicting provisions of Chapter 322, Business & Commerce Code."},{"i":true,"t":" The institutions may adopt their own rules "},{"i":false,"t":"to govern these practices."}],[{"i":false,"t":"In addition, "},{"i":true,"t":"rules ensuring compliance with federal confidentiality laws, specifically the Family Educational Rights and Privacy Act (FERPA), "},{"i":false,"t":"are mandated under Sections 51.259 and 51.295."},{"i":true,"t":" These rules are to be developed by the coordinating board "},{"i":false,"t":"using negotiated rulemaking procedures."}],[{"i":false,"t":"The recent legislation, as reflected in these documents, ensures a comprehensive framework that aligns both digital transformation in educational institutions and adherence to federal privacy standards."}],[{"i":false,"t":"Relevant legal references include:"}],[{"i":true,"t":"- Section 51.9336 "},{"i":false,"t":"regarding electronic and digital signatures"},{"i":true,"t":"- Section 51.259 "},{"i":false,"t":"related to confidentiality of student educational information"},{"i":true,"t":"- Section 51.295 "},{"i":false,"t":"covering rules on confidentiality and compliance with federal law"}]]'
export const rawFullJSON = '{"a":[[{"i":false,"t":"The legal framework for the use and management of electronic and digital signatures by higher education institutions is outlined under Texas law."},{"i":true,"t":" Section 51.9336 specifies "},{"i":false,"t":"that institutions are responsible for determining their own policies regarding electronic and digital signatures, superseding any conflicting provisions of Chapter 322, Business & Commerce Code."},{"i":true,"t":" The institutions may adopt their own rules "},{"i":false,"t":"to govern these practices."}],[{"i":false,"t":"In addition, "},{"i":true,"t":"rules ensuring compliance with federal confidentiality laws, specifically the Family Educational Rights and Privacy Act (FERPA), "},{"i":false,"t":"are mandated under Sections 51.259 and 51.295."},{"i":true,"t":" These rules are to be developed by the coordinating board "},{"i":false,"t":"using negotiated rulemaking procedures."}],[{"i":false,"t":"The recent legislation, as reflected in these documents, ensures a comprehensive framework that aligns both digital transformation in educational institutions and adherence to federal privacy standards."}],[{"i":false,"t":"Relevant legal references include:"}],[{"i":true,"t":"- Section 51.9336 "},{"i":false,"t":"regarding electronic and digital signatures"},{"i":true,"t":"- Section 51.259 "},{"i":false,"t":"related to confidentiality of student educational information"},{"i":true,"t":"- Section 51.295 "},{"i":false,"t":"covering rules on confidentiality and compliance with federal law"}]]}'

export const paragraphs: Paragraph[] = [
    [
      {
        isImportant: true,
        text: 'This is a test'
      },
      {
        isImportant: false,
        text: 'This is a test'
      }
    ],
    [
      {
        isImportant: true,
        text: 'This is also a test'
      },
      {
        isImportant: false,
        text: 'This is also a test'
      }
    ],
]

export const sources: SourceDocumentProps[] = [
    {
        title: 'Source 1',
        url: 'https://www.google.com',
        text: 'This is a test'
    },
    {
        title: 'Source 2',
        url: 'https://www.google.com',
        text: 'This is a test'
    }
]