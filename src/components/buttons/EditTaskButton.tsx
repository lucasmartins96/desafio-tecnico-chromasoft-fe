import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditTaskButton(props: { onClick: () => void }) {
  return (
    <button type='button' onClick={props.onClick}>
      <FontAwesomeIcon icon={faPen} size='lg' color='#4a6fbf' />
    </button>
  );
}
