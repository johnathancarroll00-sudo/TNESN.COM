const ALLOWED_HOSTS=new Set(['www.nhl.com','nhl.com','www.nba.com','nba.com','www.mlb.com','mlb.com']);

function decodeHtml(s:string){return s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>')}

export async function handle(request:Request){
 try{
  const u=new URL(request.url),raw=u.searchParams.get('url');
  if(!raw)return new Response('Missing url',{status:400});
  const source=new URL(raw);
  if(source.protocol!=='https:'||!ALLOWED_HOSTS.has(source.hostname))return new Response('Unsupported source',{status:400});
  const r=await fetch(source.toString(),{headers:{'user-agent':'TNESN/1.0 (+https://tnesn.com)'}});
  if(!r.ok)return new Response('Source unavailable',{status:404});
  const html=await r.text();
  const patterns=[
   /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
   /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
   /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
   /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i
  ];
  let image='';
  for(const re of patterns){const m=html.match(re);if(m?.[1]){image=decodeHtml(m[1]);break}}
  if(!image)return new Response('No original thumbnail',{status:404});
  // NHL article metadata sometimes serves a tiny size50 rendition. Keep the exact
  // verified source asset but request a card-sized rendition from the same NHL CDN.
  if(source.hostname.endsWith('nhl.com')&&image.includes('media.d3.nhle.com/image/private/')) image=image.replace(/t_ratio16_9-size50/g,'t_ratio16_9-size40');
  const imageUrl=new URL(image,source);
  if(imageUrl.protocol!=='https:')return new Response('Invalid thumbnail',{status:404});
  return Response.redirect(imageUrl.toString(),302);
 }catch{return new Response('Thumbnail unavailable',{status:404})}
}