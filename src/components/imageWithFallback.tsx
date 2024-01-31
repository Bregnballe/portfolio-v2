import React, { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";

type ImageWithFallbackProps = ImageProps & {
	fallbackImage: string;
};

export default function ImageWithFallback(props: ImageWithFallbackProps) {
	const { src, alt, fallbackImage, ...rest } = props;

	const [error, setError] = useState(null);

	useEffect(() => {
		setError(null);
	}, [src]);

	return (
		<Image
			alt={alt ? alt : "fallbackImage"}
			onError={setError}
			src={error ? fallbackImage : src}
			{...rest}
		/>
	);
}
