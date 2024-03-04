import React from "react";
import Card from "../components/Card";
import Link from "next/link";

type Project = {
	id: string;
	title: string;
	slug: string;
	tags: { title: string; id: string }[];
	image: {
		url: string;
	};
};

async function getProjects() {
	const res = await fetch("http://localhost:3000/api/projects/", {
		cache: "no-store", // for testing purposes
		//cache: "force-cache", // for production
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export default async function Page() {
	const data = await getProjects();
	const projects: Project[] = data.docs;

	return (
		<div className="flex justify-center	w-screen mx-2">
			{projects.length === 0 ? (
				<div> Loading... </div>
			) : (
				<div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl m-4">
					{projects.map((project: Project) => (
						<Link href={`/${project.slug}`} key={project.id}>
							<Card
								title={project.title}
								tags={project.tags}
								imageUrl={project.image?.url}
							/>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

//List of projects
