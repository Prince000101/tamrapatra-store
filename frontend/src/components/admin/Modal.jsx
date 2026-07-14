const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-plum-light rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-indigo dark:text-ivory">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-ivory/60 dark:hover:text-ivory p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-indigo-light/20 transition">
            ✖
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
