<?php
/**
 * Plugin Name: Resume Block
 * Plugin URI: https://github.com/japtar10101/resume-block
 * Description: Allow creating a timeline-like visuals with Gutenberg blocks, making it useful for creating a resume page.
 * Version: 1.0.0
 * Author: Taro Omiya
 * Author URI: https://taroomiya.com
 * License: GPL v2
 **/

/**
 * Enqueue css styles.
 */
function resume_block_styles_and_scripts() {
	// Stylesheets go here.
	wp_enqueue_style( 'font-awesome', '//use.fontawesome.com/releases/v5.12.1/css/all.css', false, '5.12.1', 'all' );
	wp_enqueue_style( 'bulma', plugins_url( 'bulma/bulma.min.css', __FILE__ ), false, '0.8.0', 'all' );
	wp_enqueue_style( 'bulma-timeline', plugins_url( 'bulma/timeline/bulma-timeline.min.css', __FILE__ ), false, '2.3.2', 'all' );

	// Javascripts go here
	wp_enqueue_script( 'bulma-timeline', plugins_url( 'resume-block.js', __FILE__ ) );
}
add_action( 'wp_enqueue_scripts', 'resume_block_styles_and_scripts' );

/**
 * FIXME: do something!
 */
?>
