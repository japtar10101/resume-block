<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package resume-block
 */
defined( 'ABSPATH' ) || exit;
if ( ! function_exists( 'resume_marker_block_init' ) ) :
	/**
	 * Registers all block assets so that they can be enqueued through Gutenberg in
	 * the corresponding context.
	 *
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
	 */
	function resume_marker_block_init() {
		// Skip block registration if Gutenberg is not enabled/merged.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		$dir = dirname( __FILE__ );

		$index_js = 'resume-marker/index.js';
		wp_register_script(
			'resume-marker-block-editor',
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

		$editor_css = 'resume-marker/editor.css';
		wp_register_style(
			'resume-marker-block-editor',
			plugins_url( $editor_css, __FILE__ ),
			array(),
			filemtime( "$dir/$editor_css" )
		);

		register_block_type( 'resume-block/resume-marker', array(
			'editor_script' => 'resume-marker-block-editor',
			'editor_style'  => 'resume-marker-block-editor',
		) );
	}
endif;
add_action( 'init', 'resume_marker_block_init' );
