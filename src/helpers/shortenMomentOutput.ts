export default function(momentOutput: string): string {
  return momentOutput
    .replace(/a\sday/, '1d')
    .replace(/\sdays/, 'd')
    .replace(/an\shour/, '1h')
    .replace(/\shours/, 'h')
    .replace(/a\sminute/, '1m')
    .replace(/\sminutes/, 'm')
    .replace(/a\smonth/, '1mo')
    .replace(/\smonths/, 'mo')
    .replace(/a\syear?/, '1y')
    .replace(/\syears/, 'y')
}
