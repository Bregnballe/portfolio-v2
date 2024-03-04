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
		content?.children?.map((child: any, i: any) => (
			<RichTextTest content={child} key={i} />
		));

	switch (content.type) {
		case "root":
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
		case "heading":
			switch (content.tag) {
				case "h1":
					return <h1>{renderChildren()}</h1>;
				case "h2":
					return <h2>{renderChildren()}</h2>;
				case "h3":
					return <h3>{renderChildren()}</h3>;
				case "h4":
					return <h4>{renderChildren()}</h4>;
				case "h5":
					return <h5>{renderChildren()}</h5>;
				case "h6":
					return <h6>{renderChildren()}</h6>;
			}

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
				) : (
					<span>{content?.text}</span>
				);

			return (
				<>
					{textElement}
					{renderChildren()}
				</>
			);
	}
}
