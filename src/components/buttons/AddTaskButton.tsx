import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddTaskButton(props: { onClick: () => void }) {
  return (
    <button type='button' className='cursor-pointer bg-indigo-950 rounded-full w-12 h-12'>
      <FontAwesomeIcon
        icon={faPlus}
        size='2x'
        style={{ color: '#e0e7ff' }}
        onClick={props.onClick}
      />
    </button>
  );
}
