type RichText = {
	htmlString: string;
};

export default function RichText(props: RichText) {
	const htmlString = { __html: props.htmlString };

	return props.htmlString ? (
		<div className="text-lg grid gap-4" dangerouslySetInnerHTML={htmlString} />
	) : (
		"No content"
	);
}
