import Image from "next/image";

type Card = {
	title: string;
	tags: { title: string; id: string }[];
	imageUrl: string;
};

export default function Card(props: Card) {
	return (
		<div className="@container w-full flex flex-col gap-y-2">
			<Image
				className="border border-slate-100"
				src={
					props.imageUrl
						? props.imageUrl
						: "https://bregnballe-portfolio.s3.eu-central-1.amazonaws.com/istockphoto-1147544807-612x612.jpg"
				}
				alt={props.title ? props.title : "fallbackImage"}
				width="400"
				height="400"
			/>
			<div className="flex flex-col gap-y-2">
				<h2 className="font-regular text-xl/6 @xs:text-2xl/7">{props.title}</h2>
				<div className="flex flex-row flex-wrap gap-x-2">
					{props.tags.map((tag) => {
						console.log("this is the tag", tag);
						return (
							<span
								key={tag?.id}
								className="inline-block uppercase text-sm font-light text-gray-700"
							>
								{tag?.title}
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
}
