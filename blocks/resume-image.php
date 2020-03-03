<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package resume
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function resume_image_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'resume-image/index.js';
	wp_register_script(
		'resume-image-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'resume-image/editor.css';
	wp_register_style(
		'resume-image-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'resume-image/style.css';
	wp_register_style(
		'resume-image-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'resume/resume-image', array(
		'editor_script' => 'resume-image-block-editor',
		'editor_style'  => 'resume-image-block-editor',
		'style'         => 'resume-image-block',
	) );
}
add_action( 'init', 'resume_image_block_init' );
