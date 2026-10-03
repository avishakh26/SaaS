import useInView from '../hooks/useInView.js';

/** Wrapper that fades/slides its element in once it enters the viewport. */
export default function Reveal({ as: Tag = 'div', className = '', delay, style, children, ...rest }) {
  const [ref, seen] = useInView();
  const s = delay ? { ...style, '--d': delay } : style;
  return (
    <Tag ref={ref} className={`reveal ${seen ? 'is-in' : ''} ${className}`.trim()} style={s} {...rest}>
      {children}
    </Tag>
  );
}
