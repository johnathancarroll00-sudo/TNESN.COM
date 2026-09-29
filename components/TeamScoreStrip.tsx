import React from 'react';
import { Radio } from 'lucide-react';
import { getScores, type ScoreItem } from '../endpoints/scores_GET.schema';
import styles from './TeamScoreStrip.module.css';

export default function TeamScoreStrip({league}:{league:'NHL'|'NBA'|'MLB'}){
  const [score,setScore]=React.useState<ScoreItem|null>(null);
  React.useEffect(()=>{getScores().then(r=>setScore(r.scores.find(s=>s.league===league)??null)).catch(()=>setScore(null))},[league]);
  return <div className={styles.strip}><div className={styles.label}><Radio size={14}/> TNESN SCOREBOARD</div>{score?<a className={styles.game} href={score.gameUrl||'#'} target={score.gameUrl?'_blank':undefined} rel={score.gameUrl?'noreferrer':undefined}><span className={styles.status}>{score.status}</span><img src={score.awayLogo} alt=""/><b>{score.away}</b><strong>{score.awayScore}<i>–</i>{score.homeScore}</strong><b>{score.home}</b><img src={score.homeLogo} alt=""/><small>{score.gameDate.slice(0,10)} • OPEN GAME</small></a>:<span className={styles.loading}>LIVE OR NEXT GAME</span>}</div>
}