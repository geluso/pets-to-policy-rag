export async function getResults(text: string) {
  console.log('get results', text)
  return [
    "Public schools means the common schools as referred to in Article IX of the state Constitution, charter schools established under chapter 28A.710 RCW, and those schools and institutions of learning having a curriculum below the college or university level as now or may be established by law and maintained at public expense.",
    "Common schools means schools maintained at public expense in each school district and carrying on a program from kindergarten through the twelfth grade or any part thereof including vocational educational courses otherwise permitted by law.",
    "(1) All of the state legal holidays set forth in RCW 1.16.050(1) are also school holidays and school may not be taught on these days.  (2) No reduction from a teacher's time or salary may be made by reason of the fact that a school day happens to be one of the days referred to in this section as a day on which school is not taught.",
  ].filter(doc => !text || doc.includes(text))
}