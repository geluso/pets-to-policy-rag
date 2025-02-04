/* eslint-disable  @typescript-eslint/no-explicit-any */

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export const OurCustomFakeEmbedder = {
  embedDocuments: async (documents: string[]) => { 
    console.error('embedDocuments should never be called')
    // create a fake vector for each doc
    return documents.map(doc => [0])
  },
  embedQuery: async (document: string) => {
    console.error('embedQuery should never be called')
    // return 1 fake vector for the doc
    return [0]
  }
}


export default prisma;

