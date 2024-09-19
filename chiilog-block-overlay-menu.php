<?php
/**
 * Plugin Name:       Chiilog Overlay Menu
 * Plugin URI:        mel_cha
 * Description:       Overlay menu block for block editor.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Chiaki Okamoto
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       chiilog-block-overlay-menu
 *
 * @package Chiilog
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function chiilog_block_overlay_menu_block_init(): void {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'chiilog_block_overlay_menu_block_init' );

/**
 * Adds a custom template part area for the overlay content.
 *
 * @param array $areas Existing array of template part areas.
 * @return array Modified array of template part areas including the new "Overlay Content" area.
 */
function chiilog_block_register_template_part_for_overlay_content( array $areas ): array {
	$areas[] = array(
		'area'        => 'overlay-content',
		'area_tag'    => 'div',
		'description' => __( 'The Overlay Content template defines the area that will be visible when the menu is expanded.', 'chiilog-block-overlay-menu' ),
		'icon'        => '',
		'label'       => __( 'Overlay Content', 'chiilog-block-overlay-menu' ),
	);

	return $areas;
}
add_filter( 'default_wp_template_part_areas', 'chiilog_block_register_template_part_for_overlay_content' );
