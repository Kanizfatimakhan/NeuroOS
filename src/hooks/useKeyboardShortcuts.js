import { useHotkeys } from 'react-hotkeys-hook';
import useOsStore from '../store/osStore';

export const useKeyboardShortcuts = () => {
  const { openWindows, activeWindow, closeWindow, focusWindow, openWindow } = useOsStore();

  // ESC: Close active window
  useHotkeys('esc', () => {
    if (activeWindow) {
      closeWindow(activeWindow);
    }
  });

  // ALT+TAB: Switch between open windows

  // CTRL + T: Open Terminal
  useHotkeys('ctrl+t', (e) => {
    e.preventDefault();
    openWindow('terminal');
  }, { enableOnFormTags: true });
};
