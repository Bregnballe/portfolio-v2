import Image from "next/image";

type GalleryImage = {
	primaryImagePosition: string;
	aspectRatio: string;
	primaryImage: {
		url: string;
		alt: string;
	};
	secondaryImage: {
		url: string;
		alt: string;
	};
	tertiaryImage: {
		url: string;
		alt: string;
	};
};

export default function GalleryImage(props: GalleryImage) {
	return (
		<div
			className={`grid gap-2 grid-rows-2 grid-cols-2 w-full ${
				props.aspectRatio === "1/1" ? "aspect-[1/1]" : "aspect-[3/4]"
			}`}
		>
			<div
				className={`relative ${
					props.primaryImagePosition === "top"
						? "col-span-full row-start-1"
						: props.primaryImagePosition === "right"
						? "col-start-2 row-span-full"
						: props.primaryImagePosition === "bottom"
						? "col-span-full row-start-2"
						: "col-start-1 row-span-full"
				}`}
			>
				<Image
					src={props.primaryImage.url}
					alt={props.primaryImage.alt}
					fill={true}
				/>
			</div>
			<div className="relative">
				<Image
					src={props.secondaryImage.url}
					alt={props.secondaryImage.alt}
					fill={true}
				/>
			</div>
			<div className="relative">
				<Image
					src={props.tertiaryImage.url}
					alt={props.tertiaryImage.alt}
					fill={true}
				/>
			</div>
		</div>
	);
}
