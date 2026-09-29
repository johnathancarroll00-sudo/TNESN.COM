import { db } from './db';

const FRESH_MS=5*60*1000;
const LOCK_MS=2*60*1000;

export async function claimFeedRefresh(feedKey:string){
 const now=new Date();
 const state=await db.selectFrom('feedRefreshState').selectAll().where('feedKey','=',feedKey).executeTakeFirst();
 if(state?.lastRefreshedAt && now.getTime()-new Date(state.lastRefreshedAt).getTime()<FRESH_MS) return {refresh:false,reason:'fresh'} as const;
 if(state?.refreshStartedAt && now.getTime()-new Date(state.refreshStartedAt).getTime()<LOCK_MS) return {refresh:false,reason:'locked'} as const;
 const token=crypto.randomUUID();
 await db.insertInto('feedRefreshState').values({feedKey,refreshStartedAt:now,refreshToken:token,updatedAt:now})
  .onConflict(oc=>oc.column('feedKey').doUpdateSet({refreshStartedAt:now,refreshToken:token,updatedAt:now})).execute();
 return {refresh:true,token} as const;
}

export async function completeFeedRefresh(feedKey:string,token:string){
 const now=new Date();
 await db.updateTable('feedRefreshState').set({lastRefreshedAt:now,refreshStartedAt:null,refreshToken:null,updatedAt:now})
  .where('feedKey','=',feedKey).where('refreshToken','=',token).execute();
}

export async function releaseFeedRefresh(feedKey:string,token:string){
 await db.updateTable('feedRefreshState').set({refreshStartedAt:null,refreshToken:null,updatedAt:new Date()})
  .where('feedKey','=',feedKey).where('refreshToken','=',token).execute();
}
