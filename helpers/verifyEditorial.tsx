export type VerificationResult={status:'verified'|'review';provider:'firecrawl'|'parallel'|'none';evidence:unknown;reason?:string};
const official=['nhl.com','nba.com','mlb.com'];
const domain=(url:string)=>{try{return new URL(url).hostname.replace(/^www\./,'')}catch{return ''}};
const officialSource=(url:string)=>official.some(d=>domain(url)===d||domain(url).endsWith('.'+d));

async function firecrawl(url:string,claim:string):Promise<VerificationResult|null>{
 const key=process.env.FIRECRAWL_API_KEY;if(!key)return null;
 const r=await fetch('https://api.firecrawl.dev/v1/scrape',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},body:JSON.stringify({url,formats:['markdown'],onlyMainContent:true})});
 if(r.status===402||r.status===429)return null;
 if(!r.ok)return {status:'review',provider:'firecrawl',evidence:{httpStatus:r.status},reason:'Firecrawl could not verify source'};
 const data:any=await r.json(); const body=String(data?.data?.markdown||'').toLowerCase();
 const words=claim.toLowerCase().split(/\W+/).filter(w=>w.length>4).slice(0,8);
 const matches=words.filter(w=>body.includes(w)).length;
 return matches>=Math.min(3,words.length)&&officialSource(url)
  ?{status:'verified',provider:'firecrawl',evidence:{source:url,matchedTerms:matches}}
  :{status:'review',provider:'firecrawl',evidence:{source:url,matchedTerms:matches},reason:'Claim/source match requires editorial review'};
}

async function parallel(url:string,claim:string):Promise<VerificationResult>{
 const key=process.env.PARALLEL_API_KEY;if(!key)return {status:'review',provider:'none',evidence:{source:url},reason:'No fallback verifier connected'};
 const r=await fetch('https://api.parallel.ai/v1/search',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':key},body:JSON.stringify({mode:'fast',objective:'Verify this sports claim against the supplied authoritative source: '+claim,search_queries:[claim],advanced_settings:{max_results:10}})});
 if(!r.ok)return {status:'review',provider:'parallel',evidence:{httpStatus:r.status},reason:'Parallel could not verify claim'};
 const data:any=await r.json(); const results=Array.isArray(data?.results)?data.results:[];
 const hit=results.find((x:any)=>x?.url===url||officialSource(String(x?.url||'')));
 return hit&&officialSource(String(hit.url||url))
  ?{status:'verified',provider:'parallel',evidence:{source:hit.url,title:hit.title||null}}
  :{status:'review',provider:'parallel',evidence:{source:url},reason:'No authoritative Parallel result matched'};
}

export async function verifyEditorial(url:string,claim:string):Promise<VerificationResult>{
 const primary=await firecrawl(url,claim);
 if(primary)return primary;
 return parallel(url,claim);
}