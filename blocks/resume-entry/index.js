( function( blocks, element, blockEditor, i18n /*, plugins, editPost*/ ) {
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
	var RichText = blockEditor.RichText;
	/**
	 * Retrieves Inner block. Setup to only allow paragraphs (for the time being)
	 */
	var InnerBlocks = blockEditor.InnerBlocks;
	// var registerPlugin = plugins.registerPlugin;
	// var pluginSidebar = editPost.PluginSidebar;

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
		icon: 'format-aside',

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
			heading: {
				type: 'string',
				source: 'text',
				selector: 'p',
			},
			classMarker: {
				type: 'string',
				source: 'attribute',
				selector: 'div',
				attribute: 'class',
			},
			classContent: {
				type: 'string',
				source: 'attribute',
				selector: 'div',
				attribute: 'class',
			},
			classHeading: {
				type: 'string',
				source: 'attribute',
				selector: 'p',
				attribute: 'class',
			}
		},
		/**
		 * Example string
		 */
		example: {
			attributes: {
				heading: [ __( 'Month Year', 'resume-block' ) ],
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
			var heading = props.attributes.heading;
			function onChangeContent( newContent ) {
				props.setAttributes( { heading: newContent } );
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
							inline: true,
							className: 'heading',
							onChange: onChangeContent,
							value: heading,
							placeholder: __( 'Enter heading here', 'resume-block' )
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
		save: function( props ) {
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
							value: props.attributes.heading
						}
					), el(
						InnerBlocks.Content
					)
				)
			);
		}
	} );

	/**
	 * Edit sidebar.
	 * @see https://developer.wordpress.org/block-editor/tutorials/plugin-sidebar-0/
	 */
	// registerPlugin( 'resume-block/resume-marker', {
	// 	render: function() {
	// 		return el( PluginSidebar,
	// 			{
	// 				name: 'resume-block/resume-marker',
	// 				icon: 'tag',
	// 				title: __( 'Marker', 'resume-block' ),
	// 			},
	// 			'Marker'
	// 		);
	// 	},
	// } );
} )(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor,
	window.wp.i18n
);
