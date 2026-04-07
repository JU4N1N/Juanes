const Card = ({ title, subtitle, children, footer, status }) => {

  const statusStyles = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    default: "bg-gray-100 text-gray-700"
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition w-full">

      {/* Header */}
      {(title || status) && (
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-900">{title}</h2>

          {status && (
            <span className={`text-xs px-3 py-1 rounded-full ${statusStyles[status] || statusStyles.default}`}>
              {status}
            </span>
          )}
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm text-gray-500 mb-3">{subtitle}</p>
      )}

      {/* Content */}
      <div className="text-gray-700">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-4">
          {footer}
        </div>
      )}

    </div>
  );
};

export default Card;