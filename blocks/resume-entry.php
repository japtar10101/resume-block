<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package resume-block
 */
defined( 'ABSPATH' ) || exit;
if ( ! function_exists( 'resume_entry_block_init' ) ) :
	/**
	 * Registers all block assets so that they can be enqueued through Gutenberg in
	 * the corresponding context.
	 *
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
	 */
	function resume_entry_block_init() {
		// Skip block registration if Gutenberg is not enabled/merged.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		$dir = dirname( __FILE__ );

		$index_js = 'resume-entry/index.js';
		wp_register_script(
			'resume-entry-block-editor',
			plugins_url( $index_js, __FILE__ ),
			array(
				'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-block-editor'
				// 'wp-plugins',
				// 'wp-edit-post'
			),
			filemtime( "$dir/$index_js" )
		);

		$editor_css = 'resume-entry/editor.css';
		wp_register_style(
			'resume-entry-block-editor',
			plugins_url( $editor_css, __FILE__ ),
			array(),
			filemtime( "$dir/$editor_css" )
		);

		register_block_type( 'resume-block/resume-entry', array(
			'editor_script' => 'resume-entry-block-editor',
			'editor_style'  => 'resume-entry-block-editor',
		) );
	}
endif;
add_action( 'init', 'resume_entry_block_init' );
