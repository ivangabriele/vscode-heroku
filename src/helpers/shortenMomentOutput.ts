export default function(momentOutput: string): string {
  return momentOutput
    .replace(/a\sday/, '1d')
    .replace(/\sdays/, 'd')
    .replace(/\shours?/, 'h')
    .replace(/\sminutes?/, 'm')
    .replace(/\smonths?/, 'mo')
    .replace(/\sseconds?/, 's')
    .replace(/\syears?/, 'y')
}
