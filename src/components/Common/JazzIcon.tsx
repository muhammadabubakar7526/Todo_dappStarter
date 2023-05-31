import React, { useMemo } from 'react';
import LinkWrapper from './LinkWrapper';

interface JazzIconProps {
    seed: string | undefined;
    diameter: number;
    radius?: string;
    isNavigate?: string | boolean;
}

const JazzIcon = React.memo(({ seed = 'nothingFoundFromTheOtherside1234', diameter, radius = '50%', isNavigate = false }: JazzIconProps) => {
    const hashCode = (str: any) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };

    const hashCode1 = (str: any) => {
        let hash = 51;
        for (let i = 0; i < str.length; i++) {
            hash += str.charCodeAt(i);
        }
        return hash;
    };

    const color = useMemo(() => `hsl(${hashCode(seed) % 180}, 50%, 50%)`, [seed]);
    const color1 = useMemo(() => `hsl(${hashCode1(seed) % 180}, 50%, 50%)`, [seed]);

    return (
        <LinkWrapper isNavigate={isNavigate}>
            <div
                style={{
                    width: diameter,
                    height: diameter,
                    borderRadius: radius,
                    background: `linear-gradient(135deg, ${color} 0%, ${color1} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: diameter / 2,
                    color: '#555',
                }}
            />
        </LinkWrapper>
    );
});

export default JazzIcon;
