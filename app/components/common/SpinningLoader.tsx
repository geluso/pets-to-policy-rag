export default function SpinningLoader({ size = 24, className }: { size?: number; className?: string }) {
    return (
        <div
            className={`overflow-hidden flex items-center justify-center ${className}`}
            style={{ height: `${size}px`, width: `${size}px` }}
        >
            <span
                className="animate-spin inline-block border-4 border-blue-500 rounded-full"
                style={{
                    height: `${size}px`,
                    width: `${size}px`,
                    borderTopColor: 'transparent',
                    borderStyle: 'solid',
                    boxSizing: 'border-box',
                    animation: 'spin 0.75s linear infinite',
                }}
            />
        </div>
    )
}
