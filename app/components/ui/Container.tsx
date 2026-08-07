interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: 'section' | 'div';
}

export default function Container({ children, className = '', as: Tag = 'section' }: ContainerProps) {
    return (
        <Tag className={`px-6 py-20 md:py-28 ${className}`}>
            <div className="max-w-6xl mx-auto">{children}</div>
        </Tag>
    );
}
