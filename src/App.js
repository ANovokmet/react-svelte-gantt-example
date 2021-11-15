import './App.css';
import { time, generate } from './large';
import React, { useState } from 'react';

import { SvelteGanttReact } from './SvelteGanttReact';
import { SvelteGanttTable } from 'svelte-gantt';

const currentStart = time('06:00');
const currentEnd = time('18:00');

const { rows, tasks } = generate();
const options = {
  rows,
  tasks,
  timeRanges: [],
  headers: [{ unit: 'day', format: 'MMMM Do' }, { unit: 'hour', format: 'H:mm' }],
  fitWidth: true,
  from: currentStart,
  to: currentEnd,
  tableHeaders: [{ title: 'Label', property: 'label', width: 140, type: 'tree' }],
  tableWidth: 240,
  ganttTableModules: [SvelteGanttTable],
  ganttBodyModules: []
}

function App() {
  const [opts, setOptions] = useState(options);

  function regenerate() {
    const { rows, tasks } = generate();
    options.rows = rows;
    options.tasks = tasks;
    setOptions({...options});
  }

  return (
    <div>
      <header>
        <button onClick={regenerate}>Regenerate</button>
      </header>
      <div className="App" style={{height: '500px'}}>
        <SvelteGanttReact {...opts} />
      </div>
    </div>
  );
}

export default App;
