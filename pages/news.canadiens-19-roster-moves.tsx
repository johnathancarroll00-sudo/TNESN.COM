import React from 'react';
import {ArrowLeft,ExternalLink,ShieldCheck} from 'lucide-react';
import styles from './news.canadiens-19-roster-moves.module.css';

export default function RosterMovesArticle(){
 return <main className={styles.page}>
  <header><a href="/canadiens"><ArrowLeft/> CANADIENS</a><b>TNESN</b><a href="/">HOME</a></header>
  <article>
   <div className={styles.kicker}>MONTREAL CANADIENS • ROSTER MOVES</div>
   <h1>CANADIENS MAKE 19 ROSTER MOVES AS OPENING NIGHT APPROACHES</h1>
   <div className={styles.byline}>TRUE NORTH EAST SPORTS NETWORK (TNESN) • SEPTEMBER 27, 2026</div>
   <p className={styles.lead}>The Montreal Canadiens have made a major round of roster moves following the conclusion of their preseason schedule, bringing the club significantly closer to its opening-night lineup.</p>
   <p>Montreal officially announced that <strong>10 players have been assigned directly to the Laval Rocket</strong>, while another <strong>nine players were placed on waivers for the purpose of being loaned to the Canadiens' AHL affiliate.</strong></p>
   <h2>10 PLAYERS ASSIGNED TO LAVAL</h2>
   <p>Owen Beck • Dillan Bentley • Laurent Dauphin • Jared Davidson • Jacob Fowler • Filip Mesar • Luke Mittelstadt • Owen Protz • David Reinbacher • Tyler Thorpe</p>
   <p>The group includes several notable young Canadiens prospects, particularly <strong>Owen Beck, Jacob Fowler and David Reinbacher.</strong></p>
   <h2>9 PLAYERS PLACED ON WAIVERS</h2>
   <p>Alex Belzile • Brett Berard • Kaapo Kahkonen • Hunter McKown • Sasha Pastujov • Samuel Poulin • Ethan Samson • Maksymilian Szuber • Reilly Walsh</p>
   <p>These players were placed on waivers for the purpose of being loaned to Laval.</p>
   <h2>WHAT IT MEANS FOR MONTREAL</h2>
   <p>These moves significantly reduce Montreal's training-camp roster and provide a much clearer picture of the group being prepared for the beginning of the <strong>2026–27 NHL regular season.</strong></p>
   <p>The assignments of <strong>Jacob Fowler and David Reinbacher</strong> are particularly notable. Both remain important pieces of Montreal's future, and playing significant minutes in Laval could provide valuable development opportunities while keeping them available for potential NHL recalls during the season.</p>
   <p>Their assignments shouldn't be interpreted as the end of their NHL opportunities this year. For young players, opening night is only one checkpoint in a long season.</p>
   <h2>OPENING NIGHT IS NEXT</h2>
   <p>The preseason evaluations are essentially complete. The Canadiens now turn their attention toward their <strong>September 29 regular-season opener against the Toronto Maple Leafs in Toronto.</strong></p>
   <p>After weeks of prospects fighting for jobs, lineup experiments and roster decisions, Montreal's opening-night picture is becoming much clearer. There could still be additional roster business before the puck drops, but the <strong>2026–27 Montreal Canadiens are almost set.</strong></p>
   <div className={styles.source}><ShieldCheck/><div><b>OFFICIAL SOURCE</b><span>Montreal Canadiens / NHL roster announcement</span></div><a href="https://www.nhl.com/canadiens/news/topic/personnel-moves/canadiens-make-roster-moves-following-preseason-finale-sept-27" target="_blank" rel="noreferrer">VIEW SOURCE <ExternalLink/></a></div>
   <footer><b>TRUE NORTH EAST SPORTS NETWORK — TNESN</b><span>CANADIAN SPORTS. OUR TEAMS. OUR PASSION.</span></footer>
  </article>
 </main>
}