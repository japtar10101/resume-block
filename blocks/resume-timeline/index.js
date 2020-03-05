( function( blocks, element, blockEditor, i18n ) {
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
	 * Retrieves Inner block. Setup to only allow paragraphs (for the time being)
	 */
	var InnerBlocks = blockEditor.InnerBlocks;
	/**
	 * Constants
	 */
	// Define the blocks that are allowed
	const ALLOWED_BLOCKS = [ 'resume-block/resume-entry', 'resume-block/resume-image' ];
	
	/**
	 * Every block starts by registering a new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/#registering-a-block
	 */
	registerBlockType( 'resume-block/resume-timeline', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Rèsumè Timeline', 'resume-block' ),
		description: __( 'A timeline displaying a history of professional experiences.', 'resume-block' ),
		icon: 'excerpt-view',
		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'layout',
		
		// Register block styles.
		styles: [
			// Mark style as default.
			{
					name: 'default',
					label: __( 'Left-to-Right', 'resume-block' ),
					isDefault: true
			},
			{
					name: 'centered',
					label: __( 'Centered, Alternating', 'resume-block' )
			},
			{
					name: 'rtl',
					label: __( 'Right-to-Left', 'resume-block' )
			},
		],

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
			// Create element
			return el(
				'div',
				{ className: props.className },
				el(
					InnerBlocks,
					{ allowedBlocks: ALLOWED_BLOCKS },
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
		save: function( props ) {
			// Create element
			return el(
				'div',
				{ className: props.className },
				el( InnerBlocks.Content )
			);
		}
	} );
} ) (
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor,
	window.wp.i18n,
);
