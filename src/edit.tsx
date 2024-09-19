/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { ComboboxControl, Notice, PanelBody } from '@wordpress/components';
import { WpTemplatePart, useEntityRecords } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { createInterpolateElement } from '@wordpress/element';
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';

type BlockAttributes = {
	label: string;
	menuSlug: string | null;
};

export default function Edit( {
	attributes,
	setAttributes,
}: BlockEditProps< BlockAttributes > ) {
	const { menuSlug } = attributes;

	/**
	 * Get Template Part URL.
	 */
	const siteUrl = useSelect( ( select ) => {
		// @ts-ignore @types type is out of date
		return select( 'core' ).getSite()?.url;
	}, [] );
	const menuTemplateUrl = siteUrl
		? `${ siteUrl }/wp-admin/site-editor.php?categoryId=overlay-content&postType=wp_template_part`
		: '';

	/**
	 * Get All Template Parts.
	 */
	const { hasResolved, records } = useEntityRecords(
		'postType',
		'wp_template_part',
		{ per_page: -1 }
	);

	/**
	 * Array of template parts.
	 */
	let menuOptions: { label: string; value: string }[] = [];

	/**
	 * Extract only those registered in `overlay content`.
	 */
	if ( hasResolved ) {
		menuOptions = ( records as WpTemplatePart[] )
			.filter( ( item ) => item.area === 'overlay-content' )
			.map( ( item ) => ( {
				label: item.title.rendered,
				value: item.slug,
			} ) );
	}

	/**
	 * Check if there are menus.
	 *
	 * @type {boolean}
	 */
	const hasMenus: boolean = menuOptions.length > 0;

	/**
	 * メニューが作成されてない場合のNotice
	 * NOTE: Notice https://developer.wordpress.org/block-editor/reference-guides/components/notice/
	 * NOTE: createInterpolateElement https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/#createinterpolateelement
	 *
	 * @type {JSX.Element}
	 */
	const noMenusNotice: JSX.Element = (
		<Notice status="warning" isDismissible={ false }>
			{ createInterpolateElement(
				__(
					'There is no menu template part. Please create it from the <a>Site Editor</a>.',
					'chiilog-block-overlay-menu'
				),
				{
					a: (
						<a // eslint-disable-line
							href={ menuTemplateUrl }
							target="_blank"
							rel="noreferrer"
						/>
					),
				}
			) }
		</Notice>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'chiilog-block-overlay-menu' ) }
					initialOpen={ true }
				>
					<ComboboxControl
						label={ __(
							'Template Part',
							'chiilog-block-overlay-menu'
						) }
						value={ menuSlug }
						options={ menuOptions }
						onChange={ ( slugValue ) =>
							setAttributes( { menuSlug: slugValue } )
						}
					/>
					{ ! hasMenus && noMenusNotice }
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<button>
					{ __( 'Button', 'chiilog-block-overlay-menu' ) }
				</button>
			</div>
		</>
	);
}
