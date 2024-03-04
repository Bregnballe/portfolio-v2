import GalleryImage from "../GalleryImage";
import escapeHTML from "escape-html";
import {
	IS_REGULAR,
	IS_BOLD,
	IS_ITALIC,
	IS_STRIKETHROUGH,
	IS_UNDERLINE,
	IS_CODE,
	IS_SUBSCRIPT,
	IS_SUPERSCRIPT,
} from "./richTextNodeFormat";
import type { SerializedLexicalNode } from "./types";

export function RichTextTest({ content }: any) {
	const renderChildren = () =>
		content?.children?.map(
			(child: any, i: any) => (
				console.log(child), (<RichTextTest content={child} key={i} />)
			)
		);

	switch (content.type) {
		case "root":
			return <div className="grid grid-cols-1 gap-4">{renderChildren()}</div>;
		case "paragraph":
			return <div>{renderChildren()}</div>;
		case "list":
			if (content.listType === "bullet") {
				return <ul className="list-disc mb-4 pl-8">{renderChildren()}</ul>;
			} else {
				return <ol className="list-decimal mb-4 pl-8">{renderChildren()}</ol>;
			}
		case "listitem":
			return <li>{renderChildren()}</li>;
		case "linebreak":
			return <br />;
		case "quote":
			return (
				<blockquote
					className="justify-self-center text-2xl italic font-semibold text-gray-900 max-w-xs my-16 border-l-4 pl-4 border-gray-200

				"
				>
					{renderChildren()}
				</blockquote>
			);
		case "heading":
			switch (content.tag) {
				case "h1":
					return <h1 className="text-4xl font-semibold">{renderChildren()}</h1>;
				case "h2":
					return <h2 className="text-3xl font-semibold">{renderChildren()}</h2>;
				case "h3":
					return <h3 className="text-2xl font-semibold">{renderChildren()}</h3>;
				case "h4":
					return <h4 className="text-xl font-semibold">{renderChildren()}</h4>;
				case "h5":
					return <h5 className="text-lg font-semibold">{renderChildren()}</h5>;
				case "h6":
					return (
						<h6 className="text-base font-semibold">{renderChildren()}</h6>
					);
			}
		case "link":
			return (
				<a
					className="text-blue-600 dark:text-blue-500 hover:underline"
					href={content?.fields.url}
					target={content?.fields.newTab ? "_blank" : "_self"}
					//referrerPolicy=
				>
					{renderChildren()}
				</a>
			);
		case "block":
			switch (content.fields.blockType) {
				case "Gallery Image":
					return (
						<GalleryImage
							primaryImagePosition={content.fields.primaryImagePosition}
							aspectRatio={content.fields.aspectRatio}
							primaryImage={content.fields.primaryImage}
							secondaryImage={content.fields.secondaryImage}
							tertiaryImage={content.fields.tertiaryImage}
						/>
					);
			}

		default:
			const textElement =
				content.format & IS_BOLD ? (
					<strong>{content?.text}</strong>
				) : content.format & IS_ITALIC ? (
					<em>{content?.text}</em>
				) : content.format & IS_UNDERLINE ? (
					<span className="underline">{content?.text}</span>
				) : content.format & IS_STRIKETHROUGH ? (
					<span class="line-through">{content?.text}</span>
				) : content.format & IS_CODE ? (
					<code>{content?.text}</code>
				) : content.format & IS_SUBSCRIPT ? (
					<sub>{content?.text}</sub>
				) : content.format & IS_SUPERSCRIPT ? (
					<sup>{content?.text}</sup>
				) : content.format & IS_REGULAR ? (
					<span>{content?.text}</span>
				) : (
					<>{content?.text}</>
				);

			return (
				<>
					{textElement}
					{renderChildren()}
				</>
			);
	}
}
