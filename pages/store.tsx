import React from 'react';
import { ShoppingBag, ShieldCheck, Sparkles, Trophy, ExternalLink, Shirt, Coffee, Badge, Flame } from 'lucide-react';
import styles from './store.module.css';

const products=[
 {icon:<Shirt/>,tag:'TNESN ORIGINAL',name:'True North East Tee',price:'COMING SOON',copy:'Clean TNESN network branding built for game day.'},
 {icon:<Badge/>,tag:'TNESN ORIGINAL',name:'TNESN Broadcast Cap',price:'COMING SOON',copy:'A simple everyday cap with the network mark front and centre.'},
 {icon:<Coffee/>,tag:'HOCKEY HUMOUR',name:'Morning Skate Mug',price:'COMING SOON',copy:'For fans who need coffee before they can discuss the power play.'},
 {icon:<Flame/>,tag:'LIMITED DROP',name:'Rivalry Night Series',price:'MATCHUP DROPS',copy:'Original, team-neutral jokes inspired by big rivalry and playoff nights.'},
 {icon:<Sparkles/>,tag:'STICKER PACK',name:'North East Chaos Pack',price:'COMING SOON',copy:'TNESN sayings, hockey humour and broadcast-style stickers.'},
 {icon:<Trophy/>,tag:'PLAYOFF DROP',name:'Survive & Advance',price:'LIMITED RUN',copy:'Short-run designs released only when the postseason story earns one.'}
];

export default function Store(){
 return <main className={styles.page}>
  <header><a href="/">TNESN</a><nav><a href="/canadiens">CANADIENS</a><a href="/raptors">RAPTORS</a><a href="/blue-jays">BLUE JAYS</a><a className={styles.active} href="/store">STORE</a></nav></header>
  <section className={styles.hero}><div><small>TRUE NORTH EAST SPORTS NETWORK SHOP</small><h1>REP THE<br/>NORTH EAST.</h1><p>Affordable TNESN originals, hockey humour, limited playoff drops and a separate path to officially licensed team gear.</p><span><ShoppingBag/> TNESN SHOP • COLLECTION PREVIEW</span></div></section>
  <section className={styles.shopHead}><div><small>THE TNESN COLLECTION</small><h2>ORIGINAL GEAR. FAN-FIRST PRICES.</h2></div><p>Built around the network and the culture around the games—not copied team logos or league marks.</p></section>
  <section className={styles.products}>{products.map((x,i)=><article key={i}><div className={styles.productArt}>{x.icon}<b>TNESN</b></div><small>{x.tag}</small><h3>{x.name}</h3><p>{x.copy}</p><strong>{x.price}</strong><button disabled>COMING SOON</button></article>)}</section>
  <section className={styles.drop}><div><small>PLAYOFF + RIVALRY DROPS</small><h2>THE MATCHUP CHANGES.<br/>THE MERCH CHANGES WITH IT.</h2><p>When a major postseason or rivalry matchup becomes official, TNESN can launch a short-run original collection around the moment. Designs stay independent and avoid protected team/league branding.</p><a href="/coverage">WATCH THE COVERAGE →</a></div><Trophy/></section>
  <section className={styles.licensed}><ShieldCheck/><div><small>OFFICIALLY LICENSED MERCHANDISE</small><h2>Looking for Canadiens gear?</h2><p>Official NHL and Canadiens products stay completely separate from TNESN originals and are purchased through authorized league retail channels.</p></div><a href="https://shop.nhl.com/montreal-canadiens/o-1373+t-14596322+z-96359-2770809517" target="_blank" rel="noreferrer">OFFICIAL NHL SHOP <ExternalLink/></a></section>
  <section className={styles.notice}><b>INDEPENDENT MERCHANDISE</b><p>TNESN originals are independently produced and are not affiliated with, sponsored by or endorsed by the NHL, NBA, MLB or their clubs. League and team marks are not used on TNESN-original merchandise. Licensed merchandise is clearly separated and linked to authorized sellers.</p></section>
 </main>
}