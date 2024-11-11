export default function Post({ props }) {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.user && <span>{props.user.username}</span>}
      <p>{props.content}</p>
    </div>
  );
}
