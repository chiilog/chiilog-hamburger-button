"use strict";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { ComboboxControl, Notice, PanelBody } from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { menuSlug } = attributes;

	/**
	 * テンプレートパートのURLを取得
	 */
	const siteUrl = useSelect( ( select ) => select( 'core' ).getSite()?.url , [] );
	const menuTemplateUrl = siteUrl ? `${siteUrl}/wp-admin/site-editor.php?categoryId=menu&postType=wp_template_part` : '';

	/**
	 * 全てのテンプレートパートをここで取得
 	 */
	const { hasResolved, records } = useEntityRecords(
		'postType',
		'wp_template_part',
		{ per_page: -1 }
	);
	/**
	 * テンプレートパートの名前とスラッグを格納する配列。
	 * テンプレートパート`menu`に入るものしか入れない。
	 */
	let menuOptions = [];

	/**
	 * 取得したテンプレートパートから`menu`に登録されているもののみを抽出
	 * `menu`は`chiilog-overlay-menu.php`内で定義している
	 */
	if ( hasResolved ) {
		menuOptions = records
			.filter( ( item ) => item.area === 'menu' )
			.map( ( item )  => ( {
				label: item.title.rendered, // テンプレートパートの名前
				value: item.slug, // テンプレートパートのスラッグ
			} ) );
	}

	/**
	 * メニューがあるかどうか
	 *
	 * @type {boolean}
	 */
	const hasMenus = menuOptions.length > 0;

	/**
	 * メニューが作成されてない場合のNotice
	 * NOTE: Notice https://developer.wordpress.org/block-editor/reference-guides/components/notice/
	 * NOTE: createInterpolateElement https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/#createinterpolateelement
	 *
	 * @type {JSX.Element}
	 */
	const noMenusNotice = (
		<Notice status="warning" isDismissible={ false }>
			{ createInterpolateElement(
				__(
					'メニューのテンプレートパートがありません。<a>サイトエディター</a>から作成してください。',
					'chiilog-overlay-menu'
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
					title={ __( '設定', 'chiilog-overlay-menu' ) }
					initialOpen={ true }
				>
					<ComboboxControl
						label={ __( 'テンプレートパート', 'chiilog-overlay-menu' ) }
						value={ menuSlug }
						options={ menuOptions }
						onChange={ ( slugValue ) =>
							setAttributes( { menuSlug: slugValue } )
						}
					/>
					{ ! hasMenus && noMenusNotice }
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<button>
					{__(
						'ボタン',
						'chiilog-overlay-menu'
					)}
				</button>
			</div>
		</>
	);
}
