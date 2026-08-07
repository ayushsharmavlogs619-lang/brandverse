interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
    from?: string;
    via?: string;
    to?: string;
}

export default function GradientText({
    children,
    className = '',
    as: Tag = 'span',
    from = 'from-blue-400',
    via = 'via-purple-400',
    to = 'to-pink-400',
}: GradientTextProps) {
    return (
        <Tag className={`text-transparent bg-clip-text bg-gradient-to-r ${from} ${via} ${to} ${className}`}>
            {children}
        </Tag>
    );
}
