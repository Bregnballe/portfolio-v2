import Image from "next/image";

type Project = {
	id: string;
	title: string;
	tags: { title: string; id: string }[];
	image: {
		url: string;
	};
};

export default async function Page({
	params,
}: {
	params: { project: string };
}) {
	console.log("params", params);

	async function getProject() {
		const res = await fetch(
			`http://localhost:3000/api/projects?where[slug][equals]=${params.project}`,
			{
				cache: "no-store", // for testing purposes
				//cache: "force-cache", // for production
			}
		);

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return res.json();
	}

	const data = await getProject();
	const project: Project = data.docs[0];

	return (
		<div className="flex justify-center	w-screen">
			{project ? (
				<Image
					className=""
					src={
						project.image?.url
							? project.image?.url
							: "https://bregnballe-portfolio.s3.eu-central-1.amazonaws.com/istockphoto-1147544807-612x612.jpg"
					}
					alt={project.title ? project.title : "fallbackImage"}
					width="800"
					height="800"
				/>
			) : (
				<div> Loading... </div>
			)}
		</div>
	);
}
