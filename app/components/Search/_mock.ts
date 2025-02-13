import { Paragraph, Source } from "@/app/types";

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

export const sources: Source[] = [
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