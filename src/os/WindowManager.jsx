import React from 'react';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import useOsStore from '../store/osStore';
import Window from './Window';
import { AnimatePresence } from 'framer-motion';

const WindowManager = () => {
  const openWindows = useOsStore(state => state.openWindows);
  const updateWindowPosition = useOsStore(state => state.updateWindowPosition);
  const focusWindow = useOsStore(state => state.focusWindow);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    focusWindow(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const window = openWindows.find(w => w.id === active.id);
    if (window && !window.maximized) {
      updateWindowPosition(window.id, {
        x: window.position.x + delta.x,
        y: window.position.y + delta.y
      });
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence>
          {openWindows.map(win => (
            !win.minimized && (
              <Window key={win.id} windowData={win} />
            )
          ))}
        </AnimatePresence>
      </div>
    </DndContext>
  );
};

export default WindowManager;
