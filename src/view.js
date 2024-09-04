import { store, getContext } from '@wordpress/interactivity';

const { actions } = store( 'chiilog/chiilog-overlay-menu', {
	actions: {
		toggleOverlay() {
			const context = getContext();

			if ( context.isOpen ) {
				actions.closeOverlay();
			} else {
				context.isOpen = true;
			}
		},
		closeOverlay() {
			const context = getContext();

			context.isOpen = false;
		}
	}
} );
