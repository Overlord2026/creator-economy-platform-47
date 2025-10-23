<<<<<<< HEAD
'use client';
import React from 'react';
import { Link } from 'react-router-dom';

export default function DemoContract() {
  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>Contract — Demo</h1>
      <p style={{ color: '#555' }}>Placeholder. In prod we would render terms and collect e-sign.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <Link to="/demo/settlement" style={{ padding: '8px 12px', border: '1px solid #333', borderRadius: 8 }}>
          Continue → Settlement
        </Link>
        <Link to="/" style={{ padding: '8px 12px' }}>Back Home</Link>
      </div>
    </div>
  );
=======
import React from 'react'; import { Link } from 'react-router-dom';
export default function DemoContract(){
  return (<div style={{maxWidth:720,margin:'2rem auto',padding:16}}>
    <h1 style={{marginBottom:8}}>Contract — Demo</h1>
    <p style={{color:'#555'}}>Placeholder. In prod we would render terms and collect e-sign.</p>
    <div style={{display:'flex',gap:12,marginTop:16}}>
      <Link to="/demo/settlement" style={{padding:'8px 12px',border:'1px solid #333',borderRadius:8}}>Continue → Settlement</Link>
      <Link to="/" style={{padding:'8px 12px'}}>Back Home</Link>
    </div>
  </div>);
>>>>>>> demo/offerlock-202509261311
}
