import { useState } from 'preact/hooks';

export default function openProfile () {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        className="btn"
        onClick={() => setShowModal(true)}
      >
        Open Modal
      </button>

      <dialog
        id="my_modal_2"
        className="modal"
        open={showModal}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click outside to close
          </p>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onSubmit={() => setShowModal(false)}
        >
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
}