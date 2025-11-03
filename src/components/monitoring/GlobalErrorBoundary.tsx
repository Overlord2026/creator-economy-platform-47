'use client';
import React from 'react';
type State={hasError:boolean};
export default class GlobalErrorBoundary extends React.Component<{children:React.ReactNode}, State>{
  state:State={hasError:false};
  static getDerivedStateFromError(){return {hasError:true};}
  componentDidCatch(){/* no-op */ }
  render(){ return this.state.hasError ? null : this.props.children; }
}
