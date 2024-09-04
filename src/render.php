<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>

<?php
$menu_slug = esc_attr( $attributes['menuSlug'] ?? '');
$close_icon  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>';

// ラベルかスラッグが空なら何も表示しない
if ( ! $menu_slug ) {
	return null;
}
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="chiilog/chiilog-overlay-menu"
	data-wp-context='{ "isOpen": false }'
>
	<button
		data-wp-on--click="actions.toggleOverlay"
		data-wp-bind--aria-expanded="context.isOpen"
		class="wp-block-chiilog-chiilog-overlay-menu__menu-button"
	><?php echo $close_icon; ?></button>
	<div class="wp-block-chiilog-chiilog-overlay-menu__menu-container" data-wp-bind--hidden="!context.isOpen">
		<?php echo block_template_part( $menu_slug ); ?>
	</div>
</div>
