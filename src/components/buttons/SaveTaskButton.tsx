import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SubmitTaskButton(props: { isLoading?: boolean }) {
  return (
    <button
      type='submit'
      disabled={props.isLoading}
      className={`bg-indigo-500 text-white px-4 py-2 rounded cursor-pointer`}
    >
      {props.isLoading && (
        <FontAwesomeIcon
          icon={faCircleNotch}
          spin={props.isLoading}
          style={{ color: '#fff' }}
          className='mr-1'
        />
      )}
      Salvar
    </button>
  );
}
