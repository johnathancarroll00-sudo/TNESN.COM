import superjson from 'superjson';
export type ScoreItem={league:'NHL'|'NBA'|'MLB';team:string;away:string;home:string;awayScore:number;homeScore:number;awayLogo:string;homeLogo:string;status:string;gameDate:string;gameUrl?:string};
export type OutputType={scores:ScoreItem[]};
export async function getScores():Promise<OutputType>{const r=await fetch('/_api/scores');if(!r.ok)throw new Error('Could not load scores');return superjson.parse(await r.text())}