import * as React from "react";

// Utilitaire de fusion de classes CSS simplifié
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Alert components
export function Alert({ className = '', children, ...props }) {
  return (
    <div
      className={classNames(
        "rounded-lg border border-yellow-600 bg-yellow-500 bg-opacity-20 p-4 text-yellow-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}


export function AlertTitle({ className = '', children, ...props }) {
  return (
    <h4
      className={classNames(
        "text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function AlertDescription({ className = '', children, ...props }) {
  return (
    <p
      className={classNames(
        "mt-2 text-sm text-yellow-300",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// Card components
export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={classNames(
        "rounded-lg border border-gray-700 bg-gray-800 text-gray-100 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div
      className={classNames("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
// Textarea component
export function Textarea({ className = '', value, onChange, placeholder, rows = 4, ...props }) {
  return (
    <div className={classNames("space-y-2", className)}>
      <textarea
        className={classNames(
          "w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          className
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }) {
  return (
    <h3
      className={classNames(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div
      className={classNames("p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Dialog component
export const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative z-50 w-full max-w-lg p-4 mx-auto">
        <div className="relative rounded-lg bg-gray-800 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// Button component
export function Button({
  className = '',
  variant = 'default',
  size = 'default',
  children,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50";

  const variants = {
    default: "bg-gray-800 text-gray-100 hover:bg-gray-700",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-8"
  };

  return (
    <button
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Input component
export function Input({ className = '', ...props }) {
  return (
    <input
      className={classNames(
        "flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export default {
  Alert,
  AlertTitle,
  AlertDescription,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Dialog,
  Button,
  Input
};
