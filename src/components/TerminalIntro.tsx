import { FC, useEffect, useRef, useState } from 'react';

interface Line { text: string; type: 'cmd' | 'out'; }

const SEQUENCE = [
  {
    cmd: 'whoami',
    output: ['giovanni-luna  —  software & network engineer'],
  },
  {
    cmd: 'tracert 8.8.8.8',
    output: [
      'Tracing route to dns.google [8.8.8.8]',
      ' 1   3 ms  fw-01.lab     [10.42.7.1]',
      ' 2  11 ms  core-sw.lab   [10.42.0.254]',
      ' 3  19 ms  isp-pe-lax01  [203.0.113.89]',
      ' 4  28 ms  dns.google    [8.8.8.8]',
      'Trace complete.',
    ],
  },
];

const TerminalIntro: FC = () => {
  const [lines,  setLines]  = useState<Line[]>([]);
  const [input,  setInput]  = useState('');
  const [done,   setDone]   = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const all: Line[] = [];
      for (const s of SEQUENCE) {
        all.push({ text: s.cmd, type: 'cmd' });
        s.output.forEach(o => all.push({ text: o, type: 'out' }));
      }
      setLines(all);
      setDone(true);
      return;
    }

    let stopped = false;
    const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    (async () => {
      await delay(800);
      let acc: Line[] = [];
      for (let s = 0; s < SEQUENCE.length; s++) {
        const step = SEQUENCE[s];
        for (let i = 0; i <= step.cmd.length; i++) {
          if (stopped) return;
          setInput(step.cmd.slice(0, i));
          await delay(65);
        }
        await delay(180);
        if (stopped) return;
        acc = [...acc, { text: step.cmd, type: 'cmd' }];
        setLines([...acc]);
        setInput('');
        for (const out of step.output) {
          await delay(110);
          if (stopped) return;
          acc = [...acc, { text: out, type: 'out' }];
          setLines([...acc]);
        }
        if (s < SEQUENCE.length - 1) await delay(520);
      }
      setDone(true);
    })();

    return () => { stopped = true; };
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, input]);

  return (
    <div className="terminal-intro" aria-label="Terminal demo">
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot--red"    />
        <span className="terminal-dot terminal-dot--yellow" />
        <span className="terminal-dot terminal-dot--green"  />
        <span className="terminal-title">bash — network-lab</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((ln, i) => (
          <div key={i} className={`terminal-line terminal-line--${ln.type}`}>
            {ln.type === 'cmd' && <span className="terminal-prompt">$ </span>}
            {ln.text}
          </div>
        ))}
        <div className="terminal-line terminal-line--cmd">
          <span className="terminal-prompt">$ </span>
          {!done && input}
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  );
};

export default TerminalIntro;
