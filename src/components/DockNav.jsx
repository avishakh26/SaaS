import { useMemo } from 'react';
import Dock from './Dock.jsx';
import Icon from './Icon.jsx';
import { useModal } from './Modal.jsx';

const goTo = (hash) => {
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', hash);
};

/** macOS-style dock holding the primary navigation, centred in the top bar (desktop). */
export default function DockNav() {
  const openModal = useModal();

  const items = useMemo(() => [
    { label: 'Features', icon: <Icon name="bolt" size={18} />, onClick: () => goTo('#features') },
    { label: 'Solutions', icon: <Icon name="chart" size={18} />, onClick: () => goTo('#solutions') },
    { label: 'Pricing', icon: <Icon name="tag" size={18} />, onClick: () => goTo('#pricing') },
    { label: 'Resources', icon: <Icon name="doc" size={18} />, onClick: () => goTo('#resources') },
    { label: 'Login', icon: <Icon name="login" size={18} />, onClick: () => openModal('login') },
  ], [openModal]);

  return (
    <div className="dock-nav">
      <Dock
        items={items}
        className="dock-nav__panel"
        panelHeight={52}
        baseItemSize={40}
        magnification={58}
        distance={120}
        dockHeight={80}
      />
    </div>
  );
}
