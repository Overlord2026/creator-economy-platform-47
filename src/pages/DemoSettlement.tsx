'use client';
import React from 'react'; import { Link } from 'react-router-dom';
export default function DemoSettlement(){
  const id='RCPT-'+Math.random().toString(36).slice(2,10).toUpperCase();
  return (<div style={{maxWidth:720,margin:'2rem auto',padding:16}}>
    <h1 style={{marginBottom:8}}>Settlement — Demo</h1>
    <p style={{color:'#555',marginBottom:16}}>Funds released. Receipt anchored (demo): <strong>{id}</strong></p>
    <div style={{display:'flex',gap:12}}>
      <Link to="/demo/offerlock" style={{padding:'8px 12px',border:'1px solid #333',borderRadius:8}}>Start Over</Link>
      <Link to="/" style={{padding:'8px 12px'}}>Back Home</Link>
    </div>
  </div>);
}
