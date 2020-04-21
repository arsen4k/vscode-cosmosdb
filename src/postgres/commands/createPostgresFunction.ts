/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { QuickPickItem } from "vscode";
import { IActionContext } from "vscode-azureextensionui";
import { ext } from "../../extensionVariables";
import { localize } from "../../utils/localize";
import { PostgresFunctionsTreeItem } from "../tree/PostgresFunctionsTreeItem";
import { PostgresFunctionTreeItem } from "../tree/PostgresFunctionTreeItem";
import { openPostgresFunction } from "./openPostgresFunction";

export async function createPostgresFunction(context: IActionContext, treeItem?: PostgresFunctionsTreeItem): Promise<void> {
    if (!treeItem) {
        treeItem = <PostgresFunctionsTreeItem>await ext.tree.showTreeItemPicker(PostgresFunctionsTreeItem.contextValue, context);
    }

    const queryType: QuickPickItem = await ext.ui.showQuickPick([{ label: localize('', 'Function') }], { placeHolder: localize('', 'Select query template') });
    console.log(queryType);

    const child: PostgresFunctionTreeItem = await treeItem.createChild(context);
    await openPostgresFunction(context, child);
}
