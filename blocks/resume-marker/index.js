( function( blocks, editor, i18n, element ) {
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
	 * Every block starts by registering a new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/#registering-a-block
	 */
	registerBlockType( 'resume-block/resume-marker', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Rèsumè Marker', 'resume-block' ),
		icon: 'universal-access-alt',
		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'common',

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
				selector: 'span',
			},
		},
		/**
		 * Example string
		 */
		example: {
			attributes: {
				content: __( 'Marker', 'resume-block' ),
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
			var content = props.attributes.content;
			function onChangeContent( newContent ) {
				props.setAttributes( { content: newContent } );
			}

			return el(
				'header',
				{ className: props.className },
				el( RichText, {
					tagName: 'span',
					className: 'tag',
					onChange: onChangeContent,
					value: content,
				} )
			);
			return ;
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#save
		 *
		 * @return {Element}       Element to render.
		 */
		save: function( props ) {
			return el(
				'header',
				{},
				el( RichText.Content, {
					tagName: 'span',
					className: 'tag',
					value: props.attributes.content,
				} )
			);
		}
	} );
} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element
);
