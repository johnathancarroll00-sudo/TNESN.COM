import React,{useState} from 'react';
import { PasswordLoginForm } from '../components/PasswordLoginForm';
import { PasswordRegisterForm } from '../components/PasswordRegisterForm';
import { Button } from '../components/Button';
import styles from './login.module.css';
export default function Login(){
 const [mode,setMode]=useState<'login'|'register'>('login');
 return <main className={styles.page}><section className={styles.card}><a className={styles.back} href="/">← TNESN HOME</a><div className={styles.logo}>TN</div><small>TRUE NORTH EAST SPORTS NETWORK</small><h1>{mode==='login'?'WELCOME BACK':'JOIN THE COMMUNITY'}</h1><p>Post, comment and react with fellow Canadiens, Raptors and Blue Jays fans.</p><div className={styles.switch}><Button onClick={()=>setMode('login')} variant={mode==='login'?'primary':'outline'}>LOG IN</Button><Button onClick={()=>setMode('register')} variant={mode==='register'?'primary':'outline'}>CREATE ACCOUNT</Button></div>{mode==='login'?<PasswordLoginForm/>:<PasswordRegisterForm/>}</section></main>
}