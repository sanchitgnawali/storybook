import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';

const commandStyle = theme => ({
  backgroundColor: theme.palette.secondaryBorder,
  color: theme.palette.text,
  padding: '2px 7px',
  borderRadius: 2,
  lineHeight: '36px',
  marginRight: '9px',
});

const h4Style = {
  marginTop: 0,
  textAlign: 'center',
};

const modalStyles = theme => ({
  content: {
    left: '50%',
    bottom: 'initial',
    right: 'initial',
    width: 440,
    marginLeft: -220,
    border: 'none',
    overflow: 'visible',
    fontFamily: 'sans-serif',
    fontSize: 14,
    backgroundColor: theme.palette.secondaryBackground,
    color: theme.palette.secondaryText,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.74902)',
  },
});

// manage two separate shortcut keys for
// 'mac' & other (windows, linux) platforms
export function getShortcuts(platform) {
  // if it is mac platform
  if (platform && platform.indexOf('mac') !== -1) {
    return [
      { name: 'Toggle Search Box', keys: ['⌘ ⇧ P', '⌃ ⇧ P'] },
      { name: 'Toggle Action Logger position', keys: ['⌘ ⇧ J', '⌃ ⇧ J'] },
      { name: 'Toggle Fullscreen Mode', keys: ['⌘ ⇧ F', '⌃ ⇧ F'] },
      { name: 'Toggle Left Panel', keys: ['⌘ ⇧ L', '⌃ ⇧ L'] },
      { name: 'Toggle Down Panel', keys: ['⌘ ⇧ D', '⌃ ⇧ D'] },
      { name: 'Next Story', keys: ['⌘ ⇧ →', '⌃ ⇧ →'] },
      { name: 'Previous Story', keys: ['⌘ ⇧ ←', '⌃ ⇧ ←'] },
    ];
  }

  return [
    { name: 'Toggle Search Box', keys: ['Ctrl + Shift + P'] },
    { name: 'Toggle Action Logger position', keys: ['Ctrl + Shift + J'] },
    { name: 'Toggle Fullscreen Mode', keys: ['Ctrl + Shift + F'] },
    { name: 'Toggle Left Panel', keys: ['Ctrl + Shift + L'] },
    { name: 'Toggle Down Panel', keys: ['Ctrl + Shift + D'] },
    { name: 'Next Story', keys: ['Ctrl + Shift + →'] },
    { name: 'Previous Story', keys: ['Ctrl + Shift + ←'] },
  ];
}

export const Keys = ({ shortcutKeys, theme }) => {
  // if we have only one key combination for a shortcut
  if (shortcutKeys.length === 1) {
    return <span><b style={commandStyle(theme)}>{shortcutKeys[0]}</b></span>;
  }

  // if we have multiple key combinations for a shortcut
  const keys = shortcutKeys.map((key, index, arr) =>
    <span key={key}>
      <b style={commandStyle(theme)}>{key}</b>
      {/* add / & space if it is not a last key combination */}
      {arr.length - 1 !== index ? <span>/ &nbsp;</span> : ''}
    </span>
  );

  return <span>{keys}</span>;
};

Keys.propTypes = {
  shortcutKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  theme: PropTypes.shape().isRequired,
};

export const Shortcuts = ({ appShortcuts, theme }) => {
  const shortcuts = appShortcuts.map(shortcut =>
    <div key={shortcut.name}>
      <Keys shortcutKeys={shortcut.keys} theme={theme} />
      {shortcut.name}
    </div>
  );

  return (
    <div>
      <h4 style={h4Style}>Keyboard Shortcuts</h4>
      {shortcuts}
    </div>
  );
};

Shortcuts.propTypes = {
  appShortcuts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      keys: PropTypes.array,
    })
  ).isRequired,
  theme: PropTypes.shape().isRequired,
};

export const ShortcutsHelp = ({ isOpen, onClose, platform, theme }) =>
  <ReactModal isOpen={isOpen} onRequestClose={onClose} style={modalStyles(theme)} contentLabel="Shortcuts">
    <Shortcuts appShortcuts={getShortcuts(platform)} theme={theme}/>
  </ReactModal>;

ShortcutsHelp.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  platform: PropTypes.string.isRequired,
  theme: PropTypes.shape().isRequired,
};
ShortcutsHelp.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

export default ShortcutsHelp;