export default function CloseModalButton(props: { onClick: () => void }) {
  return (
    <button
      type='button'
      className='bg-indigo-900/60 text-white px-4 py-2 rounded cursor-pointer'
      onClick={props.onClick}
    >
      Fechar
    </button>
  );
}
