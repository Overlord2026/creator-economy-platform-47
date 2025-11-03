import { motion } from 'framer-motion';
import { Users, FileCheck, Clock, TrendingUp } from 'lucide-react';

const metrics = [
  { icon: Users, label: 'Active Creators', value: '120+' },
  { icon: FileCheck, label: 'Deals Closed', value: '340' },
  { icon: Clock, label: 'Avg E-Sign Time', value: '4.2 min' },
  { icon: TrendingUp, label: 'On-Time Rate', value: '98%' }
];

export default function SocialProofMetrics() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4"
    >
      {metrics.map((m, i) => (
        <motion.div 
          key={i} 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <m.icon className="mx-auto mb-2 h-6 w-6 text-[var(--gold)]" />
          <div className="text-2xl font-bold text-white">{m.value}</div>
          <div className="text-xs text-white/70">{m.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
