'use client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Level = 'HS' | 'College' | 'Pro' | 'Creator';

export default function DemoOfferLock() {
  const [form, setForm] = useState({
    name: '',
    level: 'College' as Level,
    schoolOrPlatform: '',
    followers: '',
    brand: '',
    offerValue: '',
  });
  const [locked, setLocked] = useState<null | { id: string }>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function lockOffer(e: React.FormEvent) {
    e.preventDefault();
    const id = 'OL-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    setLocked({ id });
  }

  if (locked) {
    return (
      <div style={{ maxWidth: 720, margin: '2rem auto', padding: 16 }}>
        <h1 style={{ marginBottom: 8 }}>Offer Locked ✅</h1>
        <p style={{ marginBottom: 16 }}>
          Demo OfferLock ID: <strong>{locked.id}</strong>
        </p>
        <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Summary</h2>
          <ul>
            <li>Name: {form.name || '—'}</li>
            <li>Level: {form.level}</li>
            <li>School/Platform: {form.schoolOrPlatform || '—'}</li>
            <li>Followers: {form.followers || '—'}</li>
            <li>Brand: {form.brand || '—'}</li>
            <li>Offer Value: {form.offerValue ? `$${form.offerValue}` : '—'}</li>
          </ul>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <Link to="/demo/contract" style={{ padding: '8px 12px', border: '1px solid #333', borderRadius: 8 }}>
            Continue → Contract
          </Link>
          <Link to="/" style={{ padding: '8px 12px' }}>Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>OfferLock — Demo</h1>
      <p style={{ color: '#555', marginBottom: 16 }}>
        Quick, client-only mock to capture an NIL offer. No backend required.
      </p>
      <form onSubmit={lockOffer} style={{ display: 'grid', gap: 12 }}>
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} placeholder="Jordan Lee" style={input} />
        </label>
        <label>
          Level
          <select name="level" value={form.level} onChange={onChange} style={input}>
            <option>HS</option>
            <option>College</option>
            <option>Pro</option>
            <option>Creator</option>
          </select>
        </label>
        <label>
          School / Platform
          <input name="schoolOrPlatform" value={form.schoolOrPlatform} onChange={onChange} placeholder="UF Gators / TikTok" style={input} />
        </label>
        <label>
          Followers
          <input name="followers" value={form.followers} onChange={onChange} inputMode="numeric" placeholder="120000" style={input} />
        </label>
        <label>
          Brand (proposed)
          <input name="brand" value={form.brand} onChange={onChange} placeholder="Gatorade" style={input} />
        </label>
        <label>
          Offer Value (USD)
          <input name="offerValue" value={form.offerValue} onChange={onChange} inputMode="numeric" placeholder="25000" style={input} />
        </label>
        <button type="submit" style={btnPrimary}>Lock Offer</button>
      </form>
      <div style={{ marginTop: 16 }}>
        <Link to="/" style={{ padding: '8px 12px' }}>Back Home</Link>
      </div>
    </div>
  );
}

const input: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginTop: 6,
  padding: '10px 12px',
  border: '1px solid #ccc',
  borderRadius: 8,
};

const btnPrimary: React.CSSProperties = {
  padding: '10px 14px',
  border: '1px solid #111',
  background: '#111',
  color: 'white',
  borderRadius: 10,
  cursor: 'pointer',
};
