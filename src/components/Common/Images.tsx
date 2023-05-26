import Image from 'next/image';
import React, { useState } from 'react';
import LinkWrapper from './LinkWrapper';
import JazzIcon from './JazzIcon';

const Images = ({
    src,
    height,
    width,
    borderRadius,
    alt,
    jazziconId = '0x0000000000000000000000000000000000000000',
    className,
    isNavigate = false,
    ...props
}: {
    src: any;
    height: number;
    width: number;
    style?: any;
    alt: string;
    borderRadius?: string;
    jazziconId?: string;
    className?: string;
    isNavigate?: string | boolean;
}) => {
    const [imgError, setImgError] = useState<boolean>(false);

    return (
        <>
            {src && !imgError ? (
                <LinkWrapper isNavigate={isNavigate}>
                    <Image
                        src={src}
                        alt={alt}
                        style={{ borderRadius: borderRadius || '50%', height: height }}
                        width={width}
                        height={height}
                        onError={({ currentTarget }: any) => {
                            console.log({ currentTarget });
                            setImgError(true);
                            currentTarget.onerror = null; // prevents looping
                            // currentTarget.classList.add('broken-image');
                        }}
                        className={className}
                        {...props}
                    />
                </LinkWrapper>
            ) : (
                jazziconId && (
                    <JazzIcon
                        diameter={width > height ? height : width}
                        radius={borderRadius || '50%'}
                        seed={jazziconId}
                        isNavigate={isNavigate}
                    />
                )
            )}
        </>
    );
};

export default Images;
