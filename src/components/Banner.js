export default function Banner(props) {
  let className = `banner ${props.secondaryClass}`;

  return (
    <div className={className}>
      {props.content}
    </div>
  );
}