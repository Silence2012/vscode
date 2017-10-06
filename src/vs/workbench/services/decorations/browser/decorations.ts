/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import URI from 'vs/base/common/uri';
import Event from 'vs/base/common/event';
import Severity from 'vs/base/common/severity';
import { ColorIdentifier } from 'vs/platform/theme/common/colorRegistry';

export const IResourceDecorationsService = createDecorator<IResourceDecorationsService>('IFileDecorationsService');

export abstract class DecorationType {
	readonly label: string;
	protected constructor(label: string) {
		this.label = label;
	}
	dispose(): void {
		//
	}
}

export interface IResourceDecoration extends IResourceDecorationData {
	readonly type: DecorationType;
}

export interface IResourceDecorationData {
	readonly severity: Severity;
	readonly color?: ColorIdentifier;
	readonly icon?: URI | { dark: URI, light: URI };
}

export interface IResourceDecorationChangeEvent {
	affectsResource(uri: URI): boolean;
}

export interface IResourceDecorationsService {

	readonly _serviceBrand: any;

	readonly onDidChangeDecorations: Event<IResourceDecorationChangeEvent>;

	registerDecorationType(label: string): DecorationType;

	setDecoration(type: DecorationType, target: URI, data?: IResourceDecorationData): void;

	getDecorations(uri: URI, includeChildren: boolean): IResourceDecoration[];

	getTopDecoration(uri: URI, includeChildren: boolean): IResourceDecoration;
}