( function( blocks, editor, i18n, element, blockEditor ) {
		/**
	 * Registers a new block provided a unique name and an object defining its behavior.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/#registering-a-block
	 */
	var registerBlockType = blocks.registerBlockType;
	/**
	 * Returns a new element of given type. Element is an abstraction layer atop React.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/packages/packages-element/
	 */
	var el = element.createElement;
	/**
	 * Retrieves the translation of text.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/packages/packages-i18n/
	 */
	var __ = i18n.__;
	/**
	 * Retrieves the rich-text editor.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/packages/packages-editor/
	 */
	var RichText = editor.RichText;
	/**
	 * Retrieves Inner block. Setup to only allow paragraphs (for the time being)
	 */
	var InnerBlocks = blockEditor.InnerBlocks;

	/**
	 * Every block starts by registering a new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/#registering-a-block
	 */
	registerBlockType( 'resume-block/resume-entry', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Entry', 'resume-block' ),
		description: __( 'An entry in the timeline, to list a professional experience. Can contain other blocks.', 'resume-block' ),
		//icon: 'tag',

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'layout',

		/**
		 * Only allow this block when it is nested in a Resume Timeline block.
		 */
		parent: [ 'resume-block/resume-timeline' ],

		/**
		 * Attributes
		 */
		attributes: {
			content: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
		},
		/**
		 * Example string
		 */
		example: {
			attributes: {
				content: [ __( 'Month Year', 'resume-block' ) ],
			},
		},

		/**
		 * Optional block extended support features.
		 */
		supports: {
			// Removes support for an HTML mode.
			html: false
		},

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return {Element}       Element to render.
		 */
		edit: function( props ) {
			// return el(
			// 	'p',
			// 	{ className: props.className },
			// 	__( 'Hello from the editor!', 'resume-block' )
			// );
			var content = props.attributes.content;
			function onChangeContent( newContent ) {
				props.setAttributes( { content: newContent } );
			}

			return el(
				'div',
				{ className: props.className },
				el(
					'div',
					{ className: 'timeline-marker' }
				), el(
					'div',
					{ className: 'timeline-content' },
					el(
						RichText,
						{
							tagName: 'p',
							className: 'heading',
							onChange: onChangeContent,
							value: content,
						}
					), el(
						InnerBlocks
					)
				)
			);
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#save
		 *
		 * @return {Element}       Element to render.
		 */
		save: function() {
			// return el(
			// 	'p',
			// 	{},
			// 	__( 'Hello from the saved content!', 'resume-block' )
			// );
			return el(
				'div',
				{ },
				el(
					'div',
					{ className: 'timeline-marker' }
				), el(
					'div',
					{ className: 'timeline-content' },
					el(
						RichText.Content,
						{
							tagName: 'p',
							className: 'heading',
							value: props.attributes.content
						}
					), el(
						InnerBlocks.Content
					)
				)
			);
		}
	} );
} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.blockEditor,
);
