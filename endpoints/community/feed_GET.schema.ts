import superjson from 'superjson';
export type CommunityComment={id:string;body:string;displayName:string;avatarKey:string;likes:number;dislikes:number;createdAt:Date};
export type CommunityPost={id:string;title:string;body:string;displayName:string;avatarKey:string;likes:number;dislikes:number;comments:CommunityComment[];createdAt:Date};
export type OutputType={posts:CommunityPost[]};
export const getCommunityFeed=async():Promise<OutputType>=>{const r=await fetch('/_api/community/feed');if(!r.ok)throw new Error('Could not load community');return superjson.parse(await r.text())};