//import { $generateHtmlFromNodes } from "@lexical/html";
import type { SerializedEditorState } from "lexical";
import {
	type SanitizedEditorConfig,
	convertLexicalToHTML,
	consolidateHTMLConverters,
	sanitizeEditorConfig,
	defaultEditorConfig,
	//getEnabledNodes,
} from "@payloadcms/richtext-lexical";

//import { BaseSelection } from ...
import Image from "next/image";
import RichText from "@/components/richText";

import serialize from "@/components/richText/serialize";
import { RichTextTest } from "@/components/richText/RichTextTest";

type Project = {
	id: string;
	title: string;
	tags: { title: string; id: string }[];
	image: {
		url: string;
	};
	description: SerializedEditorState;
};

export default async function Page({
	params,
}: {
	params: { project: string };
}) {
	console.log("params", params);

	async function lexicalToHTML(editorData: SerializedEditorState) {
		try {
			//console.log("editorData:", editorData);

			const sanitizedConfig = sanitizeEditorConfig(defaultEditorConfig);
			//console.log("sanitizedConfig:", sanitizedConfig);

			const converters = consolidateHTMLConverters({
				editorConfig: sanitizedConfig,
			});
			//console.log("converters:", converters);

			const result = await convertLexicalToHTML({
				converters: converters,
				data: editorData,
			});

			//console.log("result:", result);
			return result;
		} catch (error) {
			//console.error("Error in lexicalToHTML:", error);
		}
	}
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
	const htmlString = await lexicalToHTML(project.description);
	console.log("htmlString:", htmlString);

	const descriptionContent = project.description.root;
	console.log("descriptionContent:", descriptionContent);

	//const test = serialize(descriptionContent);
	//console.log("test:", test);

	return (
		<div className="flex justify-center w-screen">
			<div className="flex-col max-w-screen-sm">
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
				{/*htmlString ? (
					<RichText htmlString={htmlString} />
				) : (
					<div> Loading... </div>
				)*/}
				{descriptionContent ? (
					<RichTextTest content={descriptionContent} />
				) : (
					<div> Loading... </div>
				)}
			</div>
		</div>
	);
}
