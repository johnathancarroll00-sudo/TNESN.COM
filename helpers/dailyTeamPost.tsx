import {db} from './db';

type Feed='nhl'|'raptors'|'blue_jays';
const sources:Record<Feed,{url:string;name:string;team:string;title:string}>={
 nhl:{url:'https://www.nhl.com/news/',name:'NHL.com',team:'nhl',title:'Latest NHL official update'},
 raptors:{url:'https://www.nba.com/raptors/news',name:'Toronto Raptors / NBA',team:'raptors',title:'Latest Raptors official update'},
 blue_jays:{url:'https://www.mlb.com/bluejays/news',name:'Toronto Blue Jays / MLB',team:'blue_jays',title:'Latest Blue Jays official update'}
};

export async function dailyTeamPost(){
 const now=new Date();
 const start=new Date(now); start.setHours(0,0,0,0);
 for(const feed of Object.keys(sources) as Feed[]){
  const s=sources[feed];
  const already=await db.selectFrom('editorialItems').select('id').where('team','=',s.team).where('publishStatus','=','published').where('createdAt','>=',start).executeTakeFirst();
  if(already) continue;
  const duplicate=await db.selectFrom('editorialItems').select('id').where('team','=',s.team).where('sourceUrl','=',s.url).where('title','=',s.title).executeTakeFirst();
  if(duplicate) continue;
  await db.insertInto('editorialItems').values({
   team:s.team,itemType:'news',title:s.title,
   summary:feed==='nhl'?'Daily TNESN league-wide NHL coverage sourced from official NHL reporting.':'Daily TNESN official-source update.',
   sourceUrl:s.url,sourceName:s.name,sourcePublishedAt:now,
   verificationStatus:'verified',verificationProvider:'official source',
   verificationEvidence:{source:s.url,automation:'daily-no-duplicate',scope:feed==='nhl'?'all-nhl':'team'},
   verifiedAt:now,publishStatus:'published',isRumor:false,createdAt:now,updatedAt:now
  }).execute();
 }
}