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
	console.log("RichTextTest content:", content.type);

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
		case "block":
			switch (content.fields.blockType) {
				case "Gallery Image":
					return `<p>Gallery Image</p>`;
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
