'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}

export const AnimatedCard = ({ children, className, delay = 0 }: Props) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.4,
				delay,
				ease: [0.25, 0.1, 0.25, 1],
			}}
			className={cn(className)}
		>
			{children}
		</motion.div>
	);
};
