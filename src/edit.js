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
import { ComboboxControl, PanelBody, TextControl } from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';

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
