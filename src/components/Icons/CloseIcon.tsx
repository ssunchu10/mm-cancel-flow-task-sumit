interface CloseIconProps {
    width?: number;
    height?: number;
    className?: string;
}

export default function CloseIcon({ width = 18, height = 18, className = "" }: CloseIconProps) {
    return (
        <svg 
            width={width} 
            height={height} 
            viewBox="0 0 24 24" 
            className={className}
        >
            <path 
                d="M6 6l12 12M18 6L6 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
            />
        </svg>
    );
}
