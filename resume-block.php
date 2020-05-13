<?php
/**
 * Plugin Name: Resume Block
 * Plugin URI: https://github.com/japtar10101/resume-block
 * Description: Allow creating a timeline-like visuals with Gutenberg blocks, making it useful for creating a resume page.
 * Version: 2020.1.2
 * Author: Taro Omiya
 * Author URI: https://taroomiya.com
 * Text Domain: resume-block
 * Domain Path: /languages
 * License: GPL v2
 * 
 * @package resume-block
 **/
defined( 'ABSPATH' ) || exit;

// Add the 3 resume blocks
include 'blocks/resume-timeline.php';
include 'blocks/resume-marker.php';
include 'blocks/resume-entry.php';

if ( ! function_exists( 'resume_block_enqueue_style' ) ) :
	/**
	 * Enqueue css styles.
	 */
	function resume_block_enqueue_style() {

		// Stylesheets go here.
		wp_enqueue_style( 'font-awesome', '//use.fontawesome.com/releases/v5.12.1/css/all.css', false, '5.12.1', 'all' );
		wp_enqueue_style( 'bulma', plugins_url( 'bulma/bulma.min.css', __FILE__ ), false, '0.8.0', 'all' );
		wp_enqueue_style( 'bulma-timeline', plugins_url( 'bulma/timeline/bulma-timeline.css', __FILE__ ), false, '2.3.2', 'all' );
	}
endif;
add_action( 'enqueue_block_assets', 'resume_block_enqueue_style' );
?>
