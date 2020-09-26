import React from 'react';
import {
		Checkbox,
		IVirtualTableCellRendererDataArgs,
		Spinner,
	} from '@getflywheel/local-components';

interface IFileStatusProps {
	dataArgs: IVirtualTableCellRendererDataArgs,
	handleCheckBoxChange: (imageID: string) => (isChecked: boolean) => void,
	toggleSelectAll: (isChecked: boolean) => void,
	toggleSelectAllValue: boolean,
	isCurrentlyOptimizing: string
}

export const ColFileStatus = (props: IFileStatusProps) =>  {

	const {
		dataArgs,
		handleCheckBoxChange,
		toggleSelectAll,
		toggleSelectAllValue,
		isCurrentlyOptimizing,
	} = props;

	const checked = dataArgs.isHeader ? toggleSelectAllValue : dataArgs.rowData.isChecked;
	const onChange = dataArgs.isHeader ? toggleSelectAll : handleCheckBoxChange(dataArgs.rowData.originalImageHash);

	if(isCurrentlyOptimizing === 'before') {
		return(
			<div>
				<Checkbox
					checked={ checked }
					onChange={ onChange }
				/>
			</div>
		);
	} else {
		switch (dataArgs.rowData.fileStatus) {
			case 'started':
				return(
					<div>
						<Spinner />
					</div>
				);

			case 'succeeded':
				return(
					<div>
						Succeeded!
					</div>
				);

			case 'failed':
				return(
					<div>
						Failed!
					</div>
				);

			default:
				return (
					null
				);
		}
	}
};
