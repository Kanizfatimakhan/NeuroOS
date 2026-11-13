import React, { useEffect, useRef } from 'react';
import { Terminal as Xterm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import useOsStore from '../../store/osStore';

const Terminal = () => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);

  useEffect(() => {
    // Initialize xterm
    const isLight = document.documentElement.className.includes('light');
    const term = new Xterm({
      theme: {
        background: isLight ? '#f5f5f7' : '#050505',
        foreground: isLight ? '#1d1d1f' : '#ffffff',
        cursor: '#007aff',
        selectionBackground: 'rgba(0, 122, 255, 0.3)',
        black: isLight ? '#1d1d1f' : '#ffffff',
        red: '#ff3b30',
        green: '#34c759',
        yellow: '#ffcc00',
        blue: '#007aff',
        magenta: '#af52de',
        cyan: '#32ade6',
        white: isLight ? '#ffffff' : '#050505',
      },
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 13,
      cursorBlink: true,
      allowTransparency: true
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    if (terminalRef.current) {
      term.open(terminalRef.current);
      fitAddon.fit();
      
      term.writeln('\x1b[1;34mNeuroAgents Terminal v2.1.0\x1b[0m');
      term.writeln('Type "\x1b[32mhelp\x1b[0m" for available commands.');
      term.write('\r\n$ ');
    }

    let inputBuffer = '';

    term.onData((data) => {
      const code = data.charCodeAt(0);

      // Enter
      if (code === 13) {
        term.write('\r\n');
        handleCommand(inputBuffer.trim(), term);
        inputBuffer = '';
        term.write('$ ');
      }
      // Backspace
      else if (code === 127) {
        if (inputBuffer.length > 0) {
          inputBuffer = inputBuffer.slice(0, -1);
          term.write('\b \b');
        }
      }
      // Printable characters
      else if (code >= 32) {
        inputBuffer += data;
        term.write(data);
      }
    });

    // Resize observer to refit terminal when window resizes
    const resizeObserver = new ResizeObserver(() => {
      try {
        fitAddon.fit();
      } catch (e) {
        // Ignore fit errors when container is 0
      }
    });
    
    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      term.dispose();
    };
  }, []);

  const handleCommand = (rawCmd, term) => {
    if (!rawCmd) return;

    const parts = rawCmd.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const store = useOsStore.getState();

    switch (cmd) {
      case 'help':
        term.writeln('\x1b[1mAvailable commands:\x1b[0m');
        term.writeln('  \x1b[36mls\x1b[0m                 - List files in workspace');
        term.writeln('  \x1b[36mcat <file>\x1b[0m         - Display file content');
        term.writeln('  \x1b[36mtouch <file>\x1b[0m       - Create a new empty file');
        term.writeln('  \x1b[36mopen <app>\x1b[0m         - Open an application (coder, researcher, editor, files, settings)');
        term.writeln('  \x1b[36mtheme <name>\x1b[0m       - Switch theme (dark, vision-light, neon, cyberpunk)');
        term.writeln('  \x1b[36mwhoami\x1b[0m             - Show current user');
        term.writeln('  \x1b[36mdate\x1b[0m               - Display current date & time');
        term.writeln('  \x1b[36mecho <text>\x1b[0m        - Echo arguments to output');
        term.writeln('  \x1b[36mclear\x1b[0m              - Clear terminal display');
        break;

      case 'clear':
        term.clear();
        break;

      case 'ls':
      case 'dir': {
        const fileSystem = store.fileSystem || {};
        const entries = Object.keys(fileSystem).map(id => {
          const item = fileSystem[id];
          return item.type === 'folder' ? `\x1b[34m${item.name}/\x1b[0m` : `\x1b[32m${item.name}\x1b[0m`;
        });
        if (entries.length === 0) {
          term.writeln('(directory is empty)');
        } else {
          term.writeln(entries.join('   '));
        }
        break;
      }

      case 'cat': {
        if (!args[0]) {
          term.writeln('\x1b[31musage: cat <filename>\x1b[0m');
          break;
        }
        const fileId = args[0];
        const file = store.fileSystem[fileId] || Object.values(store.fileSystem).find(f => f.name === fileId);
        if (file && file.type === 'file') {
          term.writeln(file.content || '(empty file)');
        } else {
          term.writeln(`\x1b[31mcat: ${fileId}: No such file\x1b[0m`);
        }
        break;
      }

      case 'touch': {
        if (!args[0]) {
          term.writeln('\x1b[31musage: touch <filename>\x1b[0m');
          break;
        }
        const newFileName = args[0];
        store.updateFileContent(newFileName, '');
        term.writeln(`\x1b[32mCreated file: ${newFileName}\x1b[0m`);
        break;
      }

      case 'open': {
        if (!args[0]) {
          term.writeln('\x1b[31musage: open <coder|researcher|editor|files|settings|canvas|projects|assistant>\x1b[0m');
          break;
        }
        const target = args[0].toLowerCase();
        const map = {
          coder: 'coder-agent',
          researcher: 'research-agent',
          editor: 'code-editor',
          promptlab: 'code-editor',
          files: 'file-explorer',
          explorer: 'file-explorer',
          settings: 'settings',
          canvas: 'shared-canvas',
          projects: 'project-manager',
          assistant: 'ai-assistant',
          terminal: 'terminal'
        };
        const targetApp = map[target] || target;
        store.openWindow(targetApp);
        term.writeln(`\x1b[32mLaunched: ${targetApp}\x1b[0m`);
        break;
      }

      case 'theme': {
        if (!args[0]) {
          term.writeln(`Current theme: ${store.theme}`);
          term.writeln('Options: dark, vision-light, neon, cyberpunk');
          break;
        }
        const validThemes = ['dark', 'vision-light', 'neon', 'cyberpunk'];
        const chosen = args[0].toLowerCase();
        if (validThemes.includes(chosen)) {
          store.setTheme(chosen);
          term.writeln(`\x1b[32mTheme switched to ${chosen}\x1b[0m`);
        } else {
          term.writeln(`\x1b[31mInvalid theme. Choose from: ${validThemes.join(', ')}\x1b[0m`);
        }
        break;
      }

      case 'whoami': {
        const user = store.user;
        term.writeln(user?.name ? `${user.name} <${user.email || 'user@neuroagents.ai'}>` : 'demo-developer (Guest)');
        break;
      }

      case 'date':
        term.writeln(new Date().toString());
        break;

      case 'echo':
        term.writeln(args.join(' '));
        break;

      default:
        term.writeln(`\x1b[31mCommand not found: ${cmd}. Type "help" for a list of commands.\x1b[0m`);
    }
  };

  return (
    <div className="h-full w-full bg-transparent p-2 text-text-main">
      <div ref={terminalRef} className="w-full h-full" />
    </div>
  );
};

export default Terminal;
