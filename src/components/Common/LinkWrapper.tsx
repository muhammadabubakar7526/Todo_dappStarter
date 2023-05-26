import Link from 'next/link';
interface LinkWrapperProps {
    isNavigate?: string | boolean;
    children: React.ReactNode;
}
const LinkWrapper = ({ children, isNavigate }: LinkWrapperProps) =>
    !isNavigate ? (
        <>{children}</>
    ) : (
        <Link
            href={
                isNavigate ? typeof isNavigate === 'string' && isNavigate : '/'
            }
        >
            {children}
        </Link >
    );
export default LinkWrapper;
