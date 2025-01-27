import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: string;
    variant?: 'solid' | 'outline';
    rounded?: 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-full';
}

const Button: React.FC<ButtonProps> = ({ children, color = 'bg-foreground', variant = 'solid', rounded = 'rounded-full', ...props }) => {

    const baseClasses = `transition-colors flex items-center justify-center text-sm sm:text-base h-8 sm:h-10 px-4 sm:px-5 ${rounded}`;
    const variantClasses = variant === 'solid' ? `${color} text-background` : `border border-solid border-${color} text-${color}`;
    const hoverClasses = 'hover:bg-[#383838] dark:hover:bg-[#ccc]';

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${hoverClasses}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
