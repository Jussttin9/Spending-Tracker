import { ReactNode } from "react";

type Variant = 'title' | 'body';

interface TypographyProps {
    variant: Variant,
    children: ReactNode,
    className?: string
}

function getVariant (variant: Variant) {
    switch (variant) {
        case 'title': 
            return 'text-5xl';
        case 'body':
            return 'text-3xl';
        default:
            return 'text-5xl';
    }
}

export default function Typography ({ variant, children, className }: TypographyProps) {
    return (
        <div className={`${getVariant(variant)} ${className || ''}`}>
            {children}
        </div>
    );
}