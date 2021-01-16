export default function useVisualMode(initial) {

  const [mode, setMode] = React.useState(initial);

  const transition = (mode) => setMode(mode);

  return { mode, transition };
}